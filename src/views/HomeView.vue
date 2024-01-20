<template>
  <div class="flex justify-between w-full transition-colors dark:bg-gray-900">
    <!-- Sidebar -->
    <library-sidebar-component>
      <div
        v-if="editor.isDragging"
        class="absolute left-0 z-20 w-full h-full bg-red-400 bg-opacity-10 filter backdrop-blur-sm dark:text-neutral-100"
        @dragenter="editor.setCanBeDeleted(true)"
        @dragleave="editor.setCanBeDeleted(false)"
        @dragover="handleDragRemove"
        @drop="resetDragItem"
      >
        <Icon
          :icon="editor.canBeDeleted ? 'mdi:trash' : 'mdi:close'"
          class="absolute top-0 bottom-0 left-0 right-0 z-0 m-auto text-7xl"
        />
      </div>
      <div
        :draggable="true"
        :key="compName"
        class="relative p-2 cursor-move"
        v-for="compName in Object.keys(components)"
        @dragstart="handleDragStart($event, compName)"
      >
        <div class="absolute top-0 left-0 z-10 w-full h-full m-auto"></div>
        <component :is="components[compName]" />
      </div>
    </library-sidebar-component>

    <!-- Editor -->
    <div class="w-full" @dragover="handleEditorDragover" @drop="resetDragItem">
      <editor-component></editor-component>
    </div>
    <editor-sidebar-component
      :key="editor.selectedComponentEditing.id"
      v-if="editor.selectedComponentEditing.id"
    />
  </div>
</template>

<script setup>
import * as components from '../utils/components'
import LibrarySidebarComponent from '../components/LibrarySidebarComponent.vue'
import EditorComponent from '../components/EditorComponent.vue'
import EditorSidebarComponent from '../components/EditorSidebarComponent.vue'
import { Icon } from '@iconify/vue'
import { useEditorStore } from '../stores/editor'
import { useGlobalStore } from '../stores/global'

const editor = useEditorStore()
const global = useGlobalStore()

function handleDragStart(e, name) {
  const propObject = components[name].props || {}
  const props = {}
  const propsMetadata = {}
  for (let key in propObject) {
    const current = propObject[key]
    const value = current.default
    let options = []
    if (value) {
      let type = 'text'
      if (current.options) {
        type = 'select'
        options = current.options
      } else if (typeof value == 'number') {
        type = 'number'
      }
      propsMetadata[key] = { default: value, type, options }
      props[key] = value
    }
  }

  editor.setSelectedComponent({
    id: guidGenerator(),
    name,
    props,
    propsMetadata,
  })
}

function handleDragRemove(e) {
  e.preventDefault()
  if (editor.canBeDeleted) {
    global.removeFromComponentTree(editor.selectedComponent.id)
  }
}

function handleEditorDragover(e) {
  e.preventDefault()
  const alreadyAdded = global.componentTree.filter(
    (component) => component.id === editor.selectedComponent.id
  ).length
  if (!alreadyAdded) {
    global.setComponentTree([...global.componentTree, editor.selectedComponent])
  }
  editor.setIsDragging(true)
}

function resetDragItem() {
  editor.setSelectedComponent({})
  editor.setIsDragging(false)
}

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}
</script>

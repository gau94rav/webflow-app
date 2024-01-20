<template>
  <div
    :class="Object.values(global.pageSettings).toString().replace(/,/gi, ' ')"
  >
    <div
      v-for="(component, index) in global.componentTree"
      :key="component.id"
      :draggable="true"
      @mouseover="showEditIconIndex = index"
      @mouseleave="showEditIconIndex = index"
      @dragover="handleDragOver(index)"
      @dragleave="handleDragLeave(index)"
      @dragstart="handleDragStart(component)"
      @drop="handleDrop"
      class="relative cursor-move dark:hover:outline-white hover:outline"
    >
      <component :is="components[component.name]" v-bind="component.props" />
      <div
        v-if="showEditIconIndex === index"
        @click="editor.setSelectedComponentEditing(component)"
        class="absolute top-0 bottom-0 z-20 m-auto cursor-pointer right-3 dark:text-neutral-100"
      >
        <Icon icon="mdi:edit" />
      </div>
    </div>
  </div>
</template>

<script setup>
import * as components from '../utils/components'
import { useGlobalStore } from '../stores/global'
import { Icon } from '@iconify/vue'
import { useEditorStore } from '../stores/editor'
import { ref } from 'vue'

const global = useGlobalStore()
const editor = useEditorStore()
const showEditIconIndex = ref(false)

function handleDragStart(component) {
  editor.setIsDragging(true)
  editor.setCanBeDeleted(true)
  editor.setSelectedComponent(component)
}

function handleDrop() {
  editor.setIsDragging(false)
  editor.setCanBeDeleted(false)
  editor.setSelectedComponent({})
}

function handleDragOver(index) {
  // Components before hovered index
  const beforeComponent = global.componentTree
    .slice(0, index)
    .filter((c) => c.id !== editor.selectedComponent.id)

  // Components after hovered index
  const afterComponent = global.componentTree
    .slice(index)
    .filter((c) => c.id !== editor.selectedComponent.id)

  // Append selected component in between, before and after
  global.setComponentTree([
    ...beforeComponent,
    editor.selectedComponent,
    ...afterComponent,
  ])
}

function handleDragLeave(index) {
  const lastIndex = global.componentTree.length - 1
  let components = []
  if (lastIndex === index) {
    const withoutSelected = global.componentTree.filter(
      (c) => c.id !== editor.selectedComponent.id
    )
    components = [...withoutSelected, editor.selectedComponent]
    global.setComponentTree(components)
  }
}
</script>

<template>
  <div
    class="sticky flex flex-col h-screen gap-2 transition border-l border-gray-300 w-max dark:border-gray-600 dark:bg-gray-800"
  >
    <div
      class="flex items-center justify-between gap-16 p-2 border-b border-gray-300 dark:border-gray-600 dark:text-neutral-100"
    >
      <span>{{ editor.selectedComponentEditing.name }}</span>
      <Icon
        class="cursor-pointer"
        icon="mdi:close"
        @click="editor.setSelectedComponentEditing({})"
      />
    </div>
    <div
      v-for="item in propsData"
      :key="item"
      class="flex flex-col w-full gap-1 p-2"
    >
      <label class="dark:text-neutral-100" :for="item.name">{{
        item.name
      }}</label>
      <select
        :id="item.name"
        :value="item.default"
        v-if="item.options"
        class="px-2 py-1 border rounded border-neutral-600"
        @change="updateProp({ name: item.name, value: $event.target.value })"
      >
        <option :value="option" v-for="option in item.options" :key="option">
          {{ option }}
        </option>
      </select>
      <input
        :id="item.name"
        v-else
        type="text"
        class="px-2 py-1 border rounded border-neutral-600"
        :value="item.default"
        @input="updateProp({ name: item.name, value: $event.target.value })"
      />
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useEditorStore } from '../stores/editor'
import * as components from '../utils/components'
import { computed } from 'vue'

const editor = useEditorStore()
const metadata = components[editor.selectedComponentEditing.name]

const propsData = computed(() => {
  const props = metadata.props
  if (props) {
    return Object.keys(props).map((name) => {
      const propObject = props[name]
      return {
        name,
        options: propObject.options || null,
        default: propObject.default,
      }
    })
  }
  return []
})

function updateProp({ name, value }) {
  const component = editor.selectedComponentEditing
  const props = { ...component.props, [name]: value }
  editor.setComponentProps(component.id, props)
}
</script>

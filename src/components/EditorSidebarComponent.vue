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
      v-for="prop in propsData"
      :key="prop.name"
      class="flex flex-col w-full gap-1 p-2"
    >
      <label class="dark:text-neutral-100" :for="prop.name">{{
        prop.name
      }}</label>
      <select
        :id="prop.name"
        :value="prop.value"
        v-if="prop.type == 'select'"
        class="px-2 py-1 border rounded border-neutral-600"
        @change="
          updateProp({
            name: prop.name,
            value: $event.target.value,
            type: prop.type,
          })
        "
      >
        <option :value="option" v-for="option in prop.options" :key="option">
          {{ option }}
        </option>
      </select>
      <input
        :id="prop.name"
        v-else
        :type="prop.type"
        class="px-2 py-1 border rounded border-neutral-600"
        :value="prop.value"
        @input="
          updateProp({
            name: prop.name,
            value: $event.target.value,
            type: prop.type,
          })
        "
      />
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useEditorStore } from '../stores/editor'
import { useGlobalStore } from '../stores/global'
import * as components from '../utils/components'
import { computed } from 'vue'

const editor = useEditorStore()
const global = useGlobalStore()
const metadata = components[editor.selectedComponentEditing.name]

const propsData = computed(() => {
  const component = editor.selectedComponentEditing
  const props = component.props
  const metadata = component.propsMetadata
  const data = []
  for (let name in metadata) {
    const prop = metadata[name]
    data.push({
      name,
      value: props[name],
      type: prop.type,
      options: prop.options,
    })
  }
  return data
})

function updateProp({ name, value, type }) {
  if (type == 'number') {
    value = parseFloat(value)
  }
  const component = editor.selectedComponentEditing
  const props = { ...component.props, [name]: value }
  global.setComponentProps({ id: component.id, props })
}
</script>

<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <div
      class="relative flex items-center justify-between w-full p-1 transition-colors w"
      :class="isExpanded && 'dark:bg-gray-700 bg-gray-300'"
    >
      <span>
        {{ label }}
      </span>
      <Icon
        class="cursor-pointer"
        @click="isExpanded = !isExpanded"
        :icon="isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-left'"
      />
    </div>
    <div class="px-2">
      <slot v-if="isExpanded"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
})

const isExpanded = ref(false)
</script>

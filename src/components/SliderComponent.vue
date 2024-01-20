<template>
  <div class="relative w-full" @mouseleave="stopDragging">
    <div class="flex justify-between">
      <div class="mb-1">
        {{ label }}
      </div>
      <div>{{ items[activeItemIndex] }}</div>
    </div>
    <div class="flex items-center justify-between gap-1">
      <Icon
        icon="mdi:chevron-left"
        class="cursor-pointer"
        @click="
          activeItemIndex - 1 >= 0 ? setActiveIndex(activeItemIndex - 1) : null
        "
      />
      <div
        class="relative w-full"
        @mousedown="startDragging"
        @mouseup="stopDragging"
      >
        <div
          class="absolute top-0 bottom-0 flex justify-between w-full h-2 m-auto bg-gray-900 dark:bg-gray-50"
        >
          <div
            @mouseover="onDragging(index)"
            @click="onDragging(index, true)"
            v-for="(item, index) in items"
            :key="item"
            class="cursor-pointer"
          >
            <div
              class="relative top-0 z-10 w-2 h-2 m-auto bg-gray-900"
              :class="
                activeItemIndex == index
                  ? 'bg-gray-100 dark:bg-gray-900'
                  : 'bg-transparent'
              "
            >
              <div v-if="activeItemIndex !== index" class="bg-gray-900"></div>
              <div v-else class="cursor-pointer select-none"></div>
            </div>
          </div>
        </div>
      </div>
      <Icon
        icon="mdi:chevron-right"
        class="cursor-pointer"
        @click="
          activeItemIndex + 1 <= items.length - 1
            ? setActiveIndex(activeItemIndex + 1)
            : null
        "
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
    default: 'Label',
  },
  value: {
    type: [String, Number],
    default: '',
  },
})

const dragging = ref(false)
const activeItemIndex = ref(null)
const localValue = ref(props.value ?? null)
const emit = defineEmits()

const startDragging = () => {
  dragging.value = true
}

const onDragging = (index, isClicked = false) => {
  if (dragging.value || isClicked) {
    setActiveIndex(index, true)
  }
}

const stopDragging = () => {
  dragging.value = false
}

const setActiveIndex = (index, setGlobal = false) => {
  activeItemIndex.value = index
  emit('value', props.items[index])
}

if (props.items.length) {
  if (!localValue.value) {
    setActiveIndex(0)
  } else {
    const index = props.items.indexOf(localValue.value)
    setActiveIndex(index)
  }
}
</script>

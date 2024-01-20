<template>
  <div class="flex flex-col w-full gap-1" :class="colors[color]">
    <label for="">{{ label }}</label>
    <input type="text" />
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  inheritAttrs: false,
  customOptions: {},
}
</script>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'My Input',
  },
  color: {
    type: String,
    default: 'primary',
    options: ['primary', 'secondary', 'error', 'neutral'],
  },
})

const colors = {
  primary: 'text-blue-500',
  secondary: 'text-yellow-500',
  error: 'text-red-500',
  neutral: 'text-gray-500',
}
</script>

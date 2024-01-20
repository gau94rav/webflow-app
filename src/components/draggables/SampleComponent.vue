<template>
  <div :class="colors[color]">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'SampleComponent',
  inheritAttrs: false,
  customOptions: {},
}
</script>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'My Label',
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

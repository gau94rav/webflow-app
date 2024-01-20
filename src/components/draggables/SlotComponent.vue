<template>
  <div
    class="relative grid"
    :class="[grids.rows[rows], grids.columns[columns], grids.gaps[gap]]"
  >
    <slot
      v-for="c in Array.from({ length: count }, (_, index) => index + 1)"
      :key="c"
    >
      <div class="p-3 border border-gray-200">Empty slot</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'SlotComponent',
  inheritAttrs: false,
  customOptions: {},
}
</script>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    default: 1,
  },
  gap: {
    type: Number,
    default: 1,
    options: [
      0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80,
      96,
    ],
  },
  rows: {
    type: Number,
    default: 1,
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  columns: {
    type: Number,
    default: 1,
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
})

const grids = ref({
  columns: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  },
  rows: {
    1: 'grid-rows-1',
    2: 'grid-rows-2',
    3: 'grid-rows-3',
    4: 'grid-rows-4',
    5: 'grid-rows-5',
    6: 'grid-rows-6',
    7: 'grid-rows-7',
    8: 'grid-rows-8',
    9: 'grid-rows-9',
    10: 'grid-rows-10',
    11: 'grid-rows-11',
    12: 'grid-rows-12',
  },
  gaps: {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16',
    20: 'gap-20',
    24: 'gap-24',
    32: 'gap-32',
    40: 'gap-40',
    48: 'gap-48',
    56: 'gap-56',
    64: 'gap-64',
    72: 'gap-72',
    80: 'gap-80',
    96: 'gap-96',
  },
})
</script>

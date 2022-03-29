<template>
  <div class="flex flex-col w-full">
    <label>Select Input</label>
    <select>
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectComponent",
  inheritAttrs: false,
  customOptions: {},
};
</script>

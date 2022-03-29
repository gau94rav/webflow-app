<script setup>
import { RouterView } from "vue-router";
import { useGlobalStore } from "./stores/global";

const global = useGlobalStore();
</script>

<template>
  <div class="w-full h-screen" :class="{ dark: global.darkMode }">
    <RouterView />
  </div>
</template>

<style></style>

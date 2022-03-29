<template>
  <div
    class="sticky flex flex-col h-screen gap-2 transition border-r border-gray-300 w-max dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
  >
    <div v-if="global.sidebarVisible">
      <!-- Header -->
      <div
        class="flex items-center justify-between gap-16 p-2 border-b border-gray-300 dark:border-gray-600"
      >
        <div class="whitespace-pre">Webflow App</div>
        <div class="flex items-center gap-2">
          <Icon
            :icon="
              global.darkMode ? 'mdi:weather-night' : 'mdi:white-balance-sunny'
            "
            class="cursor-pointer"
            @click="global.toggleDarkMode()"
          />
          <Icon
            icon="mdi:arrow-left"
            class="cursor-pointer"
            @click="global.toggleSidebar()"
          />
        </div>
      </div>

      <!-- Items -->
      <slot></slot>
    </div>
    <div v-else class="p-2">
      <Icon
        icon="mdi:arrow-right"
        class="cursor-pointer"
        @click="global.toggleSidebar()"
      />
    </div>
  </div>
</template>

<script setup>
import { useGlobalStore } from "../stores/global";
import { Icon } from "@iconify/vue";
const global = useGlobalStore();
</script>

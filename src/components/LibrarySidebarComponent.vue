<template>
  <div
    class="sticky flex flex-col h-screen gap-2 transition border-r border-gray-300 w-max dark:border-gray-600 dark:bg-gray-800 dark:text-neutral-100"
  >
    <div v-if="global.sidebarVisible">
      <!-- Header -->
      <div
        class="flex items-center justify-between gap-16 p-2 border-b border-gray-300 dark:border-gray-600"
      >
        <div class="whitespace-pre">Webflow App</div>
        <div class="flex items-center gap-2">
          <span :title="global.darkMode ? 'Light mode' : 'Dark mode'">
            <Icon
              :icon="
                global.darkMode
                  ? 'mdi:weather-night'
                  : 'mdi:white-balance-sunny'
              "
              class="cursor-pointer"
              @click="global.toggleDarkMode()"
            />
          </span>
          <span
            :title="
              global.pageSettingsVisible ? 'Page editor' : 'Page settings'
            "
          >
            <Icon
              :icon="
                global.pageSettingsVisible ? 'mdi:page-layout-body' : 'mdi:cog'
              "
              class="cursor-pointer"
              @click="global.togglePageSettings()"
            />
          </span>
          <span title="Toggle sidebar">
            <Icon
              icon="mdi:arrow-left"
              class="cursor-pointer"
              @click="global.toggleSidebar()"
            />
          </span>
        </div>
      </div>

      <div v-if="global.pageSettingsVisible">
        <expansion-component label="Paddings">
          <div class="flex flex-col gap-2 py-2">
            <slider-component
              label="Left"
              :items="['pl-0', 'pl-1', 'pl-2', 'pl-3', 'pl-4', 'pl-5']"
              :value="global.pageSettings.pl"
              @value="global.setPageSetting({ key: 'pl', value: $event })"
            />
            <slider-component
              label="Right"
              :items="['pr-0', 'pr-1', 'pr-2', 'pr-3', 'pr-4', 'pr-5']"
              :value="global.pageSettings.pr"
              @value="global.setPageSetting({ key: 'pr', value: $event })"
            />
            <slider-component
              label="Top"
              :items="['pt-0', 'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5']"
              :value="global.pageSettings.pt"
              @value="global.setPageSetting({ key: 'pt', value: $event })"
            />
            <slider-component
              label="Bottom"
              :items="['pb-0', 'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5']"
              :value="global.pageSettings.pb"
              @value="global.setPageSetting({ key: 'pb', value: $event })"
            />
          </div>
        </expansion-component>

        <expansion-component label="Margins">
          <div class="flex flex-col gap-2 py-2">
            <slider-component
              label="Left"
              :items="['ml-0', 'ml-1', 'ml-2', 'ml-3', 'ml-4', 'ml-5']"
              :value="global.pageSettings.ml"
              @value="global.setPageSetting({ key: 'ml', value: $event })"
            />
            <slider-component
              label="Right"
              :items="['mr-0', 'mr-1', 'mr-2', 'mr-3', 'mr-4', 'mr-5']"
              :value="global.pageSettings.mr"
              @value="global.setPageSetting({ key: 'mr', value: $event })"
            />
            <slider-component
              label="Top"
              :items="['mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5']"
              :value="global.pageSettings.mt"
              @value="global.setPageSetting({ key: 'mt', value: $event })"
            />
            <slider-component
              label="Bottom"
              :items="['mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5']"
              :value="global.pageSettings.mb"
              @value="global.setPageSetting({ key: 'mb', value: $event })"
            />
          </div>
        </expansion-component>

        <expansion-component label="Dimensions">
          <div class="flex flex-col gap-2 py-2">
            <slider-component
              label="Width"
              :items="['w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-max', 'w-full']"
              :value="global.pageSettings.w"
              @value="global.setPageSetting({ key: 'w', value: $event })"
            />
            <slider-component
              label="Height"
              :items="['h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-max', 'h-full']"
              :value="global.pageSettings.h"
              @value="global.setPageSetting({ key: 'h', value: $event })"
            />
          </div>
        </expansion-component>
      </div>
      <slot v-else></slot>
    </div>
    <div v-else class="p-2">
      <Icon
        icon="mdi:arrow-right"
        class="cursor-pointer"
        @click="global.toggleSidebar()"
      />
    </div>

    <!-- Modals -->
  </div>
</template>

<script setup>
import { useGlobalStore } from '../stores/global'
import { Icon } from '@iconify/vue'
import SliderComponent from './SliderComponent.vue'
import ExpansionComponent from './ExpansionComponent.vue'

const global = useGlobalStore()
</script>

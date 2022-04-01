<template>
  <div class="w-full m-0 h-max">
    <div
      v-for="(component, index) in editor.componentTree"
      :key="component.id"
      :draggable="true"
      @mouseover="showEditIconIndex = index"
      @mouseleave="showEditIconIndex = index"
      @dragover="handleDragOver(index)"
      @dragleave="handleDragLeave(index)"
      @dragstart="handleDragStart(component)"
      @drop="handleDrop"
      class="relative cursor-move"
    >
      <component :is="components[component.name]" v-bind="component.props" />
      <div
        v-if="showEditIconIndex === index"
        @click="editor.setSelectedComponentEditing(component)"
        class="absolute top-0 bottom-0 z-20 m-auto cursor-pointer right-3 dark:text-neutral-100"
      >
        <Icon icon="mdi:edit" />
      </div>
    </div>
  </div>
</template>

<script setup>
import * as components from "../utils/components";
import { Icon } from "@iconify/vue";
import { useEditorStore } from "../stores/editor";
import { ref } from "vue";

const editor = useEditorStore();
const showEditIconIndex = ref(false);

function handleDragStart(component) {
  editor.setIsDragging(true);
  editor.setCanBeDeleted(true);
  editor.setSelectedComponent(component);
}

function handleDrop() {
  editor.setIsDragging(false);
  editor.setCanBeDeleted(false);
  editor.setSelectedComponent({});
}

function handleDragOver(index) {
  // Components before hovered index
  const beforeComponent = editor.componentTree
    .slice(0, index)
    .filter((c) => c.id !== editor.selectedComponent.id);

  // Components after hovered index
  const afterComponent = editor.componentTree
    .slice(index)
    .filter((c) => c.id !== editor.selectedComponent.id);

  // Append selected component in between before and after
  editor.setComponentTree([
    ...beforeComponent,
    editor.selectedComponent,
    ...afterComponent,
  ]);
}

function handleDragLeave(index) {
  const lastIndex = editor.componentTree.length - 1;
  let components = [];
  if (lastIndex === index) {
    const withoutSelected = editor.componentTree.filter(
      (c) => c.id !== editor.selectedComponent.id
    );
    console.log(withoutSelected);
    components = [...withoutSelected, editor.selectedComponent];
    editor.setComponentTree(components);
  }
}
</script>

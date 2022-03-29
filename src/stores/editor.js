import { defineStore } from "pinia";
import { ref } from "vue";

export const useEditorStore = defineStore("editor", () => {
  const canBeDeleted = ref(false);
  const componentTree = ref([]);
  const isDragging = ref(false);
  const selectedComponent = ref({});

  function removeFromComponentTree(id) {
    this.componentTree = this.componentTree.filter(
      (component) => component.id !== id
    );
  }

  function setCanBeDeleted(value) {
    this.canBeDeleted = value;
  }

  function setComponentTree(tree) {
    this.componentTree = tree;
  }

  function setIsDragging(value) {
    this.isDragging = value;
  }

  function setSelectedComponent(component) {
    this.selectedComponent = component;
  }

  return {
    canBeDeleted,
    componentTree,
    isDragging,
    selectedComponent,
    removeFromComponentTree,
    setCanBeDeleted,
    setComponentTree,
    setIsDragging,
    setSelectedComponent,
  };
});

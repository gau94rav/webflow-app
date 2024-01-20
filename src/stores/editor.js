import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEditorStore = defineStore('editor', () => {
  const canBeDeleted = ref(false)
  const isDragging = ref(false)
  const selectedComponent = ref({})
  const selectedComponentEditing = ref({})

  function setCanBeDeleted(value) {
    this.canBeDeleted = value
  }

  function setIsDragging(value) {
    this.isDragging = value
  }

  function setSelectedComponent(component) {
    this.selectedComponent = component
  }

  function setSelectedComponentEditing(component) {
    this.selectedComponentEditing = component
  }

  return {
    canBeDeleted,
    isDragging,
    selectedComponent,
    selectedComponentEditing,
    setCanBeDeleted,
    setIsDragging,
    setSelectedComponent,
    setSelectedComponentEditing,
  }
})

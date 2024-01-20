import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const darkMode = ref(localStorage.theme === 'dark')

  const sidebarVisible = ref(true)
  const pageSettingsVisible = ref(false)
  const pageSettings = ref({
    w: 'w-full',
    h: 'h-max',
  })
  const componentTree = ref([])

  function toggleDarkMode() {
    if (this.darkMode) {
      localStorage.setItem('theme', 'light')
      return (this.darkMode = false)
    }
    localStorage.setItem('theme', 'dark')
    return (this.darkMode = true)
  }

  function toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible
  }

  function togglePageSettings() {
    this.pageSettingsVisible = !this.pageSettingsVisible
  }

  function setComponentTree(tree) {
    this.componentTree = tree
    console.log(tree)
  }

  function removeFromComponentTree(id) {
    this.componentTree = this.componentTree.filter(
      (component) => component.id !== id
    )
  }

  function setPageSetting({ key, value }) {
    const pageSettings = this.pageSettings
    pageSettings[key] = value
    this.pageSettings = pageSettings
  }

  function setComponentProps({ id, props }) {
    const tree = this.componentTree
    for (const component of tree) {
      if (component.id === id) {
        component.props = props
        this.componentTree = tree
        break
      }
    }
  }

  return {
    darkMode,
    sidebarVisible,
    pageSettingsVisible,
    toggleDarkMode,
    toggleSidebar,
    togglePageSettings,
    pageSettings,
    setPageSetting,
    setComponentProps,
    componentTree,
    setComponentTree,
    removeFromComponentTree,
  }
})

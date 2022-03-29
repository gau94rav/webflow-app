import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
  const darkMode = ref(localStorage?.theme === "dark");
  const sidebarVisible = ref(true);

  function toggleDarkMode() {
    if (this.darkMode) {
      localStorage.setItem("theme", "light");
      return (this.darkMode = false);
    }
    localStorage.setItem("theme", "dark");
    return (this.darkMode = true);
  }

  function toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  return {
    darkMode,
    sidebarVisible,
    toggleDarkMode,
    toggleSidebar,
  };
});

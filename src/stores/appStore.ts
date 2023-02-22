import { ref } from "vue";
import { defineStore } from "pinia";
export const useAppStore = defineStore("app", () => {
  const userId = ref("");
  const userName = ref("");
  const currentNotebookID = ref("");
  const currentPageID = ref("");
  return { userId, userName, currentNotebookID, currentPageID };
});

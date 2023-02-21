import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const userId = ref('f9f89c4d-974f-46ce-9a61-99a5db76c2ed');
  const userName = ref('panpan');
  return { userId, userName }
})

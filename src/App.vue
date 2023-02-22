<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import router from "./router/router";
import { useAppStore } from "./stores/appStore";
const store = useAppStore();
const { userId } = storeToRefs(store);
router.beforeEach((to, from) => {
  console.log(userId.value);
  if (to.meta.requiresAuth && userId.value == "") {
    router.replace("/");
  }
});
</script>

<template>
  <RouterView />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import router from "./router/router";
import { useAppStore } from "./stores/appStore";
const store = useAppStore();
const { userId } = storeToRefs(store);
// router.beforeEach(async (to) => {
//   console.log(userId.value);
//   if (to.meta.requiresAuth && userId.value == "") {
//     router.replace("/");
//   }
// });
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <!-- Use any custom transition and  to `fade` -->
    <transition name="slide-left">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

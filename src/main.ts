import { useAppStore } from "./stores/appStore";
import { createApp } from "vue";
import { createPinia, storeToRefs } from "pinia";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);
app.component("QuillEditor", QuillEditor);
app.use(createPinia());

import router from "./router/router";
app.use(router);

app.mount("#app");

// const { userId } = storeToRefs(useAppStore());
// router.beforeEach((to, from) => {
//   console.log(userId.value);
//   if (to.meta.requiresAuth && userId.value == "") {
//     router.replace("/");
//   }
// });

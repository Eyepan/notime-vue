import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import SignInPage from "@/views/SignInPage.vue";
import EditNotebook from "@/views/EditNotebook.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: SignInPage,
      meta: { requiresAuth: false, transition: "slide-left" },
    },
    {
      path: "/signup",
      component: SignUpPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/home/:notebook_id",
      component: EditNotebook,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)",
      component: NotFound,
    },
  ],
});

// router.beforeEach((to, from) => {
//   const store = useAppStore();
//   const { userId } = storeToRefs(store);
//   console.log(userId.value);
//   if (to.meta.requiresAuth && userId.value == "") {
//     router.replace("/");
//   }
// });

export default router;

<script setup lang="ts">
import router from "@/router/router";
import { useAppStore } from "@/stores/appStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const name = ref("");
const password = ref("");
const store = useAppStore();
const { userId, userName } = storeToRefs(store);

function handleSubmit() {
  axios
    .post(import.meta.env.VITE_API_URL + "users", {
      name: name.value,
      password: password.value,
    })
    .then(function (response) {
      userId.value = response.data["id"];
      userName.value = response.data["name"];
      router.push("/home");
    })
    .catch(function (error) {
      alert(error);
    });
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a class="flex items-center mb-6 text-6xl font-semibold text-gray-900 dark:text-white">
        Notime
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create a new account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit()" method="post">
            <div>
              <label for=" name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
              <input type="name" name="name" id="name" v-model="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">A new
                password</label>
              <input type="password" name="password" id="password" v-model="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required />
            </div>
            <button type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Create Account
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <a @click="$router.replace('/')"
                class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

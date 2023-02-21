<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/router";
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import axios from "axios";

const store = useAppStore();
const { userId, userName } = storeToRefs(store);
// TODO: uncomment this
if (userId.value == "") {
    router.replace("/");
}
interface Notebook {
    id: string;
    title: string;
}
let notebooks = ref<Notebook[]>([]);

// fetch all notebooks
onMounted(() => {
    axios
        .get(import.meta.env.VITE_API_URL + "users/" + userId.value + "/notebooks")
        .then(function (response) {
            notebooks.value = response.data["notebooks"];
        });
});

function createNewNotebook() {
    axios
        .post(import.meta.env.VITE_API_URL + "users/" + userId.value + "/notebooks", { title: "New Notebook" })
        .then(
            function (response) {
                console.log(response)
            }
        )
    axios
        .get(import.meta.env.VITE_API_URL + "users/" + userId.value + "/notebooks")
        .then(function (response) {
            notebooks.value = response.data["notebooks"];
        });
}
</script>

<template>
    <main class="bg-gray-50 dark:bg-gray-900 w-screen h-screen px-6 py-8">
        <p class="mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
            Hi {{ userName }}!
        </p>
        <hr />
        <p class="font-semibold text-gray-900 dark:text-white">Your notebooks:</p>
        <div class="m-5 grid grid-cols-4 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div @click="createNewNotebook()"
                class="flex justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <svg class=" h-10 object-scale-down fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
            </div>
            <div v-for="notebook in notebooks">
                <a href="#"
                    class="block max-w-sm p-6  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ notebook.title }}
                    </h5>
                </a>
            </div>
        </div>
    </main>
</template>

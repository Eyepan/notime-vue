<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import axios from "axios";
import router from "@/router/router";
import type Notebook from "@/models/notebook.model";

const store = useAppStore();
const { userId, userName, currentNotebookID } = storeToRefs(store);

let index = 1;
let notebooks = ref<Notebook[]>([]);
let loading = ref(false);


// fetch all notebooks
onMounted(() => {
    if (userId.value == '') {
        router.replace('/')
    } else {
        router.replace('/home')
    }
    axios
        .get(import.meta.env.VITE_API_URL + "users/" + userId.value + "/notebooks")
        .then(function (response) {
            notebooks.value = response.data["notebooks"];
        });
    index = notebooks.value.length;
});
async function createNewNotebook() {
    if (notebooks.value.length == 0) {
        index = 1;
    }
    console.log(notebooks.value)
    loading.value = true;
    await axios
        .post(import.meta.env.VITE_API_URL + "users/" + userId.value + "/notebooks", { title: "New Notebook " + index++ })
        .then(
            function (response) {
                console.log(response)
            }
        )
        .catch(function (error) {
            console.log(error)
        })

    await axios
        .get(import.meta.env.VITE_API_URL + "users/" + userId.value + "/notebooks")
        .then(function (response) {
            notebooks.value = response.data["notebooks"];
        })
        .catch(function (error) {
            console.log(error)
        });
    loading.value = false;
}

async function deleteNotebook(notebookID: string) {
    loading.value = true;
    await axios.delete(import.meta.env.VITE_API_URL + "users/" + userId.value + "/notebooks/" + notebookID).then(
        function (response) {
            console.log(response)
        }
    )
        .catch(function (error) {
            console.log(error)
        })

    await axios
        .get(import.meta.env.VITE_API_URL + "users/" + userId.value + "/notebooks")
        .then(function (response) {
            notebooks.value = response.data["notebooks"];
        })
        .catch(function (error) {
            console.log(error)
        });
    loading.value = false;
}

function logout() {
    userId.value = '';
    userName.value = '';
    router.replace('/')
}
</script>

<template>
    <main class="bg-gray-50 dark:bg-gray-900 w-screen h-screen px-6 py-8 text-gray-900 dark:text-white">
        <div class="flex justify-between">
            <div class="flex flex-row items-center">
                <p class=" mb-6 text-3xl font-semibold ">Hi {{ userName }}!</p>
                <a @click="logout()" class="ml-4 font-semibold text-gray-900 dark:text-gray-500 cursor-pointer">Logout</a>
            </div>

            <div v-if="loading" role="status">
                <svg aria-hidden="true" class=" w-8 h-8 mr-2 animate-spin text-gray-200  dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>

        <hr />
        <p class="p-3 font-semibold ">Your notebooks:</p>
        <div class="m-5 grid grid-cols-4 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div @click="createNewNotebook()"
                class="flex justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-800">
                <svg class=" h-10 object-scale-down fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
            </div>
            <div v-for="notebook in notebooks" :key="notebook.id">
                <div
                    class="flex flex-row max-w-sm bg-white border p-6 border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 @click="currentNotebookID = notebook.id; $router.push('/home/' + notebook.id)"
                        class="cursor-pointer mb-2 text-2xl w-5/6 font-bold tracking-tight ">
                        {{ notebook.title }}
                    </h5>
                    <div @click="deleteNotebook(notebook.id)"
                        class="hover:bg-slate-500 cursor-pointer w-1/6 rounded-lg flex justify-center items-center">
                        🗑️
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import axios from "axios";
import { onMounted, ref } from "vue";
import type Notebook from "@/models/notebook.model";
import type Page from "@/models/page.model";
let index = 1;
let loading = ref(false);
const store = useAppStore();
const { userId, currentNotebookID } = storeToRefs(store);
const currentPage = ref<Page>({
  id: "",
  content: "",
  title: "",
});
const notebook = ref<Notebook>({
  id: "",
  title: "",
  pages: [],
});
onMounted(async function () {
  loading.value = true;
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      updatePage();
    }
  });
  await axios
    .get(
      import.meta.env.VITE_API_URL +
        "users/" +
        userId.value +
        "/notebooks/" +
        currentNotebookID.value +
        "/pages"
    )
    .then(function (response) {
      notebook.value = response.data;
      console.log(notebook.value);
    });
  loading.value = false;
  index = notebook.value.pages.length;
});

async function createPage() {
  console.log(
    "request url sent to " +
      import.meta.env.VITE_API_URL +
      "users/" +
      userId.value +
      "/notebooks/" +
      currentNotebookID.value +
      "/pages"
  );
  loading.value = true;
  await axios
    .post(
      import.meta.env.VITE_API_URL +
        "users/" +
        userId.value +
        "/notebooks/" +
        currentNotebookID.value +
        "/pages",
      {
        title: "New Page " + index++,
        content: "",
      }
    )
    .then(async function (response) {
      await axios
        .get(
          import.meta.env.VITE_API_URL +
            "users/" +
            userId.value +
            "/notebooks/" +
            currentNotebookID.value +
            "/pages"
        )
        .then(function (response) {
          notebook.value = response.data;
          console.log(notebook.value);
        });
    });
  loading.value = false;
}

async function deletePage(id: string) {
  loading.value = true;
  await axios
    .delete(
      import.meta.env.VITE_API_URL +
        "users/" +
        userId.value +
        "/notebooks/" +
        currentNotebookID.value +
        "/pages/" +
        id
    )
    .then(async function (response) {
      await axios
        .get(
          import.meta.env.VITE_API_URL +
            "users/" +
            userId.value +
            "/notebooks/" +
            currentNotebookID.value +
            "/pages"
        )
        .then(function (response) {
          notebook.value = response.data;
          currentPage.value = {
            id: "",
            content: "",
            title: "",
          };
          currentPage.value.id = "";
          console.log(notebook.value);
        });
    });
  loading.value = false;
}

async function updatePage() {
  loading.value = true;
  console.log({
    title: currentPage.value.title,
    content: currentPage.value.content,
  });
  await axios.put(
    import.meta.env.VITE_API_URL +
      "users/" +
      userId.value +
      "/notebooks/" +
      currentNotebookID.value +
      "/pages/" +
      currentPage.value.id,
    {
      title: currentPage.value.title,
      content: currentPage.value.content,
    }
  );
  loading.value = false;
}

async function updateNotebookTitle() {
  loading.value = true;
  await axios
    .put(
      import.meta.env.VITE_API_URL +
        "users/" +
        userId.value +
        "/notebooks/" +
        currentNotebookID.value,
      { title: notebook.value.title }
    )
    .then(async function (response) {
      await axios
        .get(
          import.meta.env.VITE_API_URL +
            "users/" +
            userId.value +
            "/notebooks/" +
            currentNotebookID.value +
            "/pages"
        )
        .then(function (response) {
          notebook.value = response.data;
          currentPage.value = {
            id: "",
            content: "",
            title: "",
          };
          currentPage.value.id = "";
          console.log(notebook.value);
        });
    });
  loading.value = false;
}
</script>

<template>
  <div>
    <div v-if="loading" role="status" class="absolute right-4 top-4">
      <svg
        aria-hidden="true"
        class="w-4 h-8 mr-2 animate-spin text-gray-200 dark:text-gray-600 fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
    <main
      class="overflow-hidden flex flex-row bg-gray-50 dark:bg-gray-900 w-screen h-screen px-3 py-4 text-gray-900 dark:text-white"
    >
      <div
        id="sidebar"
        class="lg:w-1/6 md:w-1/4 h-full p-2 bg-slate-400 rounded-l-md"
      >
        <svg
          @click="$router.go(-1)"
          class="fill-gray-900 dark:fill-white p-1 m-0 h-6 w-6 cursor-pointer rounded-full bg-zinc-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          />
        </svg>
        <div id="notebook_title" class="w-full h-20">
          <textarea
            name=""
            id=""
            rows="1"
            cols="200"
            wrap="off"
            v-model="notebook.title"
            @blur="updateNotebookTitle()"
            class="bg-gray-50 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-x-auto overflow-y-hidden dark:bg-gray-900 text-lg w-[calc(100%_-_1rem)] h-12 m-2 p-2 resize-none rounded-md text-center"
          ></textarea>
        </div>
        <p>Pages:</p>
        <div v-for="page in notebook.pages" class="mt-2">
          <button
            class="h-7 bg-gray-50 overflow-hidden dark:bg-gray-800 w-[calc((100%_-_1rem)*0.8)] rounded-md"
            @click="currentPage = page"
          >
            {{ page.title == "" ? "No title" : page.title }}
          </button>
          <button
            @click="deletePage(page.id)"
            class="w-[calc((100%_-_1rem)*0.2)] h-7 ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            🗑️
          </button>
        </div>
        <div
          class="absolute bottom-8 left-2 flex items-center justify-center lg:w-1/6 md:w-1/4"
        >
          <button
            @click="createPage()"
            class="hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Create page
          </button>
        </div>
      </div>

      <div
        id="editor"
        class="p-4 lg:left-1/6 lg:w-5/6 md:left-1/4 md:w-3/4 h-full bg-slate-600 rounded-r-md"
      >
        <div class="" v-if="currentPage.id != '' && notebook.pages.length > 0">
          <div class="flex flex-row justify-between align-center">
            Page title:
            <button
              @click="updatePage()"
              class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              <img
                src="https://img.icons8.com/ios-glyphs/30/null/save--v1.png"
                class="h-3 fill-inherit"
              />
            </button>
          </div>
          <textarea
            @blur="updatePage()"
            id="message"
            rows="1"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="currentPage.title"
          ></textarea>
          Page content:
          <div class="bg-white text-black">
            <QuillEditor
              theme="snow"
              v-model:content="currentPage.content"
              contentType="html"
            />
          </div>
        </div>
        <div v-else>No page selected. Either select one or create one</div>
      </div>
    </main>
  </div>
</template>

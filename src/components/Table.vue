<template>
  <div class="flex my-3">
    <button
      class="rounded-xl bg-blue-950 text-white py-1 px-3 font-bold text-md"
    >
      <IconAdd @click="isOpen = true" />
    </button>
    <div class="relative ml-3">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="search"
        class="border rounded-md px-3 py-4 mr-14 bg-slate-200 focus:outline-none w-full"
        placeholder="Search by Name or Email"
      />
      <button
        @click="search"
        class="absolute right-0 top-0 bottom-0 px-3 py-1 bg-blue-950 text-white rounded-r-md"
      >
        <IconSearch />
      </button>
    </div>

    <!-- Modal -->
    <div class="relative">
      <teleport to="body">
        <div
          class="modal-overlay fixed w-full h-full blur backdrop-blur z-10 left-0 top-0"
          v-if="isOpen"
          @click="isOpen = false"
        ></div>
        <!-- Overlay to close modal on background click -->
        <div
          class="modal absolute -translate-x-2/4 -translate-y-2/4 z-10 shadow-slate-300 shadow-xl rounded-3xl left-2/4 top-2/4"
          v-if="isOpen"
        >
          <div
            class="modal-content rounded-3xl w-[500px] bg-white overflow-hidden"
          >
            <div
              class="modal-header flex justify-between items-center py-5 text-2xl text-white bg-slate-600 px-4"
            >
              <h1 class="font-bold">User Details</h1>
              <button
                class="text-white font-bold text-md text-end"
                @click="isOpen = false"
              >
                <IconClose />
              </button>
            </div>
            <div
              class="modal-body h-full w-full bg-white rounded-b-3xl px-4 py-6 max-h-[calc(80vh_-_100px)] overflow-y-auto"
            >
              <Form />
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </div>

  <table class="mb-7 w-full">
    <thead>
      <tr>
        <th
          class="border-slate-400 border-2 px-4 py-2 font-semibold text-white bg-slate-600 text-xl"
          v-for="(item, i) in tableHead"
          :key="i"
        >
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="index"
        class="border-black border px-2 py-0 text-center"
      >
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.name }}
        </td>
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.email }}
        </td>
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.gender }}
        </td>
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.mobile }}
        </td>
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.country }}
        </td>
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.state }}
        </td>
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.city }}
        </td>
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.pincode }}
        </td>
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.description }}
        </td>
        <td
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          <div class="flex justify-center gap-2">
            <button
              @click="editItem(index)"
              class="rounded-xl bg-blue-950 text-white p-2 my-1 font-bold text-md"
            >
              <IconEdit />
            </button>
            <button
              @click="deleteItem(index)"
              class="rounded-xl bg-blue-950 text-white p-2 my-1 font-bold text-md"
            >
              <IconDelete />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { watch, ref, onUnmounted } from "vue";
import { useLocationStore } from "../store";
import Form from "@/components/Form.vue";
const store = useLocationStore();
const isOpen = ref(false);
const tableHead = [
  "Name",
  "Email",
  "Gender",
  "Mobile",
  "Country",
  "State",
  "City",
  "Pincode",
  "Description",
  "Actions",
];
const items = store.getTableDetails;
const searchQuery = ref("");
const filteredItems = ref([]);
watch(
  () => store.getTableDetails,
  (data) => {}
);
// Watch for changes in the store data
watch(
  () => store.getTableDetails,
  (data) => {
    filteredItems.value = data;
  }
);
// Watch for changes in the search query
watch(searchQuery, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    search();
  }
});

const deleteItem = (index) => {
  store.deleteData(index);
};

const editItem = (index) => {
  const item = items.value[index];
  console.log(">>>", item);
};

// Search functionality
const search = () => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    filteredItems.value = store.getTableDetails;
  } else {
    filteredItems.value = store.getTableDetails.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
    );
  }
};

// close modale when clicking outside the modal
const closeModalOnClickOutside = (event) => {
  if (
    event.target.classList.contains(
      "fixed w-full h-full blur backdrop-blur z-10 left-0 top-0"
    )
  ) {
    isOpen.value = false;
  }
};
document.addEventListener("click", closeModalOnClickOutside);
</script>

<style>
/* .root {
  position: relative;
} */
/* .modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
} */

/* .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 998;
} */

/* .modal-content {
  width: 500px; 
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
} */

/* .modal-body {
  max-height: calc(80vh - 100px);
  overflow-y: auto;
} */
</style>

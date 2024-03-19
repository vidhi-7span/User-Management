<!-- Table.vue -->
<template>
  <div class="flex my-3">
    <button class="addIcon" @click="isOpen = true">
      <IconAdd />
    </button>
    <!-- Search Input -->
    <div class="relative ml-3">
      <input
        v-model="searchData"
        type="text"
        class="searchInput"
        placeholder="Search by Name or Country"
      />
      <button class="searchIcon">
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
              <Form
                :item="selectedItem"
                @data-submitted="
                  isOpen = false;
                  selectedItem = null;
                "
              />
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </div>

  <!-- Table -->
  <table class="mb-7 w-full">
    <!-- Table Header -->
    <thead>
      <tr>
        <th v-for="(item, i) in tableHead" :key="i" class="tableHeader">
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index" class="tableRow">
        <td class="tableData">{{ item.name }}</td>
        <td class="tableData">{{ item.email }}</td>
        <td class="tableData">{{ item.gender }}</td>
        <td class="tableData">{{ item.mobile }}</td>
        <td class="tableData">{{ item.country }}</td>
        <td class="tableData">{{ item.state }}</td>
        <td class="tableData">{{ item.city }}</td>
        <td class="tableData">{{ item.pincode }}</td>
        <td class="tableData">{{ item.description }}</td>
        <td class="tableData">
          <div class="flex justify-center gap-2">
            <button @click="editItem(index)" class="button">
              <IconEdit />
            </button>
            <button @click="deleteItem(index)" class="button">
              <IconDelete />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { watch, ref, computed } from "vue";
import { useLocationStore } from "../store";
import Form from "@/components/Form.vue";
const store = useLocationStore();
const isOpen = ref(false);
const selectedItem = ref(null);
const searchData = ref("");
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

// const items = store.getTableDetails;

watch(
  () => store.getTableDetails,
  (data) => {}
);

const items = computed(() => {
  if (searchData.value) {
    return store.getTableDetails.filter((item) => {
      if (
        item.name.toLowerCase().includes(searchData.value.toLowerCase()) ||
        item.country.toLowerCase().includes(searchData.value.toLowerCase())
      ) {
        return item;
      }
    });
  } else {
    return store.getTableDetails;
  }
});

// Delete
const deleteItem = (index) => {
  store.deleteData(index);
};

// Edit
const editItem = (index) => {
  selectedItem.value = { ...items.value[index] };
  isOpen.value = true;
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

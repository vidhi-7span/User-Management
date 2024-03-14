<!-- Table.vue -->
<template>
  <table class="mb-7 w-full">
    <tbody>
      <tr
        v-for="(item, index) in filteredItems"
        :key="index"
        class="border-black border px-2 py-0 text-center"
      >
        <td
          v-for="(value, key) in item"
          :key="key"
          class="bg-slate-200 border-slate-400 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ value }}
        </td>
        <!-- Actions -->
        <td>
          <div class="flex justify-center gap-2">
            <button
              @click="editItem(index)"
              class="rounded-xl bg-blue-950 text-white p-2 my-1 font-bold text-md"
            >
              Edit
            </button>
            <button
              @click="deleteItem(index)"
              class="rounded-xl bg-blue-950 text-white p-2 my-1 font-bold text-md"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from "vue";
import { useLocationStore } from "../store";
const store = useLocationStore();

// Define reactive variables
const searchQuery = ref("");
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

// Define a computed property to filter items based on search query
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return store.getTableDetails.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );
  });
});

// Delete item from table
const deleteItem = (index) => {
  store.deleteData(index);
};

// Edit item in table
const editItem = (index) => {
  // Implement edit functionality as per your requirement
};

// Perform search when search button clicked
const search = () => {
  // This function is already filtering items based on search query
};
</script>

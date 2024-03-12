<template>
  <table class="mb-7 ml-7">
    <thead>
      <tr>
        <th
          class="border-blue-950 border-2 px-4 py-2 font-bold text-gray-600 text-lg"
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
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.name }}
        </td>
        <td
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.email }}
        </td>
        <td
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.gender }}
        </td>
        <td
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.mobile }}
        </td>
        <td
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.country }}
        </td>
        <td
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.state }}
        </td>
        <td
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.city.name }}
        </td>
        <td
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.pincode }}
        </td>
        <td
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.description }}
        </td>
        <td
          class="border-blue-950 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          <div>
            <button
              @click="editItem(index)"
              class="rounded-sm bg-blue-950 text-white py-2 px-4 my-1 font-bold text-md"
            >
              Edit
            </button>
            <button
              @click="deleteItem(index)"
              class="rounded-sm bg-blue-950 text-white py-2 px-4 ml-2 my-1 font-bold text-md"
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
import { watch } from "vue";
import { useLocationStore } from "../store";

const store = useLocationStore();

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
watch(
  () => store.getTableDetails,
  (data) => {}
);

const deleteItem = (index) => {
  store.deleteData(index);
};

const editItem = (index) => {
  const item = items.value[index];
};
</script>

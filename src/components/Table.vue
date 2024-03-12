<template>
  <table class="mb-7 w-full">
    <thead>
      <tr>
        <th
          class="border-slate-400 border-2 px-4 py-2 font-bold text-white bg-slate-500 text-lg"
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
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.name }}
        </td>
        <td
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.email }}
        </td>
        <td
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.gender }}
        </td>
        <td
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.mobile }}
        </td>
        <td
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.country }}
        </td>
        <td
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.state }}
        </td>
        <td
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.city }}
        </td>
        <td
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.pincode }}
        </td>
        <td
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          {{ item.description }}
        </td>
        <td
          class="border-slate-200 border-2 px-2 py-0 font-medium text-gray-600 text-md"
        >
          <div>
            <button
              @click="editItem(index)"
              class="rounded-full bg-blue-950 text-white p-2 my-1 font-bold text-md"
            >
              <EditIcon />
            </button>
            <button
              @click="deleteItem(index)"
              class="rounded-full bg-blue-950 text-white p-2 ml-2 my-1 font-bold text-md"
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

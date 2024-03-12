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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3 21V3h10.925l-2 2H5v14h14v-6.95l2-2V21zm18.025-9H12zM9 15v-4.25L19.625.125L23.8 4.4L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
                ></path>
              </svg>
            </button>
            <button
              @click="deleteItem(index)"
              class="rounded-full bg-blue-950 text-white p-2 ml-2 my-1 font-bold text-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 21V6H4V4h5V3h6v1h5v2h-1v15zm2-2h10V6H7zm2-2h2V8H9zm4 0h2V8h-2zM7 6v13z"
                />
              </svg>
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

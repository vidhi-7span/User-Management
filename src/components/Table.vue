<template>
  <table>
    <thead>
      <tr>
        <th
          class="border-black border px-2"
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
        class="border-black border px-2 text-center"
      >
        <td class="border-black border px-2">{{ item.name }}</td>
        <td class="border-black border px-2">{{ item.email }}</td>
        <td class="border-black border px-2">{{ item.gender }}</td>
        <td class="border-black border px-2">{{ item.mobile }}</td>
        <td class="border-black border px-2">{{ item.country }}</td>
        <td class="border-black border px-2">{{ item.state }}</td>
        <td class="border-black border px-2">{{ item.city.name }}</td>
        <td class="border-black border px-2">{{ item.pincode }}</td>
        <td class="border-black border px-2">{{ item.description }}</td>
        <td>
          <div>
            <button
              @click="editItem(index)"
              class="rounded-sm ml-1 bg-gray-600 text-white px-4 py-2 my-2 font-bold"
            >
              Edit
            </button>
            <button
              @click="deleteItem(index)"
              class="rounded-sm ml-1 bg-gray-600 text-white px-4 py-2 my-2 font-bold"
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

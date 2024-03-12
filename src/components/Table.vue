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
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.mobile }}</td>
        <td>{{ item.country }}</td>
        <td>{{ item.state }}</td>
        <td>{{ item.city.name }}</td>
        <td>{{ item.pincode }}</td>
        <td>{{ item.description }}</td>
        <td>
          <button @click="editItem(index)">Edit</button>
          <button @click="deleteItem(index)">Delete</button>
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

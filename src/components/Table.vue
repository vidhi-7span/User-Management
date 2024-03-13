<template>
  <div class="flex my-3">
    <button class="rounded-xl bg-blue-950 text-white p-2 font-bold text-md">
      <IconAdd @click="isOpen = true" />
    </button>
    <button
      @click="searchClick()"
      class="rounded-xl bg-blue-950 text-white p-2 font-bold text-md ml-3"
    >
      <IconSearch />
    </button>

    <!-- Modal -->
    <div class="root">
      <teleport to="body" style="background-color: red">
        <div class="modal overflow-y-scroll" v-if="isOpen">
          <div class="flec justify-end items-end">
            <button
              class="rounded-xl bg-blue-950 text-white p-2 font-bold text-md text-end m-4"
            >
              <IconClose @click="isOpen = false" />
            </button>
          </div>
          <Form />
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
          <div>
            <button
              @click="editItem(index)"
              class="rounded-xl bg-blue-950 text-white p-2 my-1 font-bold text-md"
            >
              <IconEdit />
            </button>
            <button
              @click="deleteItem(index)"
              class="rounded-xl bg-blue-950 text-white p-2 ml-2 my-1 font-bold text-md"
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
import { watch, ref } from "vue";
import { useLocationStore } from "../store";
import IconSearch from "./icons/IconSearch.vue";
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
watch(
  () => store.getTableDetails,
  (data) => {}
);

const deleteItem = (index) => {
  store.deleteData(index);
};

const editItem = (index) => {
  const item = items.value[index];
  console.log(">>>", item);
};
</script>

<style>
.root {
  position: relative;
}
.modal {
  position: absolute;
  top: 75px;
  left: 85px;
  height: 85%;
  width: 90%;
  background-color: white;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.29);
}
</style>

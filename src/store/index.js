import { defineStore } from "pinia";

export const useLocationStore = defineStore("location", {
  state: () => ({
    data: [],
  }),
  getters: {
    getTableDetails(state) {
      console.log("Inside Getter");
      return state.data;
    },
  },
  actions: {
    async fetchLocations() {
      try {
        const response = await fetch("./locations.json");
        const data = await response.json();
        this.counties = data.counties;
      } catch (error) {
        console.error("Error fetching locations:", error);
        throw error;
      }
    },
    addData(entry) {
      console.log("Inside AddData", entry);
      this.data.push(entry);
    },
    deleteData(index) {
      this.data.splice(index, 1);
    },
    editData({ index, newData }) {
      this.data.splice(index, 1, newData);
    },
  },
});

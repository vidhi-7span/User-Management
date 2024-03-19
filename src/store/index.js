// ./components/store.index.js
import { defineStore } from "pinia";

const uuidv4 = () => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const useLocationStore = defineStore("location", {
  state: () => ({
    data: [
      {
        id: uuidv4(),
        name: "Vidhi",
        email: "vidhi@gmail.com",
        gender: "Female",
        mobile: "1234567890",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        pincode: "123456",
        description: "Lorem ipsum",
      },
      {
        id: uuidv4(),
        name: "Nidhi",
        email: "vidhi@gmail.com",
        gender: "Female",
        mobile: "1234567890",
        country: "USA",
        state: "California",
        city: "Los Angeles",
        pincode: "123456",
        description: "Lorem ipsum",
      },
      {
        id: uuidv4(),
        name: "Ridhi",
        email: "vidhi@gmail.com",
        gender: "Female",
        mobile: "1234567890",
        country: "India",
        state: "Rajasthan",
        city: "Jaipur",
        pincode: "123456",
        description: "Lorem ipsum",
      },
      {
        id: uuidv4(),
        name: "Ridhi",
        email: "vidhi@gmail.com",
        gender: "Female",
        mobile: "1234567890",
        country: "Canada",
        state: "Ontario",
        city: "Toronto",
        pincode: "123456",
        description: "Lorem ipsum",
      },
      {
        id: uuidv4(),
        name: "Sidhi",
        email: "vidhi@gmail.com",
        gender: "Female",
        mobile: "1234567890",
        country: "Canada",
        state: "Quebec",
        city: "Hamilton",
        pincode: "123456",
        description: "Lorem ipsum",
      },
      {
        id: uuidv4(),
        name: "Vidhi",
        email: "vidhi@gmail.com",
        gender: "Female",
        mobile: "1234567890",
        country: "India",
        state: "Maharastra",
        city: "Pune",
        pincode: "123456",
        description: "Lorem ipsum",
      },
      {
        id: uuidv4(),
        name: "Vidhi",
        email: "vidhi@gmail.com",
        gender: "Female",
        mobile: "1234567890",
        country: "USA",
        state: "New York",
        city: "Buffalo",
        pincode: "123456",
        description: "Lorem ipsum",
      },
      {
        id: uuidv4(),
        name: "Vidhi",
        email: "vidhi@gmail.com",
        gender: "Female",
        mobile: "1234567890",
        country: "Canada",
        state: "Quebec",
        city: "Ottawa",
        pincode: "123456",
        description: "Lorem ipsum",
      },
    ],
  }),
  getters: {
    getTableDetails(state) {
      return state.data;
    },
  },
  actions: {
    async fetchLocations() {
      try {
        const response = await fetch("./locations.json");
        const res = await response.json();
        this.counties = res.counties;
        return res.counties;
      } catch (error) {
        console.error("Error fetching locations:", error);
        throw error;
      }
    },

    addData(entry) {
      this.data.push(entry);
    },

    deleteData(index) {
      this.data.splice(index, 1);
    },
  },
});

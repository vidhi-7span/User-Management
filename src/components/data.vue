<template>
  <!-- your form template -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLocationStore } from "../store";

const store = useLocationStore();

const name = ref("");
const email = ref("");
const gender = ref("");
const mobile = ref("");
const selectedCountry = ref("");
const selectedState = ref("");
const selectedCity = ref("");
const pincode = ref("");
const description = ref("");

// Populate form fields when editing
onMounted(() => {
  store.selectedItem.subscribe((value) => {
    if (value) {
      name.value = value.name;
      email.value = value.email;
      gender.value = value.gender;
      mobile.value = value.mobile;
      selectedCountry.value = value.country;
      selectedState.value = value.state;
      selectedCity.value = value.city;
      pincode.value = value.pincode;
      description.value = value.description;
    }
  });
});

const handleSubmit = (data, { resetForm }) => {
  const isValid = true; // Add your validation logic here
  if (isValid) {
    const updatedData = {
      name: name.value,
      email: email.value,
      gender: gender.value,
      mobile: mobile.value,
      country: selectedCountry.value,
      state: selectedState.value,
      city: selectedCity.value,
      pincode: pincode.value,
      description: description.value,
    };
    store.updateData(updatedData);
    resetForm();
  }
};
</script>

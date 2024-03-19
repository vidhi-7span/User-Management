<!-- Form.vue -->
<template>
  <div class="flex justify-center items-center">
    <Form @submit="handleSubmit" class="submitForm">
      <!-- Name -->
      <div class="mt-2">
        <label class="formLabel" for="">Name: </label>
        <ErrorMessage name="Name" class="text-red-600" />
      </div>
      <Field name="Name" v-model="name" rules="required" class="inputField" />

      <!-- Email -->
      <div>
        <label class="formLabel" for="">Email: </label>
        <ErrorMessage class="text-red-600" name="Email" />
      </div>
      <Field
        name="Email"
        v-model="email"
        type="email"
        :rules="validateEmail"
        class="inputField"
      />

      <!-- Mobile Number -->
      <div>
        <label class="formLabel" for="">Mobile: </label>
        <ErrorMessage class="text-red-600 w-full" name="Mobile" />
      </div>
      <Field
        v-model="mobile"
        type="tel"
        class="inputField"
        :rules="validateMobile"
        name="Mobile"
      />

      <!-- Gender -->
      <div>
        <label class="formLabel" for="">Gender: </label>
        <ErrorMessage class="text-red-600" name="Gender" />
      </div>
      <div class="my-2">
        <Field
          v-model="gender"
          name="Gender"
          type="radio"
          value="Male"
          rules="required"
        />
        <span class="genderLabel">Male</span>

        <Field
          v-model="gender"
          name="Gender"
          type="radio"
          value="Female"
          rules="required"
          class="ml-2"
        />
        <span class="genderLabel">Female</span>
      </div>

      <!-- Country -->
      <div>
        <label class="formLabel">Country: </label>
        <ErrorMessage class="text-red-600" name="Country" />
      </div>
      <Field
        name="Country"
        as="select"
        v-model="selectedCountry"
        @change="getState"
        class="dropDown"
        rules="required"
      >
        <option value="" disabled>Select Country</option>
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </Field>

      <!-- State -->
      <div>
        <label class="formLabel" for="">State: </label>
        <ErrorMessage class="text-red-600" name="State" />
      </div>
      <Field
        name="State"
        as="select"
        v-model="selectedState"
        @change="getCities"
        class="dropDown"
        rules="required"
      >
        <option value="" disabled>Select State</option>
        <option v-for="(state, i) in states" :key="i" :value="state.name">
          {{ state.name }}
        </option>
      </Field>

      <!-- City -->
      <div>
        <label class="formLabel" for="">City: </label>
        <ErrorMessage class="text-red-600" name="City" />
      </div>
      <Field
        name="City"
        as="select"
        v-model="selectedCity"
        class="dropDown"
        rules="required"
      >
        <option value="" disabled>Select City</option>
        <option v-for="(city, i) in cities" :key="i" :value="city.name">
          {{ city.name }}
        </option>
      </Field>

      <!-- Pincode -->
      <div>
        <label class="formLabel" for="">Pincode: </label>
        <ErrorMessage class="text-red-600" name="pincode" />
      </div>
      <Field
        v-model="pincode"
        type="number"
        name="pincode"
        class="inputField"
        :rules="{ pincode: true }"
      />

      <!-- Description -->
      <div>
        <label class="formLabel" for="">Description: </label>
        <textarea v-model="description" class="formDesc"></textarea>
      </div>
      <button type="submit" @click="success" class="btnSubmit">Submit</button>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLocationStore } from "../store";
import { useToast } from "vue-toastification";
const toast = useToast();
const store = useLocationStore();
const emit = defineEmits(["data-submitted"]);
const { item } = defineProps(["item"]);

const name = ref("Vidhi");
const email = ref("vidhi@7span.com");
const gender = ref("Female");
const mobile = ref("9408708580");
const selectedCountry = ref("");
const selectedState = ref("");
const selectedCity = ref("");
const pincode = ref("");
const description = ref("");

// Store Dropdown Details
const countries = ref([]);
const states = ref([]);
const cities = ref([]);

onMounted(async () => {
  try {
    await store.fetchLocations();
    countries.value = store.counties.map((county) => county.name);
    if (item) {
      name.value = item.name;
      email.value = item.email;
      gender.value = item.gender;
      mobile.value = item.mobile;
      selectedCountry.value = item.country;
      getState();
      selectedState.value = item.state;
      getCities();
      selectedCity.value = item.city;
      pincode.value = item.pincode;
      description.value = item.description;
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
});

// Get State
const getState = () => {
  const tempCounties = store.counties.find(
    (county) => county.name == selectedCountry.value
  );
  states.value = tempCounties.states;
};

// Get Cities
const getCities = () => {
  const tempStates = states.value.find(
    (state) => state.name == selectedState.value
  );
  cities.value = tempStates.cities;
};

const handleSubmit = (newData, { resetForm }) => {
  const isValid = true;
  if (isValid) {
    const newData = {
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

    if (item) {
      const index = store.data.findIndex((entry) => entry.id === item.id);
      if (index !== -1) {
        store.data[index] = newData;
      }
    } else {
      store.addData(newData);
      toast.error("Data added Successfully! 🎉");
    }

    resetForm();
    emit("data-submitted");
  }
};

// Validation for Email
const validateEmail = (value) => {
  if (!value) {
    return "Email is required";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "Enter valid email";
  }
  return true;
};

// Validation for Mobile
const validateMobile = (value) => {
  if (!value) {
    return "Mobile is required";
  }
  const regex = /^\d{10}$/;
  if (!regex.test(value)) {
    return "Please enter a valid 10-digit mobile number";
  }
  return true;
};
</script>

<template>
  <h1 class="font-bold py-3 text-xl underline">Details</h1>
  <Form
    @submit="handleSubmit"
    v-slot="{ errors }"
    class="flex flex-col justify-center"
  >
    <!-- Name -->
    <div>
      <label class="font-bold" for="">Name: </label>
      <Field
        name="Name"
        v-model="name"
        placeholder="Enter Name"
        rules="required"
        class="border border-black px-2 my-2"
      />
    </div>
    <ErrorMessage name="Name" class="text-red-600 pl-14" />

    <!-- Email -->
    <div>
      <label class="font-bold" for="">Email: </label>
      <Field
        name="Email"
        v-model="email"
        type="email"
        placeholder="Enter Email"
        :rules="validateEmail"
        class="border border-black px-2 my-2"
      />
    </div>
    <ErrorMessage class="text-red-600 pl-14" name="Email" />

    <!-- Gender -->
    <div class="my-2">
      <label class="font-bold" for="">Gender: </label>
      <Field
        v-model="gender"
        name="Gender"
        type="radio"
        value="Male"
        rules="required"
      />
      Male

      <Field
        v-model="gender"
        name="Gender"
        type="radio"
        value="Female"
        rules="required"
      />
      Female
    </div>
    <ErrorMessage class="text-red-600 pl-14" name="Gender" />

    <!-- Mobile Number -->
    <div>
      <label class="font-bold" for="">Mobile: </label>
      <Field
        v-model="mobile"
        type="tel"
        class="border border-black my-2 px-2"
        placeholder="Enter Mobile"
        :rules="validateMobile"
        name="Mobile"
      />
    </div>
    <ErrorMessage class="text-red-600 pl-14" name="Mobile" />

    <!-- Country -->
    <div>
      <label class="font-bold">Country: </label>
      <Field
        name="Country"
        as="select"
        v-model="selectedCountry"
        @change="handleStateChange"
        class="border border-black px-2 my-2"
        rules="required"
      >
        <option value="">Select Country</option>
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </Field>
    </div>
    <ErrorMessage class="text-red-600 pl-14" name="Country" />

    <!-- State -->
    <div>
      <label class="font-bold" for="">State: </label>
      <Field
        name="State"
        as="select"
        v-model="selectedState"
        @change="getCities"
        class="border border-black px-2 my-2"
        rules="required"
      >
        <option value="">Select State</option>
        <option
          v-for="(state, i) in states.states"
          :key="i"
          :value="state.name"
        >
          {{ state.name }}
        </option>
      </Field>
    </div>
    <ErrorMessage class="text-red-600 pl-14" name="State" />

    <!-- City -->
    <div>
      <label class="font-bold" for="">City: </label>
      <Field
        name="City"
        as="select"
        v-model="selectedCity.name"
        class="border border-black px-2 my-2"
        rules="required"
      >
        <option value="">Select City</option>
        <option v-for="(city, i) in cities.cities" :key="i" :value="city">
          {{ city.name }}
        </option>
      </Field>
    </div>
    <ErrorMessage class="text-red-600 pl-14" name="City" />

    <!-- Pincode -->
    <div>
      <label class="font-bold" for="">Pincode: </label>
      <Field
        v-model="pincode"
        type="number"
        placeholder="Pincode"
        name="pincode"
        class="border border-black px-2 my-2"
        :rules="{ pincode: true }"
      />
    </div>
    <ErrorMessage class="text-red-600 pl-14" name="pincode" />
    <!-- <span class="text-red-600 pl-14">{{ errors.pincode }}</span> -->

    <!-- Description -->
    <div>
      <label class="font-bold" for="">Description: </label>
      <textarea
        v-model="description"
        placeholder="Description"
        class="border border-black px-2"
      ></textarea>
    </div>

    <button
      type="submit"
      class="w-60 rounded-sm ml-1 bg-gray-600 text-white px-4 py-2 my-3 font-bold"
    >
      Submit
    </button>
  </Form>
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

// Define ref for form errors
const errors = ref({
  name: "",
  email: "",
  gender: "",
  mobile: "",
  selectedCountry: "",
  selectedState: "",
  selectedCity: "",
  pincode: "",
});

// Define refs for dynamic dropdown options
const countries = ref([]);
const states = ref([]);
const cities = ref([]);

// Fetch countries data
onMounted(async () => {
  try {
    await store.fetchLocations();
    countries.value = store.counties.map((county) => county.name);
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
});

//  Get State based on Country
const handleStateChange = () => {
  states.value = store.counties.find(
    (county) => county.name == selectedCountry.value
  );
};

// Get Cities based on State
const getCities = () => {
  cities.value = states.value.states.find(
    (county) => county.name == selectedState.value
  );
};

const handleSubmit = (data, { resetForm }) => {
  const isValid = validateForm();
  if (isValid) {
    const data = {
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
    store.addData(data);
    resetForm();
    refreshDetails();
  }
};

const refreshDetails = () => {};

const validateForm = () => {
  let isValid = true;

  // if (!name.value) {
  //   errors.value.name = "Name is required";
  //   isValid = false;
  // } else {
  //   errors.value.name = "";
  // }

  // if (!email.value) {
  //   errors.value.email = "Email is required";
  //   isValid = false;
  // } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
  //   errors.value.email = "Email is invalid";
  //   isValid = false;
  // } else {
  //   errors.value.email = "";
  // }

  if (!gender.value) {
    errors.value.gender = "Gender is required";
    isValid = false;
  } else {
    errors.value.gender = "";
  }

  if (!mobile.value) {
    errors.value.mobile = "Mobile number is required";
    isValid = false;
  } else if (!/^\d{10}$/.test(mobile.value)) {
    errors.value.mobile = "Mobile number is invalid";
    isValid = false;
  } else {
    errors.value.mobile = "";
  }

  if (!selectedCountry.value) {
    errors.value.selectedCountry = "Country is required";
    isValid = false;
  } else {
    errors.value.selectedCountry = "";
  }

  if (!selectedState.value) {
    errors.value.selectedState = "State is required";
    isValid = false;
  } else {
    errors.value.selectedState = "";
  }
  if (!selectedCity.value) {
    errors.value.selectedCity = "City is required";
    isValid = false;
  } else {
    errors.value.selectedCity = "";
  }

  if (!pincode.value) {
    errors.value.pincode = "Pincode is required";
    isValid = false;
  } else if (!/^\d{6}$/.test(pincode.value)) {
    errors.value.pincode = "Pincode must be a 6-digit number";
    isValid = false;
  } else {
    errors.value.pincode = "";
  }

  return isValid;
};

const validateEmail = (value) => {
  if (!value) {
    return "This field is required";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }
  return true;
};

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

const resetForm = () => {
  name.value = "";
  email.value = "";
  gender.value = "";
  mobile.value = "";
  selectedCountry.value = "";
  selectedState.value = "";
  selectedCity.value = "";
  pincode.value = "";
  description.value = "";
};
</script>

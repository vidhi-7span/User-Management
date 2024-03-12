<template>
  <div class="flex justify-center items-center">
    <h1
      class="font-bold py-3 text-2xl text-white bg-slate-500 w-2/5 mt-7 px-10 rounded-t-3xl"
    >
      User Details
    </h1>
  </div>
  <div class="flex justify-center items-center">
    <Form
      @submit="handleSubmit"
      class="flex flex-col rounded-b-3xl shadow-xl w-2/5 pb-10 px-10 mx-7 mb-7 border-t-2"
    >
      <!-- Name -->
      <div class="mt-2">
        <label class="font-medium text-gray-600 text-xl" for="">Name: </label>
        <ErrorMessage name="Name" class="text-red-600" />
      </div>
      <Field
        name="Name"
        v-model="name"
        rules="required"
        class="border my-2 py-2 px-2 bg-slate-200 focus:outline-none"
      />

      <!-- Email -->
      <div>
        <label class="font-medium text-gray-600 text-xl" for="">Email: </label>
        <ErrorMessage class="text-red-600" name="Email" />
      </div>
      <Field
        name="Email"
        v-model="email"
        type="email"
        :rules="validateEmail"
        class="border my-2 py-2 px-2 bg-slate-200 focus:outline-none"
      />

      <!-- Mobile Number -->
      <div>
        <label class="font-medium text-gray-600 text-xl" for="">Mobile: </label>
        <ErrorMessage class="text-red-600 w-full" name="Mobile" />
      </div>
      <Field
        v-model="mobile"
        type="tel"
        class="border my-2 py-2 px-2 bg-slate-200 focus:outline-none"
        :rules="validateMobile"
        name="Mobile"
      />

      <!-- Gender -->
      <div>
        <label class="font-medium text-gray-600 text-xl" for="">Gender: </label>
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
        <span class="font-normal text-gray-600 text-lg pl-2">Male</span>

        <Field
          v-model="gender"
          name="Gender"
          type="radio"
          value="Female"
          rules="required"
          class="ml-2"
        />
        <span class="font-normal text-gray-600 text-lg pl-2">Female</span>
      </div>

      <!-- Country -->
      <div>
        <label class="font-medium text-gray-600 text-xl">Country: </label>
        <ErrorMessage class="text-red-600" name="Country" />
      </div>
      <Field
        name="Country"
        as="select"
        v-model="selectedCountry"
        @change="getState"
        class="border my-2 py-2 px-2 bg-slate-200 focus:outline-none font-normal text-gray-600 text-lg"
        rules="required"
      >
        <option value="" disabled>Select Country</option>
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </Field>

      <!-- State -->
      <div>
        <label class="font-medium text-gray-600 text-xl" for="">State: </label>
        <ErrorMessage class="text-red-600" name="State" />
      </div>
      <Field
        name="State"
        as="select"
        v-model="selectedState"
        @change="getCities"
        class="border my-2 py-2 px-2 bg-slate-200 focus:outline-none font-normal text-gray-600 text-lg"
        rules="required"
      >
        <option value="" disabled>Select State</option>
        <option
          v-for="(state, i) in states.states"
          :key="i"
          :value="state.name"
        >
          {{ state.name }}
        </option>
      </Field>

      <!-- City -->
      <div>
        <label class="font-medium text-gray-600 text-xl" for="">City: </label>
        <ErrorMessage class="text-red-600" name="City" />
      </div>
      <Field
        name="City"
        as="select"
        v-model="selectedCity"
        class="border my-2 py-2 px-2 bg-slate-200 focus:outline-none font-normal text-gray-600 text-lg"
        rules="required"
      >
        <option value="" disabled>Select City</option>
        <option v-for="(city, i) in cities.cities" :key="i" :value="city.name">
          {{ city.name }}
        </option>
      </Field>

      <!-- Pincode -->
      <div>
        <label class="font-medium text-gray-600 text-xl" for=""
          >Pincode:
        </label>
        <ErrorMessage class="text-red-600" name="pincode" />
      </div>
      <Field
        v-model="pincode"
        type="number"
        name="pincode"
        class="border my-2 py-2 px-2 bg-slate-200 focus:outline-none"
        :rules="{ pincode: true }"
      />

      <!-- Description -->
      <div>
        <label class="font-medium text-gray-600 text-xl" for=""
          >Description:
        </label>
        <textarea
          v-model="description"
          class="px-2 py-2 my-2 w-full bg-slate-200 focus:outline-none"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full rounded-sm bg-blue-950 text-white py-3 mt-3 font-bold text-lg"
      >
        Submit
      </button>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLocationStore } from "../store";

const store = useLocationStore();

const name = ref("Vidhi Suthar");
const email = ref("vidhi@gmail.com");
const gender = ref("fe");
const mobile = ref("1234567890");
const selectedCountry = ref("India");
const selectedState = ref("Gujarat");
const selectedCity = ref("Ahmedabad");
const pincode = ref("123456");
const description = ref("asdfghjkl");

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
const getState = () => {
  states.value = store.counties.find(
    (county) => county.name == selectedCountry.value
  );
};

// Get Cities based on State
const getCities = () => {
  cities.value = states.value.states.find(
    (state) => state.name == selectedState.value
  );
};

const handleSubmit = (data, { resetForm }) => {
  console.log("selectedCity", selectedCity.value);
  const isValid = true;
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

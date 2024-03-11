import { createApp } from "vue";
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import * as AllRules from "@vee-validate/rules";

// Set up the VeeValidate configuration
configure({
  // configure options if needed
});

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

defineRule("pincode", (value) => {
  if (!/^\d{6}$/.test(value)) {
    return "PIN code must be a 6-digit number";
  }
  return true;
});

// Define the plugin
const VeeValidatePlugin = {
  install(app) {
    // Register VeeValidate components globally
    app.component("Field", Field);
    app.component("Form", Form);
    app.component("ErrorMessage", ErrorMessage);
  },
};

export default VeeValidatePlugin;

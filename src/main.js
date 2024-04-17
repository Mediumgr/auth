import { createApp } from "vue";
import "primevue/resources/themes/aura-light-green/theme.css";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.component("InputText", InputText);
app.component("FloatLabel", FloatLabel);
app.component("InputPassword", Password);
app.component("CustomButton", Button);

app
  .use(store)
  .use(router)
  .use(PrimeVue, { inputStyle: "filled", ripple: true });

const userString = localStorage.getItem("user");
if (userString) {
  const userData = JSON.parse(userString);
  store.commit("SET_USER_DATA", userData);
}
app.mount("#app");

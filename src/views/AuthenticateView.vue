<template>
  <Message
    :severity="message.severity"
    :closable="false"
    class="message"
    v-if="showMsg"
  >
    {{ message.content }}
  </Message>
  <div class="form-wrapper" v-if="!store.state.user">
    <component :is="loginRegister" @status="status($event)" />
    <router-link
      to="/register"
      v-if="isNewUser"
      @click.stop="toggleComponent"
      class="auth-link"
    >
      <span>Зарегистрироваться </span>
    </router-link>
    <router-link
      to="/login"
      v-else
      class="auth-link"
      @click.stop="toggleComponent"
    >
      <span>Уже имеется аккаунт? Войти </span>
    </router-link>
  </div>
  <div v-else-if="store.state.user && !username.token" class="form-wrapper">
    <div class="success__auth">
      <component :is="loginRegister" @status="status($event)" />
    </div>
  </div>
  <div v-else class="success__auth">
    <p>
      Вы успешно авторизовались, ваш логин:
      <strong> {{ username.name }} </strong>
    </p>
    <router-link to="/about">
      <CustomButton label="перейти в профиль" link></CustomButton>
    </router-link>
  </div>
</template>

<script setup>
import Message from "primevue/message";
import RegisterUser from "@/components/RegisterUser.vue";
import LoginUser from "@/components/LoginUser.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
const store = useStore();
const username = ref({});
const showMsg = ref(false);

const isNewUser = computed(() => store.state.isNewUser);
const loginRegister = computed(() =>
  isNewUser.value ? LoginUser : RegisterUser
);
const toggleComponent = () => store.dispatch("isNewUser", !isNewUser.value);

const message = ref({
  severity: "",
  content: "",
});

const status = (event) => {
  showMsg.value = true;
  message.value.severity = event.status;
  message.value.content = event.message;
};

onMounted(() => {
  let user = JSON.parse(localStorage.getItem("user"));
  username.value = {
    name: user?.username,
    token: user?.token,
  };
});
</script>

<style lang="scss" scoped>
.auth-link {
  font-size: 0.8em;
  text-decoration: underline;
  color: #2c3e50;
  cursor: pointer;
  padding-top: 15px;
}

.form-wrapper,
.success__auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.message {
  position: absolute;
  top: 50px;
  width: fit-content;
}
</style>

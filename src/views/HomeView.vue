<template>
  <div class="wrapper">
    <h1>Добро пожаловать на сайт</h1>
    <template v-if="!store.state.user">
      <div class="wrapper__content">
        Для доступа к приложению вам нужно
        <router-link to="login" @click.stop="isNew(false)">
          <CustomButton label="Войти" link></CustomButton
        ></router-link>
        или
        <router-link to="register" @click.stop="isNew(true)">
          <CustomButton label="Зарегистрироваться" link></CustomButton
        ></router-link>
      </div>
    </template>
    <div class="logged" v-else>
      <p>
        Ваш логин <strong>{{ username.name }} </strong>
      </p>
      <router-link v-if="username.token" to="/about">
        <CustomButton label="перейти в профиль" link></CustomButton>
      </router-link>
      <template v-else>
        <div class="div">, для входа необходимо</div>
        <router-link to="/login" @click.stop="isNew(false)">
          <CustomButton label="авторизоваться" link></CustomButton>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useLoginRegister } from "@/composables/useLoginRegister";
const store = useStore();

const isNew = (isNewUser) => useLoginRegister(isNewUser, store);

const username = computed(() => {
  return {
    name: JSON.parse(localStorage.getItem("user"))?.username,
    token: JSON.parse(localStorage.getItem("user"))?.token,
  };
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.logged {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

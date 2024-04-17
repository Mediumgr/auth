<template>
  <div class="nav">
    <router-link to="/" v-if="!user">
      <CustomButton link label="Вернуться на главную"></CustomButton
    ></router-link>
    <template v-if="user">
      <CustomButton
        @click.stop="logout"
        type="button"
        label="Выйти"
        class="nav__logout"
      >
      </CustomButton>
    </template>
    <div v-else class="nav__authenticate">
      <router-link to="login" @click.stop="isNew(false)" class="button">
        <CustomButton label="Войти"></CustomButton
      ></router-link>

      <router-link to="register" @click.stop="isNew(true)">
        <CustomButton label="Регистрация"></CustomButton
      ></router-link>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useLoginRegister } from "@/composables/useLoginRegister";
const store = useStore();

const isNew = (isNewUser) => useLoginRegister(isNewUser, store);

const user = computed(() => store.state.user);
const logout = () => store.dispatch("logout");
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__authenticate {
    display: flex;
    align-items: center;
  }
}

.button {
  padding-right: 1rem;
}
</style>

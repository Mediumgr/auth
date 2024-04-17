<template>
  <div class="content">
    <div v-if="error.status" class="error">
      <Message :severity="error.severity" class="message">
        {{ error.message }}
      </Message>
      <div class="content__info">
        <router-link to="/login">
          <CustomButton label="нажмите" link></CustomButton>
        </router-link>
        <p>, чтобы авторизоваться</p>
      </div>
    </div>
    <div v-if="!!userInfo.id" class="content__card">
      <h1>Информация о пользователе</h1>
      <Card style="width: 25rem; overflow: hidden" class="card">
        <template #header>
          <img
            alt="user header"
            src="https://cs8.pikabu.ru/post_img/2016/01/29/4/og_og_145404340428945586.jpg"
          />
        </template>
        <template #title>Ваше имя: {{ userInfo.username }}</template>
        <template #subtitle>Ваш id: {{ userInfo.id }}</template>
        <template #content>
          <p class="m-0">{{ userInfo.about }}</p>
        </template>
        <template #footer>
          <div class="flex gap-3 mt-1">
            <router-link to="/">
              <CustomButton
                label="вернуться на главную страницу"
                link
              ></CustomButton>
            </router-link>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import Message from "primevue/message";
import { useStore } from "vuex";
import { ref } from "vue";
const store = useStore();

const userInfo = ref({});
const error = ref({});

store
  .dispatch("goToProfile")
  .then((response) => {
    userInfo.value = { ...response.data };
  })
  .catch((err) => {
    if (err) {
      error.value = {
        status: err.response?.status,
        message: err.response?.data.error ?? err.response.data.message,
        severity: "error",
      };
    }
  });
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 70vh;
  margin-top: 50px;

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.card {
  display: flex;
  align-items: center;
}

img {
  height: 200px;
}

.message {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
}
</style>

<template>
  <form @submit.stop.prevent="sendData">
    <FloatLabel class="floatLabel">
      <label for="username">Имя:</label>
      <InputText id="username" v-model="username" :invalid="isNameInvalid" />
    </FloatLabel>
    <p v-if="isNameInvalid" class="error">имя не может быть пустым</p>
    <FloatLabel class="floatLabel">
      <label for="password">Пароль:</label>
      <InputPassword
        id="password"
        v-model="password"
        :feedback="false"
        :invalid="isPasswordInvalid"
      />
    </FloatLabel>
    <p v-if="isPasswordInvalid" class="error">пароль не может быть пустым</p>
    <CustomButton :label="props.settings.label" type="submit" />
  </form>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const emit = defineEmits(["status"]);
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const router = useRouter();
const username = ref(null);
const password = ref(null);
let isNameInvalid = ref(false);
let isPasswordInvalid = ref(false);

const sendData = async () => {
  try {
    await store.dispatch(props.settings.action, {
      username: username.value,
      password: password.value,
    });
    router.push({ name: "About" });
  } catch (error) {
    checkNameAndPassword();
    const message = showErrorMessage(error);
    emit("status", { status: "error", message });
  }
};

const checkNameAndPassword = () => {
  isNameInvalid.value = !username.value;
  isPasswordInvalid.value = !password.value;
};

const showErrorMessage = (error) => {
  let errorMessage = "Возникла неизвестная ошибка";

  if (error.response && error.response.status === 500) {
    errorMessage = error.message;
  } else if (error.response && error.response.data.error) {
    errorMessage = error.response.data.error;
  }

  return errorMessage;
};

watch(password, (passwordValue) => {
  if (passwordValue.length > 0) {
    isPasswordInvalid.value = false;
  }
});

watch(username, (nameValue) => {
  if (nameValue.length > 0) {
    isNameInvalid.value = false;
  }
});
</script>

<style lang="scss" scoped>
form {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.error {
  color: red;
}

.floatLabel {
  margin-bottom: 10px;
}
</style>

<template>
  <BaseForm v-model:settings="settings"></BaseForm>
</template>

<script setup>
import BaseForm from "@/BaseElements/BaseForm";
import { ref } from "vue";

const settings = ref({ label: "Войти", action: "login" });
</script>

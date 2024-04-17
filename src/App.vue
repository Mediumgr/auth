<template>
  <div class="app">
    <nav>
      <app-nav />
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import AppNav from "@/components/AppNav.vue";
</script>

<style lang="scss">
@import "~normalize.css";
.app {
  padding: 1rem 3rem;
}
</style>

<template>
  <div class="content">
    <Header />
    <Body />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Body from './components/Body.vue';
</script>

<style>
.content {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>

<template>
  <div class="header">
    <Left></Left>
    <Right></Right>
  </div>
</template>

<script setup lang="ts">
import Left from './Left.vue';
import Right from './Right.vue';
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  height: 49px;
  .header-left {
    cursor: pointer;
    margin-left: 10px;
  }
  .header-right {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>

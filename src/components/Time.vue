<template>
  <div class="time">
    <span>{{ hTime }}</span>
    <span>:</span>
    <span>{{ mTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const hTime = ref();
const mTime = ref();

function setTime() {
  const data = new Date();
  let hours = data.getHours();
  let minutes = data.getMinutes();
  hTime.value = hours < 10 ? `0${hours}` : hours;
  mTime.value = minutes < 10 ? `0${minutes}` : minutes;
}

setTime();

const timer = setInterval(setTime, 5000);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.time {
  padding: 0 0 30px;
  text-align: center;
  font-size: 36px;
  text-shadow: 0 0 20px rgb(0 0 0 / 35%);
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.time span {
  animation: show linear 1s alternate;
}
.time span:nth-of-type(1) {
  color: #fff;
}

.time span:nth-of-type(2) {
  color: #fff;
}

.time span:nth-of-type(3) {
  color: #fff;
}
</style>

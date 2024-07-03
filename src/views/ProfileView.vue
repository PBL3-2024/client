<script setup lang="ts">
import { ref } from 'vue';

const message = ref('');
const message1 = ref('');

</script>

<template>
  <main>
    <h1>Profile</h1>

    <p>Name: {{ message }}</p>
    <input v-model="message"  />

    <p>Postal code: {{ message1 }}</p>
    <input v-model="message1"  />

  </main>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <ul>
      <li>Logo</li>
      <li>
        <button>Profile</button>
      </li>
    </ul>
  </nav>
  <main>
    <RouterView />  
  </main>
</template>

<style lang="scss">
@import 'primeicons/primeicons.css';
</style>

<style lang="scss" scoped>
nav {
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: justify;
    justify-content: space-between;
  }
}
</style>

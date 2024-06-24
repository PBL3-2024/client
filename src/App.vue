<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="main-wrapper">
    <div class="main-container">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">andi</RouterLink>
        <RouterLink to="/occupations">explore all occupations</RouterLink>
        <RouterLink to="/homepage">homepageview</RouterLink>
      </nav>
      <RouterView />  
    </div>
  </div>
</template>

<style lang="scss">
@import 'primeicons/primeicons.css'
</style>

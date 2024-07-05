<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

const login = function() {
  loginWithRedirect();
}

const doLogout = function() {
  logout({ logoutParams: { returnTo: window.location.origin } });
}

</script>

<template>
  <nav>
    <ul>
      <li>Logo</li>
      <li>
        <button v-if="isAuthenticated">{{ user?.name }}'s Profile</button>
        <button v-if="isAuthenticated" @click="doLogout">Sign-out</button>
        <button v-if="!isAuthenticated" @click="login">Sign-in/Register</button>
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

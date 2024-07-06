<script setup lang="ts">
import { ref } from 'vue';
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
  <v-app theme="light">
    <v-app-bar elevation="1">
      <v-app-bar-title><RouterLink to="/">Occupation Explorer</RouterLink></v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated">My Profile</v-btn>
      <v-btn v-if="isAuthenticated" @click="doLogout">Sign Out</v-btn>
      <v-btn v-if="!isAuthenticated" @click="login">Sign In / Register</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <RouterView />  
      </v-container>
    </v-main>
  </v-app>
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

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useAuth0 } from "@auth0/auth0-vue";

const { isAuthenticated } = useAuth0();

</script>

<template>
  <main v-if="!isAuthenticated">
    <h1>Certification Information</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </main>
  <main v-if="isAuthenticated">
    <h1>Profile Homepage</h1>
    <Card>
    <template #title>Edit Your Current Job</template>
    <template #content>
        <p class="m-0">
          <router-link to="/profile">
            <Button label="Edit" />
          </router-link>
        </p>
    </template>
  </Card>

  <Card>
    <template #title>Explore Occupation</template>
    <template #content>
        <p class="m-0">
          <router-link to="/occupations/00-0000">
            <Button label="Explore" />
          </router-link>
        </p>
    </template>
  </Card>

  <Card>
    <template #title>Download Report Data</template>
    <template #content>
        <p class="m-0">
          <router-link to=" ">
            <Button label="Download" />
          </router-link>
        </p>
    </template>
  </Card>

  <Card>
    <template #title>Delete My Account</template>
    <template #content>
        <p class="m-0">
          <router-link to=" ">
            <Button label="Delete" />
          </router-link>
        </p>
    </template>
  </Card>
  </main>
</template>
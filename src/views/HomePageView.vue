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
    <v-row>
      <v-col cols="12" md="6">
        <v-card title="Current Job" subtitle="Tell us about your current job" variant="elevated">
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue-accent-4" variant="outlined">Select Job</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card title="Future Occupation" subtitle="Explore occupations and find your perfect career" variant="elevated">
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue-accent-4" variant="outlined" to="/occupations/00-0000/">Explore Careers</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card title="Download Report Data" variant="tonal">
          
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card title="Delete Your Account" variant="tonal" color="red">
          
        </v-card>
      </v-col>
    </v-row>
  </main>
</template>
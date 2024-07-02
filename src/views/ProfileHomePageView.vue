<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';


</script>

<template>
  <main>
    <h1>Profile Homepage</h1>
    <Card>
    <template #title>Edit Your Current Job</template>
    <template #content>
        <p class="m-0">
          <router-link to="/pview">
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
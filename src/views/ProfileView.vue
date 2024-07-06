<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type Profile, updateProfile } from '@/api/profile';
import { useProfileStore } from '@/stores/profile';
import { useAuth0 } from '@auth0/auth0-vue';
import { watch } from 'fs';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref<string | undefined>();
const postalCode = ref<string | undefined>();
const email = ref<string | undefined>();

const auth0 = useAuth0();
const profileStore = useProfileStore();
const profile = ref<Profile | undefined>();
onMounted(async () => {
  profile.value = await profileStore.getOrFetch(auth0);
  name.value = profile.value?.name
  postalCode.value = profile.value?.postalCode
  email.value = profile.value?.email
});

async function doUpdate() {
  await profileStore.updateProfile({
    id: undefined,
    currentSocCode: undefined,
    goalSocCode: undefined,
    termsOfUseConsent: undefined,
    ... profile.value,
    name: name.value,
    postalCode: postalCode.value,
    email: email.value
  });
  router.push('/');
}

</script>

<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <v-text-field v-model="name" label="Name"></v-text-field>
          <v-text-field v-model="email" label="Email Address"></v-text-field>
          <v-text-field v-model="postalCode" label="Postal Code"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue-accent-4" variant="outlined" to="/">Back</v-btn>
          <v-btn color="blue-accent-4" variant="outlined" @click="doUpdate">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
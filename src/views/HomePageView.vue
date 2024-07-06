<script setup lang="ts">
import { ref } from 'vue';
import { useAuth0 } from "@auth0/auth0-vue";
import { type Profile } from '@/api/profile';
import { useProfileStore } from '@/stores/profile';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { fetchOccupation, type Occupation } from '@/api/occupation';
import ReportCard from '@/components/ReportCard.vue'

const { isAuthenticated } = useAuth0();
const profileStore = useProfileStore();
const auth0 = useAuth0();

const profile = ref<Profile | undefined>();
const currentJob = ref<Occupation | undefined>();
const goalJob = ref<Occupation | undefined>();

const refreshContent = async () => {
  profile.value = await profileStore.getOrFetch(auth0);
  if (profile.value?.currentSocCode) {
    currentJob.value = (await fetchOccupation(profile.value.currentSocCode)).data;
  }
  if (profile.value?.goalSocCode) {
    goalJob.value = (await fetchOccupation(profile.value.goalSocCode)).data;
  }
}

onMounted(refreshContent);

const setupPhase = computed(() => {
  if (!profile.value) {
    return 0;
  }
  if (!profile.value.postalCode || !profile.value.name || !profile.value.email) {
    console.log(profile.value);
    return 1;
  }
  if (!profile.value.currentSocCode) {
    console.log('2');
    return 2;
  }
  if (!profile.value.goalSocCode) {
    return 3;
  }
  return 0;
})

</script>

<template>
  <main v-if="!isAuthenticated">
    <h1>Certification Information</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </main>
  <main v-if="isAuthenticated">
    <v-row v-if="setupPhase !== 0">
      <v-col cols="12">
        <v-stepper :model-value="setupPhase">
          <v-stepper-header>
            <v-stepper-item
            title="Set Up Your Profile"
            :value="1"
            ></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item
            title="Tell Us About Your Current Job"
            :value="2"
            ></v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item
            title="Find Your Dream Career"
            :value="3"
            ></v-stepper-item>
          </v-stepper-header>
          <v-card v-if="setupPhase === 1" title="Set Up Your Profile" flat>
            <v-card-actions>
              <v-btn color="blue-accent-4" variant="outlined" to="/profile">Edit Profile</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-if="setupPhase === 2" title="Tell Us About Your Current Job" flat>
            <v-card-actions>
              <v-btn color="blue-accent-4" variant="outlined" to="/select/00-0000">Select Job</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-if="setupPhase === 3" title="Find Your Dream Career" flat>
            <v-card-actions>
              <v-btn color="blue-accent-4" variant="outlined" to="/occupations/00-0000">Explore Careers</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card variant="elevated">
          <v-card-title class="occupation-card-title">
            <span>Current Job</span>
            <v-btn v-if="currentJob" color="blue-accent-4" variant="text" :to="`/occupations/${currentJob.socCode}`">{{ currentJob.title }}</v-btn>
          </v-card-title>
          <v-card-subtitle>Tell us about your current job</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue-accent-4" variant="outlined" to="/select/00-0000">Select Job</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="elevated">
          <v-card-title class="occupation-card-title">
            <span>Future Occupation</span>
            <v-btn v-if="goalJob" color="blue-accent-4" variant="text" :to="`/occupations/${goalJob.socCode}`">{{ goalJob.title }}</v-btn>
          </v-card-title>
          <v-card-subtitle>Explore occupations and find your perfect career</v-card-subtitle>
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
          <ReportCard/>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card title="Delete Your Account" variant="tonal" subtitle="Not Available in Prototype" color="red">
          
        </v-card>
      </v-col>
    </v-row>
  </main>
</template>

<style scope>
.occupation-card-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
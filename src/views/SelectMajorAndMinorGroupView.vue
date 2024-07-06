<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchChildOccupation, fetchOccupation, type Occupation } from '@/api/occupation'
import { useRoute, useRouter } from 'vue-router'
import { isDetailedSoc } from '@/util/soc-support'
import SimpleOccupationButton from '@/components/SimpleOccupationButton.vue'
import OccupationBreadcrumb from '@/components/OccupationBreadcrumb.vue'
import { useProfileStore } from '@/stores/profile'
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0();
const profileStore = useProfileStore();
const route = useRoute()
const router = useRouter()

const title = ref()
const description = ref()
const children = ref<Occupation[]>([])

const refreshContent = async function() {
  const socCode = route.params.socCode as string;
  const occupation = (await fetchOccupation(socCode)).data;
  
  title.value = occupation.title
  description.value = occupation.description

  if (!isDetailedSoc(socCode)) {
    children.value = (await fetchChildOccupation(socCode)).data.occupation
  } else {
    children.value = []
  }
}

const selectOccupation = function(socCode: string) {
  if (socCode) {
    router.push(`/select/${socCode}`);
  } else {
    router.push('/');
  }
}

onMounted(refreshContent);
watch(route, refreshContent);

const selectCurrentJob = async () => {
  const profile = await profileStore.getOrFetch(auth0);
  await profileStore.updateProfile({
    ... profile,
    currentSocCode: route.params.socCode as string
  });
  router.push('/');
}

</script>

<template>
   <v-row>
    <v-col>
      <v-card :title="title">
        <OccupationBreadcrumb 
          :soc-code="route.params.socCode as string"
          @occupation-selected="selectOccupation"
        />
      </v-card>
    </v-col>
  </v-row>
  <v-row v-if="children" v-for="occupation in children">
    <v-col cols="12">
      <SimpleOccupationButton 
      :occupation 
      @occupation-selected="() => selectOccupation(occupation.socCode)"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" v-if="isDetailedSoc(route.params.socCode as string)">
      <v-card :title="title" :text="description">
        <v-card-actions>
          <v-btn color="blue-accent-4" @click="selectCurrentJob" variant="outlined">This is my current job</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue-accent-4" :to="{ name: 'occupations', params: { socCode: route.params.socCode }}">Learn More</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
  .children {
    display: flex;
    flex-direction: column;
    gap: 0.5rem
  }
</style>
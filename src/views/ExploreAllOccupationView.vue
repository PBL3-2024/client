<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { fetchChildOccupation, fetchOccupation, type Occupation } from '@/api/occupation'; 
import { useRoute, useRouter } from 'vue-router';
import { isDetailedSoc } from '@/util/soc-support';
import DetailedOccupationButton from '@/components/DetailedOccupationButton.vue'; 
import OccupationBreadcrumb from '@/components/OccupationBreadcrumb.vue';

const route = useRoute();
const router = useRouter();

const title = ref<string | undefined>();
const description = ref<string | undefined>();
const children = ref<Occupation[]>([]);

const refreshContent = async () => {
  const socCode = route.params.socCode as string;
  const { data: occupation } = await fetchOccupation(socCode);

  title.value = occupation.title;
  description.value = occupation.description;

  if (!isDetailedSoc(socCode)) {
    const { data: { occupation: childOccupations } } = await fetchChildOccupation(socCode);
    children.value = childOccupations;
  } else {
    children.value = [];
  }
};

const selectOccupation = (socCode: string) => {
  router.replace({ params: { socCode } });
};

watch(route, refreshContent);
onMounted(refreshContent);
</script>

<template>
  <v-navigation-drawer>
    <v-tabs
        color="primary"
        direction="vertical">
        <v-tab text="Information" :to="`/occupations/${route.params.socCode}/information`"></v-tab>
        <v-tab text="News" :to="`/occupations/${route.params.socCode}/news`"></v-tab>
        <v-tab text="Learning" :to="`/occupations/${route.params.socCode}/learning`"></v-tab>
        <v-tab text="Certifications" :to="`/occupations/${route.params.socCode}/certifications`"></v-tab>
        <v-tab text="Jobs" :to="`/occupations/${route.params.socCode}/jobs`"></v-tab>
        <v-tab text="Reports" :to="`/occupations/${route.params.socCode}/reports`"></v-tab>
        <v-tab text="Manage Demand" :to="`/occupations/${route.params.socCode}/demand`"></v-tab>
    </v-tabs>
  </v-navigation-drawer>
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
  <v-row>
    <v-col>
      <RouterView/>
    </v-col>
  </v-row>
  <v-row v-for="occupation in children">
    <v-col cols="12">
      <DetailedOccupationButton 
        :key="occupation.socCode" 
        :occupation="occupation" 
        @occupation-selected="selectOccupation(occupation.socCode)"
      />
    </v-col>
  </v-row>
</template>

<style scoped>
</style>

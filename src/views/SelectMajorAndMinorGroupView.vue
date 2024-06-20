<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchChildOccupation, fetchOccupation, type Occupation } from '@/api/occupation'
import { useRoute, useRouter } from 'vue-router';
import { isDetailedSoc } from '@/util/soc-support'
import SimpleOccupationButton from '@/components/SimpleOccupationButton.vue'
import OccupationBreadcrumb from '@/components/OccupationBreadcrumb.vue'

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

</script>

<template>
  <main>
    <OccupationBreadcrumb 
      :soc-code="route.params.socCode as string"
      @occupation-selected="(socCode) => selectOccupation(socCode)"/>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <div class="children" v-if="children">
      <SimpleOccupationButton 
        v-for="occupation in children" 
        :occupation 
        @occupation-selected="() => selectOccupation(occupation.socCode)"/>
    </div>
  </main>
</template>

<style scoped>
  .children {
    display: flex;
    flex-direction: column;
    gap: 0.5rem
  }
</style>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchCertifications, type Certification } from '@/api/certifications'
import CertificationCard from '@/components/CertificationCard.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const certs = ref<Certification[]>([])

const refreshContent = async function() {
  const socCode = route.params.socCode as string;
  const certResponse = (await fetchCertifications(socCode)).data;
  
  certs.value = certResponse.certifications
}

onMounted(refreshContent);
watch(route, refreshContent);

</script>

<template>
  <v-row v-for="c in certs">
    <v-col>
      <CertificationCard :cert="c"/>
    </v-col>
  </v-row>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
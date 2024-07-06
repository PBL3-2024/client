<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import Breadcrumb from 'primevue/breadcrumb';
import { listAncestors } from "@/util/soc-support";
import { fetchOccupation } from "@/api/occupation";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const props = defineProps<{
  socCode: string
}>()

const home = ref({
    icon: 'pi pi-home'
});
const items = ref<any>([])

const emit = defineEmits(['occupationSelected'])

const refreshContent = async () => {
  const ancestors = listAncestors(props.socCode);

  const occupations = await Promise.allSettled(ancestors.map(fetchOccupation))
  items.value = occupations.map(result => result.status === 'fulfilled' && {
    title: result.value.data.title,
    disabled: false,
    to: { name: route.name, params: { ... route.params, socCode: result.value.data.socCode } }
  });
};

onMounted(refreshContent)
watch(props, refreshContent)

</script>

<template>
  <v-breadcrumbs :items="items">
    <template v-slot:prepend>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<style scoped>
.card-body {
  display: flex;
  flex-direction: row;
}
</style>

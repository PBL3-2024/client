<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import Breadcrumb from 'primevue/breadcrumb';
import { listAncestors } from "@/util/soc-support";
import { fetchOccupation } from "@/api/occupation";

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
    label: result.value.data.title,
    socCode: result.value.data.socCode
  });
};

onMounted(refreshContent)
watch(props, refreshContent)

</script>

<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <a href="javascript:undefined" @click="() => emit('occupationSelected', item.socCode)">
        <span :class="[item.icon, 'text-color']" />
        <span class="text-primary font-semibold">{{ item.label }}</span>
      </a>
    </template>
  </Breadcrumb>
</template>

<style scoped>
.card-body {
  display: flex;
  flex-direction: row;
}
</style>

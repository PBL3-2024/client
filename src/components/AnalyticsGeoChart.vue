<script setup lang="ts">
import { GChart } from 'vue-google-charts';
import { ref } from 'vue'
import { computed } from 'vue';

const props = defineProps<{
  chart: any
}>()

const data = computed(() => {
    const d = props.chart.data.map(v => [v.key, v.value]);
    d.unshift(['Region', 'Users']);
    return d;
})

const options = ref({
    region: 'US',
    displayMode: 'regions',
    resolution: 'provinces',
});
</script>

<template>
    <v-card>
        <v-card-title>{{ chart.title }}</v-card-title>
        <GChart :data="data" type="GeoChart" :settings="{ packages: ['geochart'] }" :options="options"/>
    </v-card>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
}
</style>

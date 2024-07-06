<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchNews, type News } from '@/api/news'
import NewsCard from '@/components/NewsCard.vue'
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()

const news = ref<News[]>([])

const refreshContent = async function() {
  const socCode = route.params.socCode as string;
  const newsResponse = (await fetchNews(socCode)).data;
  
  news.value = newsResponse.news
}

onMounted(refreshContent);
watch(route, refreshContent);

</script>

<template>
  <v-row v-for="n in news">
    <v-col>
      <NewsCard :news="n"/>
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
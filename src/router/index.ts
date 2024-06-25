import { createRouter, createWebHistory } from 'vue-router'
import ExploreAllOccupationView from '../views/ExploreAllOccupationView.vue'
import SelectMajorAndMinorGroupView from '@/views/SelectMajorAndMinorGroupView.vue'
import NewsView from '@/views/NewsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/occupations/:socCode',
      name: 'occupations',
      component: ExploreAllOccupationView
    }, {
      path: '/select/:socCode',
      name: 'select',
      component: SelectMajorAndMinorGroupView
    }, {
      path: '/occupations/:socCode/news',
      name: 'news',
      component: NewsView
    },
  ]
})

export default router

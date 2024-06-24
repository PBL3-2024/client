import { createRouter, createWebHistory } from 'vue-router'
import ExploreAllOccupationView from '../views/ExploreAllOccupationView.vue'
import SelectMajorAndMinorGroupView from '@/views/SelectMajorAndMinorGroupView.vue'
import HomePageView from '@/views/HomePageView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/occupations',
      name: 'occupations',
      component: ExploreAllOccupationView
    }, {
      path: '/select/:socCode',
      name: 'select',
      component: SelectMajorAndMinorGroupView
    }, {
      path: '/homepage',
      name: 'homepage',
      component: HomePageView
    }
  ]
})

export default router

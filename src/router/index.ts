import { createRouter, createWebHistory } from 'vue-router'
import ExploreAllOccupationView from '../views/ExploreAllOccupationView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/occupations',
      name: 'occupations',
      component: ExploreAllOccupationView
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import ExploreAllOccupationView from '../views/ExploreAllOccupationView.vue'
import SelectMajorAndMinorGroupView from '@/views/SelectMajorAndMinorGroupView.vue'
import InformationView from '@/views/InformationView.vue'
import LearningView from '@/views/LearningView.vue'
import CertificationView from '@/views/CertificationView.vue'
import JobView from '@/views/JobView.vue'
import ManageDemandView from '@/views/ManageDemandView.vue'
import ReportTypeView from '@/views/ReportTypeView.vue'
import NewsView from '@/views/NewsView.vue'
import HomePageView from '@/views/HomePageView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/occupations/:socCode',
      name: 'occupations',
      component: ExploreAllOccupationView,
      children: [{
        path: 'information',
        component: InformationView
      }, {
        path: 'news',
        component: NewsView
      }, {
        path: 'learning',
        component: LearningView
      }, {
        path: 'certifications',
        component: CertificationView
      }, {
        path: 'jobs',
        component: JobView
      }, {
        path: 'demand',
        component: ManageDemandView
      }, {
        path: 'reports',
        component: ReportTypeView
      }]
    }, {
      path: '/select/:socCode',
      name: 'select',
      component: SelectMajorAndMinorGroupView
    }, {
      path: '/',
      name: 'home',
      component: HomePageView
    }, {
      path: '/profile',
      name: 'profileView',
      component: ProfileView
    },
  ]
})

export default router

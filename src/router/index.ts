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
import { auth0 } from '@/api/auth'


const requireAuthenticated = async function(to: any, from: any) {
  if (!auth0.isAuthenticated.value) {
    return '/';
  } else {
    return true;
  }
}

const requireSmartCityManager = async function(to: any, from: any) {
  if (!auth0.isAuthenticated.value) {
    return '/';
  }

  const roles = auth0?.user?.value?.userRoles || [];

  if (!roles.includes('SMART_CITY_MANAGER')) {
    return '/';
  }

  return true;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/occupations/:socCode',
      name: 'occupations',
      component: ExploreAllOccupationView,
      redirect: to => ({
        path: `/occupations/${to.params.socCode}/information`
      }),
      children: [{
        path: 'information',
        component: InformationView,
        beforeEnter: requireAuthenticated,
      }, {
        path: 'news',
        component: NewsView,
        beforeEnter: requireAuthenticated,
      }, {
        path: 'learning',
        component: LearningView,
        beforeEnter: requireAuthenticated,
      }, {
        path: 'certifications',
        component: CertificationView,
        beforeEnter: requireAuthenticated,
      }, {
        path: 'jobs',
        component: JobView,
        beforeEnter: requireAuthenticated,
      }, {
        path: 'demand',
        component: ManageDemandView,
        beforeEnter: requireSmartCityManager
      }, {
        path: 'reports',
        component: ReportTypeView,
        beforeEnter: requireSmartCityManager
      }]
    }, {
      path: '/select/:socCode',
      name: 'select',
      component: SelectMajorAndMinorGroupView,
      beforeEnter: requireAuthenticated,
    }, {
      path: '/',
      name: 'home',
      component: HomePageView
    }, {
      path: '/profile',
      name: 'profileView',
      component: ProfileView,
      beforeEnter: requireAuthenticated,
    },
  ]
});

export default router

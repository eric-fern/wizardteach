import { createRouter, createWebHistory } from 'vue-router';
import OnboardEntry from '../views/onboardwizard/OnboardEntry.vue';
import CourseDetails from '../views/onboardwizard/CourseDetails.vue';
import ChooseStandards from '../views/onboardwizard/ChooseStandards.vue';
import CurriculumWizard from '../views/CurriculumWizard.vue';
import Dashboard from '../views/Dashboard.vue';
import MaterialsView from '../views/MaterialsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: OnboardEntry
  },
  {
    path: '/onboard/course-details',
    name: 'CourseDetails',
    component: CourseDetails
  },
  {
    path: '/onboard/standards',
    name: 'ChooseStandards',
    component: ChooseStandards
  },
  {
    path: '/create',
    name: 'CurriculumWizard',
    component: CurriculumWizard
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/materials',
    name: 'Materials',
    component: MaterialsView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 
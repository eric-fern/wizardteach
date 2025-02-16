import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CurriculumWizard from '../views/CurriculumWizard.vue';
import Dashboard from '../views/Dashboard.vue';
import MaterialsView from '../views/MaterialsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
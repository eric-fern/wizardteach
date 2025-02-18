import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from '../stores/store';
import OnboardEntry from '../views/onboardwizard/OnboardEntry.vue';
import CourseDetails from '../views/onboardwizard/CourseDetails.vue';
import ChooseStandards from '../views/onboardwizard/ChooseStandards.vue';
import CurriculumWizard from '../views/CurriculumWizard.vue';
import Dashboard from '../views/Dashboard.vue';
import MaterialsView from '../views/MaterialsView.vue';

/**
 * Router Configuration
 * 
 * Defines application routes and maintains synchronization with store state.
 * Each route in the wizard flow includes a meta.step property that corresponds
 * to the store's currentStep value.
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: OnboardEntry,
    meta: { 
      step: 0,  // Entry point of wizard
    }
  },
  {
    path: '/onboard/course-details',
    name: 'CourseDetails',
    component: CourseDetails,
    meta: { 
      step: 1,  // Course details step
    }
  },
  {
    path: '/onboard/standards',
    name: 'ChooseStandards',
    component: ChooseStandards,
    meta: { 
      step: 2,  // Standards selection step
    }
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

/**
 * Navigation Guard
 * 
 * Synchronizes the router's current route with the store's step state.
 * This ensures that the store's currentStep always matches the current route,
 * maintaining a single source of truth for navigation state.
 */
router.beforeEach((to, from, next) => {
  console.log('Navigation guard - to:', to.path, 'meta step:', to.meta.step);
  if (typeof to.meta.step !== 'undefined') {
    try {
      const store = useStore();
      console.log('Current store step:', store.currentStep, 'Changing to:', to.meta.step);
      store.currentStep = to.meta.step;
    } catch (error) {
      console.error('Error in navigation guard:', error);
    }
  }
  next();
});

export default router; 
import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from '../stores/store';
import OnboardEntry from '../views/onboardwizard/OnboardEntry.vue';
import CourseDetails from '../views/onboardwizard/CourseDetails.vue';
import ChooseStandards from '../views/onboardwizard/ChooseStandards.vue';
import Wizard10Questions from '../views/onboardwizard/Wizard10Questions.vue';
import CurriculumWizard from '../views/CurriculumWizard.vue';
import Dashboard from '../views/Dashboard.vue';
import MaterialsView from '../views/MaterialsView.vue';
import WizardProvider from '../views/onboardwizard/WizardProvider.vue';

/**
 * Router Configuration
 * 
 * Defines application routes and maintains synchronization with store state.
 * Each route in the wizard flow includes a meta.step property that corresponds
 * to the store's currentStep value.
 * 
 * Navigation Flow:
 * Entry (/) -> Course Details (/onboard/course-details) -> Standards (/onboard/standards) -> Create (/create)
 * Previous navigation is handled by BaseWizardStep and follows the reverse path.
 */
const routes = [
  {
    path: '/onboard',
    component: WizardProvider,
    children: [
      {
        path: '',
        name: 'Home',
        component: OnboardEntry,
        meta: { 
          step: 0,
        }
      },
      {
        path: 'course-details',
        name: 'CourseDetails',
        component: CourseDetails,
        meta: { 
          step: 1,
        }
      },
      {
        path: 'standards',
        name: 'ChooseStandards',
        component: ChooseStandards,
        meta: { 
          step: 2,
        }
      },
      {
        path: 'questions',
        name: 'Wizard10Questions',
        component: Wizard10Questions,
        meta: {
          step: 3,
        }
      }
    ]
  },
  {
    path: '/',
    redirect: '/onboard'
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
 * Handles three key responsibilities:
 * 1. Enforces wizard flow by redirecting to entry if no subject is set
 * 2. Synchronizes the router's current route with the store's step state
 * 3. Maintains a single source of truth for navigation state
 * 
 * The guard ensures users can't access wizard steps out of order or after a page refresh
 * without completing previous required steps.
 * 
 * Previous step navigation is managed by BaseWizardStep.vue, which:
 * - Tracks the current step in the store
 * - Provides consistent back navigation through the wizard
 * - Emits 'prev' events for component-specific cleanup if needed
 */
router.beforeEach((to, from, next) => {
  const store = useStore();
  
  console.log('Navigation guard triggered:', {
    to: to.path,
    from: from.path,
    currentStep: store.currentStep,
    subject: store.formData.subject,
    toMeta: to.meta
  });
  
  // Protection against page refreshes and direct URL access
  if (to.path.startsWith('/onboard') && !store.formData.subject && to.path !== '/onboard') {
    console.warn('No subject found, redirecting to entry');
    next('/onboard');
    return;
  }

  // Sync route meta step with store
  if (typeof to.meta.step !== 'undefined') {
    try {
      console.log('Updating store step:', {
        from: store.currentStep,
        to: to.meta.step
      });
      store.setCurrentStep(to.meta.step);
    } catch (error) {
      console.error('Error updating store step:', error);
    }
  } else {
    console.log('No step meta found for route:', to.path);
  }
  
  next();
});

export default router; 
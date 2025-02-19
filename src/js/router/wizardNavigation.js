import router from './index';
import { useStore } from '../stores/store';

/**
 * Wizard Navigation Utilities
 * 
 * Centralizes all wizard navigation logic in one place.
 * Provides methods for moving through the wizard while maintaining
 * synchronization between router and store state.
 */

export const WIZARD_ROUTES = {
  ENTRY: '/',
  COURSE_DETAILS: '/onboard/course-details',
  STANDARDS: '/onboard/standards',
  QUESTIONS: '/onboard/questions',
  CREATE: '/create',
  DASHBOARD: '/dashboard',
  MATERIALS: '/materials'
};

export const WIZARD_STEPS = {
  ENTRY: 0,
  COURSE_DETAILS: 1,
  STANDARDS: 2,
  QUESTIONS: 3,
  CREATE: 4
};

/**
 * Navigate to the next step in the wizard
 * @returns {Promise<void>}
 */
export async function goToNextStep() {
  const store = useStore();
  const currentStep = store.currentStep;
  
  console.log('goToNextStep called, current step:', currentStep);
  
  // Map current step to next route
  const nextRoute = getNextRoute(currentStep);
  console.log('Next route calculated:', nextRoute);
  
  if (nextRoute) {
    try {
      console.log('Attempting navigation to:', nextRoute);
      await router.push(nextRoute);
      console.log('Navigation completed');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  } else {
    console.warn('No next route found for step:', currentStep);
  }
}

/**
 * Navigate to the previous step in the wizard
 * @returns {Promise<void>}
 */
export async function goToPreviousStep() {
  const store = useStore();
  const currentStep = store.currentStep;
  
  // Map current step to previous route
  const prevRoute = getPreviousRoute(currentStep);
  if (prevRoute) {
    await router.push(prevRoute);
  }
}

/**
 * Get the next route based on current step
 * @param {number} currentStep 
 * @returns {string|null}
 */
function getNextRoute(currentStep) {
  switch(currentStep) {
    case WIZARD_STEPS.ENTRY:
      return WIZARD_ROUTES.COURSE_DETAILS;
    case WIZARD_STEPS.COURSE_DETAILS:
      return WIZARD_ROUTES.STANDARDS;
    case WIZARD_STEPS.STANDARDS:
      return WIZARD_ROUTES.QUESTIONS;
    case WIZARD_STEPS.QUESTIONS:
      return WIZARD_ROUTES.CREATE;
    default:
      return null;
  }
}

/**
 * Get the previous route based on current step
 * @param {number} currentStep 
 * @returns {string|null}
 */
function getPreviousRoute(currentStep) {
  switch(currentStep) {
    case WIZARD_STEPS.CREATE:
      return WIZARD_ROUTES.QUESTIONS;
    case WIZARD_STEPS.QUESTIONS:
      return WIZARD_ROUTES.STANDARDS;
    case WIZARD_STEPS.STANDARDS:
      return WIZARD_ROUTES.COURSE_DETAILS;
    case WIZARD_STEPS.COURSE_DETAILS:
      return WIZARD_ROUTES.ENTRY;
    default:
      return null;
  }
} 
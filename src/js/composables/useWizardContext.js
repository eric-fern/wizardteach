import { inject, provide } from 'vue'
import { goToNextStep, goToPreviousStep } from '../router/wizardNavigation'
import { useStore } from '../stores/store'
import { computed } from 'vue'

// Symbols for injection keys
export const WizardKeys = {
  NAVIGATION: Symbol('wizard-navigation'),
  VALIDATION: Symbol('wizard-validation'),
  THEME: Symbol('wizard-theme')
}

const WIZARD_CONTEXT_KEY = Symbol('wizard-context')

/**
 * Wizard Context Provider
 * 
 * Provides centralized communication between wizard components:
 * - Navigation state and actions
 * - Validation state
 * - Theme preferences
 * 
 * Usage:
 * ```
 * // In parent component (e.g., CurriculumWizard.vue)
 * const { provideWizardContext } = useWizardContext()
 * provideWizardContext()
 * 
 * // In child components
 * const { navigation, validation, theme } = useWizardContext()
 * ```
 */
export function provideWizardContext() {
  const store = useStore()

  const context = {
    navigation: {
      goToNext: goToNextStep,
      goToPrev: goToPreviousStep
    },
    validation: {
      isCurrentStepValid: computed(() => store.currentStepValidation.isValid)
    }
  }

  provide(WIZARD_CONTEXT_KEY, context)
  return context
}

export function useWizardContext() {
  const context = inject(WIZARD_CONTEXT_KEY)
  if (!context) {
    throw new Error('Wizard navigation context not found. Are you using this inside a wizard component?')
  }
  return context
}

export function useWizardNavigation() {
  const context = useWizardContext()
  return context.navigation
}

export function useWizardValidation() {
  const context = useWizardContext()
  return context.validation
}

function useWizardTheme() {
  const theme = inject(WizardKeys.THEME)
  if (!theme) {
    throw new Error('Wizard theme context not found. Are you using this inside a wizard component?')
  }
  return theme
} 
import { provide, inject, ref } from 'vue'
import { useStore } from '../stores/store'

// Symbols for injection keys
export const WizardKeys = {
  NAVIGATION: Symbol('wizard-navigation'),
  VALIDATION: Symbol('wizard-validation'),
  THEME: Symbol('wizard-theme')
}

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
export function useWizardContext() {
  const store = useStore()

  // Provider function
  function provideWizardContext() {
    // Navigation context
    provide(WizardKeys.NAVIGATION, {
      currentStep: ref(store.currentStep),
      steps: store.steps,
      goToNext: () => store.nextStep(),
      goToPrev: () => store.prevStep(),
      goToStep: (step) => store.setCurrentStep(step)
    })

    // Validation context
    provide(WizardKeys.VALIDATION, {
      isCurrentStepValid: ref(store.currentStepValidation.isValid),
      requiredFields: ref(store.currentStepValidation.requiredFields),
      validateStep: () => store.validateCurrentStep()
    })

    // Theme context
    provide(WizardKeys.THEME, {
      isDark: ref(false), // Add dark mode toggle if needed
      updateTheme: (theme) => {
        // Theme update logic
      }
    })
  }

  // Consumer functions
  function useWizardNavigation() {
    const navigation = inject(WizardKeys.NAVIGATION)
    if (!navigation) {
      throw new Error('Wizard navigation context not found. Are you using this inside a wizard component?')
    }
    return navigation
  }

  function useWizardValidation() {
    const validation = inject(WizardKeys.VALIDATION)
    if (!validation) {
      throw new Error('Wizard validation context not found. Are you using this inside a wizard component?')
    }
    return validation
  }

  function useWizardTheme() {
    const theme = inject(WizardKeys.THEME)
    if (!theme) {
      throw new Error('Wizard theme context not found. Are you using this inside a wizard component?')
    }
    return theme
  }

  return {
    provideWizardContext,
    useWizardNavigation,
    useWizardValidation,
    useWizardTheme
  }
} 
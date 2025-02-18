/**
 * BaseWizardStep
 * 
 * A reusable component that provides consistent navigation and layout for wizard steps.
 * Handles both next/previous navigation automatically while allowing step-specific logic
 * through event emissions.
 * 
 * Navigation Features:
 * - Previous step navigation is centralized here to ensure consistency
 * - Each step can be hidden/shown based on the hidePrevious prop
 * - Navigation emits events to allow parent components to perform cleanup
 * - Automatically syncs with router and store state
 */
<template>
  <div class="min-h-screen p-8" style="background-color: var(--bg-secondary);">
    <div class="max-w-3xl mx-auto">
      <!-- Progress Indicator -->
      <BlueDottedOvalShowsCompletedFormFields />

      <!-- Main Form Content -->
      <div class="rounded-lg shadow-md p-6" style="background-color: var(--bg-primary);">
        <!-- Dynamic Header with Animation -->
        <div v-if="$slots.title || $slots.subtitle || title || subtitle" class="text-center animate-fade-in mb-8">
          <h3 
            class="heading-2 animate-slide-up" 
            :style="{ animationDelay: '100ms', color: 'var(--text-primary)' }"
          >
            <slot name="title">{{ title }}</slot>
          </h3>
          <p 
            v-if="$slots.subtitle || subtitle"
            class="mt-3 text-lg max-w-2xl mx-auto animate-slide-up" 
            :style="{ animationDelay: '200ms', color: 'var(--text-secondary)' }"
          >
            <slot name="subtitle">{{ subtitle }}</slot>
          </p>
        </div>

        <!-- Slot for Step-Specific Content -->
        <div 
          class="animate-fade-in space-y-6"
          :style="{ animationDelay: '300ms' }"
        >
          <slot></slot>
        </div>

        <!-- Optional Action Slots -->
        <div 
          v-if="$slots.actions"
          class="mt-8 animate-fade-in"
          :style="{ animationDelay: '400ms' }"
        >
          <slot name="actions"></slot>
        </div>

        <!-- Optional Info Section -->
        <div 
          v-if="$slots.info"
          class="mt-12 rounded-2xl p-8 animate-fade-in"
          :style="{ 
            animationDelay: '500ms',
            background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)'
          }"
        >
          <slot name="info"></slot>
        </div>
      </div>

      <!-- Wizard Navigation -->
      <div class="flex justify-between mt-6">
        <!-- Previous Step Button -->
        <button 
          v-if="store.currentStep > 0 && !hidePrevious"
          @click="handlePrev"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
          :style="{
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-color)',
            border: '1px solid var(--border-color)'
          }"
          :class="{ 'hover:bg-dark-hover': true }"
        >
          Previous
        </button>
        <div class="flex-1"></div>
        <!-- Next Step Button -->
        <button 
          v-if="store.currentStep < store.steps.length - 1"
          @click="handleNext"
          :disabled="!isValid && !store.isDebugMode"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
          :style="{
            backgroundColor: (isValid || store.isDebugMode) ? 'var(--primary-500)' : 'var(--bg-primary)',
            color: (isValid || store.isDebugMode) ? '#ffffff' : 'var(--text-primary)',
            borderColor: 'var(--border-color)',
            border: '1px solid var(--border-color)',
            cursor: (!isValid && !store.isDebugMode) ? 'not-allowed' : 'pointer'
          }"
          :class="{
            'hover:opacity-90': isValid || store.isDebugMode
          }"
        >
          <span v-if="store.isDebugMode && !isValid" class="mr-2">🐛</span>
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../../stores/store';
import { useRouter } from 'vue-router';
import BlueDottedOvalShowsCompletedFormFields from '../../components/shared/BlueDottedOvalShowsCompletedFormFields.vue';

const store = useStore();
const router = useRouter();
// Allow parent components to handle navigation events if needed
const emit = defineEmits(['next', 'prev']);

// Component props with defaults
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  isValid: {
    type: Boolean,
    default: false
  },
  hidePrevious: {
    type: Boolean,
    default: false
  }
});

/**
 * Handles navigation to the next step
 * 1. Emits 'next' event for parent components
 * 2. Routes to the appropriate next step based on current step
 */
const handleNext = () => {
  // First emit the event to allow parent components to handle any specific logic
  emit('next');
  
  // Then handle the navigation based on current step
  if (store.currentStep < store.steps.length - 1) {
    const nextStep = store.currentStep + 1;
    switch(nextStep) {
      case 1:
        router.push('/onboard/course-details');
        break;
      case 2:
        router.push('/onboard/standards');
        break;
      case 3:
        router.push('/onboard/questions');
        break;
      case 4:
        router.push('/create');
        break;
    }
  }
};

/**
 * Handles navigation to the previous step
 * 1. Emits 'prev' event for parent components to handle cleanup
 * 2. Routes to the appropriate previous step based on current step
 * 3. Updates store.currentStep through router navigation guard
 * 
 * Navigation Path:
 * Create -> Questions -> Standards -> Course Details -> Entry
 */
const handlePrev = () => {
  // First emit the event to allow parent components to handle any specific logic
  emit('prev');
  
  // Then handle the navigation based on current step
  if (store.currentStep > 0) {
    const prevStep = store.currentStep - 1;
    switch(prevStep) {
      case 0:
        router.push('/');
        break;
      case 1:
        router.push('/onboard/course-details');
        break;
      case 2:
        router.push('/onboard/standards');
        break;
      case 3:
        router.push('/onboard/questions');
        break;
    }
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp var(--duration-default) var(--ease-default) both;
}

.animate-fade-in {
  animation: fadeIn var(--duration-default) var(--ease-default) both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Form Control Base Styles */
:deep(.form-input),
:deep(.form-select),
:deep(.form-textarea) {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.75rem;
  width: 100%;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Placeholder Styles */
:deep(.form-input::placeholder),
:deep(.form-select::placeholder),
:deep(.form-textarea::placeholder),
:deep(.form-select option[value=""]) {
  color: var(--text-secondary);
  opacity: 0.7;
}

/* Focus States */
:deep(.form-input:focus),
:deep(.form-select:focus),
:deep(.form-textarea:focus) {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 1px var(--primary-500);
}

/* Hover States */
:deep(.form-input:hover:not(:disabled)),
:deep(.form-select:hover:not(:disabled)),
:deep(.form-textarea:hover:not(:disabled)) {
  border-color: var(--primary-500);
}

/* Select Specific Styles */
:deep(.form-select) {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1em;
  padding-right: 2.5rem;
}

:deep(.form-select option) {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.5rem;
}

:deep(.form-select option:first-child) {
  color: var(--text-secondary);
  opacity: 0.7;
}

:deep(.form-select option:checked) {
  background-color: var(--primary-500);
  color: white;
}

/* Disabled States */
:deep(.form-input:disabled),
:deep(.form-select:disabled),
:deep(.form-textarea:disabled) {
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  cursor: not-allowed;
}

/* Common Text Styles */
:deep(.wizard-heading) {
  color: var(--text-primary);
  @apply text-xl font-bold mb-4;
}

:deep(.wizard-text) {
  color: var(--text-primary);
  @apply text-sm;
}

:deep(.wizard-text-secondary) {
  color: var(--text-secondary);
  @apply text-sm;
}

:deep(.wizard-label) {
  color: var(--text-primary);
  @apply block text-sm font-medium mb-1;
}

/* Common Card/Section Styles */
:deep(.wizard-card) {
  background-color: var(--bg-primary);
  @apply rounded-lg shadow-md p-6;
}

:deep(.wizard-section) {
  @apply mb-8;
}

/* Tooltip Styles */
:deep(.wizard-tooltip) {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  @apply invisible group-hover:visible absolute mb-2 w-64 p-2 rounded shadow-lg z-10;
}

/* Custom radio styles */
:deep(input[type="radio"]) {
  appearance: none;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  height: 1rem;
  width: 1rem;
}

:deep(input[type="radio"]:checked) {
  background-color: var(--primary-500);
  border-color: var(--primary-500);
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='4'/%3e%3c/svg%3e");
}

:deep(input[type="radio"]:focus) {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-100);
}

/* Custom checkbox styles */
:deep(input[type="checkbox"]) {
  appearance: none;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  height: 1rem;
  width: 1rem;
}

:deep(input[type="checkbox"]:checked) {
  background-color: var(--primary-500);
  border-color: var(--primary-500);
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}

:deep(input[type="checkbox"]:focus) {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-100);
}

/* Animation Classes */
:deep(.wizard-fade-in) {
  animation: fadeIn var(--duration-default) var(--ease-default);
}

:deep(.wizard-slide-up) {
  animation: slideUp var(--duration-default) var(--ease-default);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 
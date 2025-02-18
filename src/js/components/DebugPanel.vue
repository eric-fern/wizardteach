/**
 * Debug Panel Component
 * 
 * A centralized debugging interface that displays real-time information about the application's state.
 * This panel is only visible when debug mode is enabled in the Pinia store.
 * 
 * Features:
 * - Navigation state tracking
 * - Form field status monitoring
 * - Step validation information
 * - Real-time updates through Pinia store integration
 */
<template>
  <div v-if="store.isDebugMode" class="fixed bottom-4 right-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg max-w-md">
    <h3 class="text-lg font-semibold mb-2">Debug Panel</h3>
    
    <!-- Navigation State Section: Displays current step information -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-1">Navigation State</h4>
      <div class="text-xs text-gray-600">
        <div>Current Step: {{ store.currentStep }}</div>
        <div>Current Step Name: {{ store.steps[store.currentStep] }}</div>
        <div>Total Steps: {{ store.steps.length }}</div>
      </div>
    </div>

    <!-- Form Field Status Section: Shows completion status of all form fields -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-1">Form Field Status</h4>
      <div class="text-xs space-y-1">
        <template v-for="(status, field) in store.formFieldStatus" :key="field">
          <!-- Handle direct field values -->
          <div v-if="typeof status === 'object' && status.value !== undefined">
            {{ field }}: {{ status.value || 'empty' }}
            <span :class="status.isComplete ? 'text-green-500' : 'text-red-500'">
              {{ status.isComplete ? '✓' : '×' }}
            </span>
          </div>
          <!-- Handle nested field values -->
          <template v-else>
            <div v-for="(subStatus, subField) in status" :key="`${field}.${subField}`">
              {{ field }}.{{ subField }}: {{ subStatus.value || 'empty' }}
              <span :class="subStatus.isComplete ? 'text-green-500' : 'text-red-500'">
                {{ subStatus.isComplete ? '✓' : '×' }}
              </span>
            </div>
          </template>
        </template>
      </div>
    </div>

    <!-- Validation Status Section: Shows current step validation state -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-1">Step Validation</h4>
      <div class="text-xs text-gray-600">
        <div>Is Valid: 
          <span :class="store.currentStepValidation.isValid ? 'text-green-500' : 'text-red-500'">
            {{ store.currentStepValidation.isValid ? '✓' : '×' }}
          </span>
        </div>
        <div>Required Fields:</div>
        <ul class="list-disc list-inside pl-2">
          <li v-for="field in store.currentStepValidation.requiredFields" :key="field">
            {{ field }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Debug Mode Toggle -->
    <button 
      @click="store.setDebugMode(false)"
      class="text-xs text-gray-500 hover:text-gray-700"
    >
      Close Debug Panel
    </button>
  </div>
</template>

<script setup>
import { useStore } from '../stores/store';

// Initialize store for accessing debug state and form validation
const store = useStore();
</script> 
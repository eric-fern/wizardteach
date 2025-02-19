/**
 * ChooseStandards Component
 * 
 * Allows teachers to select their educational standards:
 * - Common Core
 * - State Standards (with state selection)
 * - Custom Standards (with file upload)
 * 
 * Navigation:
 * - Previous: Course Details
 * - Next: Thinking (AI Processing)
 * 
 * State Management:
 * - Updates store with selected standards type
 * - Handles file upload for custom standards
 * - Validates selection before allowing navigation
 */
<template>
  <BaseWizardStep
    title="Choose Your Standards"
    subtitle="Select the educational standards you'll be following or upload your own"
    :is-valid="isValid"
    @next="handleNext"
    @prev="handlePrev"
  >
    <!-- Standard Selection -->
    <div class="space-y-6">
      <div class="grid grid-cols-1 gap-6">
        <div class="rounded-lg shadow-md p-6" style="background-color: var(--bg-primary);">
          <h4 class="text-lg font-medium mb-4" style="color: var(--text-primary);">Standard Type</h4>
          <div class="space-y-4">
            <label class="flex items-center space-x-3">
              <input
                type="radio"
                v-model="selectedType"
                @change="store.setStandardsType(selectedType)"
                value="common-core"
                class="h-4 w-4 transition-colors duration-200"
                :style="{
                  color: 'var(--primary-500)',
                  borderColor: 'var(--border-color)'
                }"
              />
              <span style="color: var(--text-primary);">{{ store.standardsConfig.types['common-core'].label }}</span>
            </label>
            <label class="flex items-center space-x-3">
              <input
                type="radio"
                v-model="selectedType"
                @change="store.setStandardsType(selectedType)"
                value="state"
                class="h-4 w-4 transition-colors duration-200"
                :style="{
                  color: 'var(--primary-500)',
                  borderColor: 'var(--border-color)'
                }"
              />
              <span style="color: var(--text-primary);">{{ store.standardsConfig.types['state'].label }}</span>
            </label>
            <label class="flex items-center space-x-3 group relative">
              <input
                type="radio"
                v-model="selectedType"
                @change="store.setStandardsType(selectedType)"
                value="custom"
                class="h-4 w-4 transition-colors duration-200"
                :style="{
                  color: 'var(--primary-500)',
                  borderColor: 'var(--border-color)'
                }"
              />
              <span style="color: var(--text-primary);">{{ store.standardsConfig.types['custom'].label }}</span>
              <div class="flex items-center">
                <span class="ml-2 text-sm font-medium" style="color: var(--primary-500);">AI-Enabled ✨</span>
                <button class="ml-1 focus:outline-none transition-colors duration-200" style="color: var(--text-secondary);">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-80 p-2 rounded shadow-lg z-10"
                     style="background-color: var(--bg-secondary); color: var(--text-primary);">
                  Upload any PDF document - whether it's a textbook, mechanic's manual, or custom standards document. Our AI can process and integrate any document into your curriculum planning.
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- State Selection (shown when state standards selected) -->
      <div v-if="selectedType === 'state'" class="animate-fade-in">
        <div class="rounded-lg shadow-md p-6" style="background-color: var(--bg-primary);">
          <h4 class="text-lg font-medium mb-4" style="color: var(--text-primary);">Select State</h4>
          <select
            v-model="selectedState"
            class="mt-1 block w-full pl-3 pr-10 py-2 rounded-md transition-colors duration-200"
            :style="{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
              border: '1px solid var(--border-color)'
            }"
          >
            <option value="" style="background-color: var(--bg-primary); color: var(--text-primary);">Select a state...</option>
            <option v-for="state in states" 
                    :key="state.code" 
                    :value="state.code"
                    style="background-color: var(--bg-primary); color: var(--text-primary);">
              {{ state.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Custom Standards Upload (shown when custom standards selected) -->
      <div v-if="selectedType === 'custom'" class="animate-fade-in">
        <UploadAndHoldFileWithinPinia />
        <p class="mt-4 text-sm text-center" style="color: var(--text-secondary);">
          {{ store.standardsConfig.types['custom'].description }}
        </p>
      </div>
    </div>
  </BaseWizardStep>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '../../stores/store'
import BaseWizardStep from './BaseWizardStep.vue'
import UploadAndHoldFileWithinPinia from '../../components/shared/UploadAndHoldFileWithinPinia.vue'
import { useRouter } from 'vue-router'

const store = useStore()
const selectedType = ref(store.formData.standards.selectedType)
const selectedState = ref(store.formData.standards.state)
const router = useRouter()
const emit = defineEmits(['next', 'prev'])

// Initialize from store on mount
onMounted(() => {
  selectedType.value = store.formData.standards.selectedType
  selectedState.value = store.formData.standards.state
})

const states = store.standardsConfig.states

// Use the store's validation
const isValid = computed(() => store.isStandardsStepValid)

const handleNext = () => {
  // Store is already updated through the v-model and @change handlers
  if (selectedType.value === 'custom') {
    store.setPdfType('standards')
  }
  
  // Emit next event to BaseWizardStep
  emit('next')
}

// Watch for state selection
watch(selectedState, (newState) => {
  store.setStateStandard(newState)
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn var(--duration-default) var(--ease-default);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
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

/* Custom radio styles */
input[type="radio"] {
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
}

input[type="radio"]:checked {
  background-color: var(--primary-500);
  border-color: var(--primary-500);
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='4'/%3e%3c/svg%3e");
}

input[type="radio"]:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-100);
}
</style> 
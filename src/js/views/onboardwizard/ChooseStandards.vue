# New file content
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
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h4 class="text-lg font-medium text-gray-900 mb-4">Standard Type</h4>
          <div class="space-y-4">
            <label class="flex items-center space-x-3">
              <input
                type="radio"
                v-model="selectedType"
                @change="store.setStandardsType(selectedType)"
                value="common-core"
                class="h-4 w-4 text-blue-600"
              />
              <span class="text-gray-700">{{ store.standardsConfig.types['common-core'].label }}</span>
            </label>
            <label class="flex items-center space-x-3">
              <input
                type="radio"
                v-model="selectedType"
                @change="store.setStandardsType(selectedType)"
                value="state"
                class="h-4 w-4 text-blue-600"
              />
              <span class="text-gray-700">{{ store.standardsConfig.types['state'].label }}</span>
            </label>
            <label class="flex items-center space-x-3 group relative">
              <input
                type="radio"
                v-model="selectedType"
                @change="store.setStandardsType(selectedType)"
                value="custom"
                class="h-4 w-4 text-blue-600"
              />
              <span class="text-gray-700">{{ store.standardsConfig.types['custom'].label }}</span>
              <div class="flex items-center">
                <span class="ml-2 text-sm text-blue-500 font-medium">AI-Enabled ✨</span>
                <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-80 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                  Upload any PDF document - whether it's a textbook, mechanic's manual, or custom standards document. Our AI can process and integrate any document into your curriculum planning.
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- State Selection (shown when state standards selected) -->
      <div v-if="selectedType === 'state'" class="animate-fade-in">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h4 class="text-lg font-medium text-gray-900 mb-4">Select State</h4>
          <select
            v-model="selectedState"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Select a state...</option>
            <option v-for="state in states" :key="state.code" :value="state.code">
              {{ state.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Custom Standards Upload (shown when custom standards selected) -->
      <div v-if="selectedType === 'custom'" class="animate-fade-in">
        <UploadAndHoldFileWithinPinia />
        <p class="mt-4 text-sm text-gray-500 text-center">
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

const store = useStore()
const selectedType = ref(store.formData.standards.selectedType)
const selectedState = ref(store.formData.standards.state)

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
}

// Watch for state selection
watch(selectedState, (newState) => {
  store.setStateStandard(newState)
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
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
</style> 
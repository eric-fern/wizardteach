# New file content
<template>
  <BaseWizardStep :isValid="isValid">
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900 mb-4">Curriculum Standards</h2>
        
        <!-- Standards Type Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-4">Select Standards Type</label>
          <div class="space-y-2">
            <!-- National Standards -->
            <div class="mb-4">
              <h3 class="text-sm font-medium text-gray-700 mb-2">National & International Standards</h3>
              <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="store.formData.standards.type"
                  value="common-core"
                  class="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                >
                <div class="ml-3">
                  <span class="text-sm font-medium text-gray-900">Common Core Standards</span>
                  <p class="text-sm text-gray-500">Nationally recognized K-12 academic standards</p>
                </div>
              </label>

              <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer mt-2">
                <input 
                  type="radio" 
                  v-model="store.formData.standards.type"
                  value="ap"
                  @change="handleAPorIBSelection"
                  class="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                >
                <div class="ml-3">
                  <span class="text-sm font-medium text-gray-900">Advanced Placement (AP)</span>
                  <p class="text-sm text-gray-500">College Board AP curriculum standards for college-level courses</p>
                </div>
              </label>

              <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer mt-2">
                <input 
                  type="radio" 
                  v-model="store.formData.standards.type"
                  value="ib"
                  @change="handleAPorIBSelection"
                  class="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                >
                <div class="ml-3">
                  <span class="text-sm font-medium text-gray-900">International Baccalaureate (IB)</span>
                  <p class="text-sm text-gray-500">International education framework and standards</p>
                </div>
              </label>
            </div>

            <!-- State Standards -->
            <div class="pt-4 border-t">
              <h3 class="text-sm font-medium text-gray-700 mb-2">State-Specific Standards</h3>
              <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="store.formData.standards.type"
                  value="state"
                  class="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                >
                <div class="ml-3">
                  <span class="text-sm font-medium text-gray-900">State Standards</span>
                  <p class="text-sm text-gray-500">Standards specific to your state's requirements</p>
                </div>
              </label>

              <!-- State Selection (only shown when state standards are selected) -->
              <div v-if="store.formData.standards.type === 'state'" 
                class="mt-3 ml-7 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Your State</label>
                <select 
                  v-model="store.formData.standards.state"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                >
                  <option value="">Choose a state</option>
                  <option v-for="state in store.states" :key="state.code" :value="state.code">
                    {{ state.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Student Accommodations -->
        <div class="mb-6 pt-4 border-t">
          <h3 class="text-sm font-medium text-gray-700 mb-4">Student Accommodations</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex space-x-6">
              <label class="inline-flex items-center group relative">
                <input 
                  type="checkbox" 
                  v-model="store.formData.studentComposition.esl"
                  class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700">ESL</span>
                <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                  English as Second Language learners - Materials will include language support
                </div>
              </label>
              <label class="inline-flex items-center group relative">
                <input 
                  type="checkbox" 
                  v-model="store.formData.studentComposition.iep"
                  class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700">IEP</span>
                <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                  Individualized Education Program - Includes modified content and accommodations
                </div>
              </label>
              <label class="inline-flex items-center group relative">
                <input 
                  type="checkbox" 
                  v-model="store.formData.studentComposition.gifted"
                  class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700">Gifted</span>
                <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                  Advanced learners - Includes enrichment and challenging content
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Test Prep -->
        <div class="mb-6 pt-4 border-t">
          <h3 class="text-sm font-medium text-gray-700 mb-4">Test Preparation Focus</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-2 gap-4">
              <label class="inline-flex items-center">
                <input 
                  type="checkbox" 
                  v-model="store.formData.testPrep.ap"
                  :disabled="store.formData.standards.type === 'ap'"
                  class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700">AP Exam Prep</span>
              </label>
              <label class="inline-flex items-center">
                <input 
                  type="checkbox" 
                  v-model="store.formData.testPrep.ib"
                  :disabled="store.formData.standards.type === 'ib'"
                  class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700">IB Exam Prep</span>
              </label>
              <label class="inline-flex items-center">
                <input 
                  type="checkbox" 
                  v-model="store.formData.testPrep.sat"
                  class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700">SAT Prep</span>
              </label>
              <label class="inline-flex items-center">
                <input 
                  type="checkbox" 
                  v-model="store.formData.testPrep.act"
                  class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700">ACT Prep</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Standards Preview -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-900">Selected Standards Preview</h3>
            <span class="text-xs text-gray-500">Full standards list will be included in generated materials</span>
          </div>
          <div class="space-y-2">
            <div v-if="store.formData.standards.type" class="p-3 bg-white rounded-lg border border-gray-200">
              <div class="text-sm text-gray-900">
                {{ getStandardsTypeLabel(store.formData.standards.type) }}
                <span v-if="store.formData.standards.type === 'state' && store.formData.standards.state" class="ml-2 text-gray-500">
                  - {{ getStateName(store.formData.standards.state) }}
                </span>
              </div>
              <div class="mt-2 text-xs text-gray-500">
                All materials will be aligned with {{ getStandardsTypeLabel(store.formData.standards.type) }}
                {{ store.formData.standards.type === 'state' && store.formData.standards.state ? 'for ' + getStateName(store.formData.standards.state) : '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseWizardStep>
</template>

<script setup>
import { computed } from 'vue';
import BaseWizardStep from './BaseWizardStep.vue';
import { useStore } from '../../stores/store';

const store = useStore();

const isValid = computed(() => {
  return (
    store.formData.standards.type !== '' &&
    (store.formData.standards.type !== 'state' || store.formData.standards.state !== '')
  );
});

const getStandardsTypeLabel = (type) => {
  const labels = {
    'common-core': 'Common Core Standards',
    'state': 'State Standards',
    'ib': 'International Baccalaureate',
    'ap': 'Advanced Placement'
  };
  return labels[type] || type;
};

const getStateName = (code) => {
  const state = store.states.find(s => s.code === code);
  return state ? state.name : code;
};

const handleAPorIBSelection = () => {
  // If AP is selected as standards type, automatically enable AP test prep
  if (store.formData.standards.type === 'ap') {
    store.formData.testPrep.ap = true;
  }
  // If IB is selected as standards type, automatically enable IB test prep
  if (store.formData.standards.type === 'ib') {
    store.formData.testPrep.ib = true;
  }
};
</script> 
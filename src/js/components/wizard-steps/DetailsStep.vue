<template>
  <div class="space-y-8">
    <div class="text-center animate-fade-in">
      <h3 class="text-3xl font-extrabold text-gray-900 animate-slide-up" style="animation-delay: 100ms">
        Customize Your Curriculum
      </h3>
      <p class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 200ms">
        Align with standards and add special requirements
      </p>
    </div>

    <div class="max-w-3xl mx-auto mt-12">
      <div class="space-y-6 animate-slide-up" style="animation-delay: 300ms">
        <div class="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h4 class="font-semibold text-gray-900">Standards Alignment</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="standard in availableStandards"
              :key="standard.value"
              class="relative"
            >
              <div
                class="w-full p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer"
                :class="{
                  'border-primary-500 bg-primary-50': modelValue.standardsAlignment === standard.value,
                  'border-gray-200 hover:border-primary-300': modelValue.standardsAlignment !== standard.value
                }"
                @click="selectStandard(standard.value)"
              >
                <div class="flex items-center space-x-3">
                  <div 
                    class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300"
                    :class="{
                      'border-primary-500 bg-primary-500': modelValue.standardsAlignment === standard.value,
                      'border-gray-300': modelValue.standardsAlignment !== standard.value
                    }"
                  >
                    <svg
                      v-if="modelValue.standardsAlignment === standard.value"
                      class="w-3 h-3 text-white animate-scale-in"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.72 6.95L5.5 8.73l4.4-4.4-.88-.88L5.5 6.97 4.6 6.07l-.88.88z" />
                    </svg>
                  </div>
                  <span 
                    class="font-medium transition-colors duration-300"
                    :class="{
                      'text-primary-700': modelValue.standardsAlignment === standard.value,
                      'text-gray-700': modelValue.standardsAlignment !== standard.value
                    }"
                  >
                    {{ standard.label }}
                  </span>
                </div>
                <p class="mt-2 text-sm text-gray-500 ml-8">{{ standard.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h4 class="font-semibold text-gray-900">Special Requirements</h4>
          <div class="space-y-3">
            <label class="flex items-start space-x-3 cursor-pointer">
              <div class="flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  v-model="modelValue.specialNeeds"
                  class="checkbox"
                >
              </div>
              <div>
                <span class="font-medium text-gray-900">Special Education Adaptations</span>
                <p class="mt-1 text-sm text-gray-500">Include modifications and accommodations for diverse learners</p>
              </div>
            </label>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Differentiation Strategies</label>
              <div class="space-y-2">
                <label 
                  v-for="strategy in differentiationStrategies"
                  :key="strategy.value"
                  class="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :value="strategy.value"
                    v-model="modelValue.differentiation"
                    class="checkbox"
                  >
                  <span class="text-gray-700">{{ strategy.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div 
      class="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 animate-fade-in"
      style="animation-delay: 800ms"
    >
      <div class="flex items-start space-x-6">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div>
          <h4 class="text-xl font-bold text-gray-900">Standards-Aligned Excellence</h4>
          <p class="mt-2 text-gray-600 leading-relaxed">
            Our AI ensures 100% alignment with your chosen standards while adapting to diverse learning needs. 
            <span class="font-semibold text-primary-600">Save 5+ hours</span> per week on differentiation planning.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  standards: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:model-value']);

const availableStandards = [
  {
    value: 'common_core',
    label: 'Common Core Standards',
    description: 'Align with nationally recognized academic standards'
  },
  {
    value: 'state',
    label: 'State Standards',
    description: 'Follow your specific state\'s educational requirements'
  }
];

const differentiationStrategies = [
  { value: 'visual', label: 'Visual Learning Support' },
  { value: 'auditory', label: 'Auditory Learning Materials' },
  { value: 'kinesthetic', label: 'Hands-on Activities' },
  { value: 'advanced', label: 'Advanced Learner Extensions' },
  { value: 'remedial', label: 'Additional Support Materials' }
];

const selectStandard = (value) => {
  emit('update:model-value', { ...props.modelValue, standardsAlignment: value });
};
</script> 
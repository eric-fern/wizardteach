<template>
  <div class="space-y-8">
    <div class="text-center animate-fade-in">
      <h3 class="text-3xl font-extrabold text-gray-900 animate-slide-up" style="animation-delay: 100ms">
        Add Your Personal Touch
      </h3>
      <p class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 200ms">
        Customize your curriculum with your class details
      </p>
    </div>

    <div class="max-w-3xl mx-auto mt-12">
      <div class="space-y-6 animate-slide-up" style="animation-delay: 300ms">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="grid grid-cols-1 gap-6">
            <div class="space-y-4">
              <label class="block">
                <span class="text-sm font-medium text-gray-700">School Name</span>
                <input
                  type="text"
                  v-model="modelValue.customization.schoolName"
                  class="input mt-1"
                  placeholder="Enter your school's name"
                >
              </label>

              <label class="block">
                <span class="text-sm font-medium text-gray-700">Class Name</span>
                <input
                  type="text"
                  v-model="modelValue.customization.className"
                  class="input mt-1"
                  placeholder="e.g., Advanced Biology, Algebra II"
                >
              </label>

              <label class="block">
                <span class="text-sm font-medium text-gray-700">Teacher Name</span>
                <input
                  type="text"
                  v-model="modelValue.customization.teacherName"
                  class="input mt-1"
                  placeholder="Your name"
                >
              </label>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label class="block">
                  <span class="text-sm font-medium text-gray-700">Start Date</span>
                  <input
                    type="date"
                    v-model="modelValue.customization.startDate"
                    class="input mt-1"
                  >
                </label>

                <label class="block">
                  <span class="text-sm font-medium text-gray-700">End Date</span>
                  <input
                    type="date"
                    v-model="modelValue.customization.endDate"
                    class="input mt-1"
                  >
                </label>
              </div>

              <label class="block">
                <span class="text-sm font-medium text-gray-700">Periods per Week</span>
                <select
                  v-model="modelValue.customization.periodsPerWeek"
                  class="select mt-1"
                >
                  <option v-for="n in 10" :key="n" :value="n">{{ n }} {{ n === 1 ? 'period' : 'periods' }}</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <h4 class="font-semibold text-gray-900 mb-4">Additional Options</h4>
          <div class="space-y-3">
            <label class="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                v-model="includeResources"
                class="checkbox"
              >
              <span class="text-gray-700">Include supplementary teaching resources</span>
            </label>

            <label class="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                v-model="includeAssessments"
                class="checkbox"
              >
              <span class="text-gray-700">Generate assessment materials</span>
            </label>

            <label class="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                v-model="includeRubrics"
                class="checkbox"
              >
              <span class="text-gray-700">Include grading rubrics</span>
            </label>
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        </div>
        <div>
          <h4 class="text-xl font-bold text-gray-900">Ready for Your Review</h4>
          <p class="mt-2 text-gray-600 leading-relaxed">
            Almost there! We'll generate a complete curriculum package based on your preferences. 
            <span class="font-semibold text-primary-600">Preview and download</span> your materials in the next step.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:model-value']);

const includeResources = ref(true);
const includeAssessments = ref(true);
const includeRubrics = ref(true);

// Watch for changes in additional options
watch([includeResources, includeAssessments, includeRubrics], () => {
  emit('update:model-value', {
    ...props.modelValue,
    customization: {
      ...props.modelValue.customization,
      includeResources: includeResources.value,
      includeAssessments: includeAssessments.value,
      includeRubrics: includeRubrics.value
    }
  });
});
</script> 
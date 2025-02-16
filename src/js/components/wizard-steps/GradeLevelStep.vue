<template>
  <BaseWizardStep
    title="What Grade Level Do You Teach?"
    subtitle="We'll tailor the curriculum to your students' needs"
  >
    <!-- Main Content -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
      <div
        v-for="(category, index) in gradeCategories"
        :key="category.name"
        class="animate-slide-up"
        :style="{ animationDelay: (300 + index * 100) + 'ms' }"
      >
        <div class="card card-hover bg-gradient-subtle p-4">
          <h4 class="font-semibold text-gray-900 mb-3">{{ category.name }}</h4>
          <div class="space-y-2">
            <div
              v-for="grade in category.grades"
              :key="grade.value"
              class="relative group"
            >
              <div
                class="w-full p-3 rounded-lg transition-all duration-300 cursor-pointer"
                :class="{
                  'bg-primary-50 ring-2 ring-primary-500': modelValue.gradeLevel === grade.value,
                  'bg-white hover:bg-gray-50': modelValue.gradeLevel !== grade.value,
                  'shadow-sm hover:shadow': true
                }"
                @click="selectGrade(grade.value)"
              >
                <div class="flex items-center justify-between">
                  <span 
                    class="font-medium transition-colors duration-300"
                    :class="{
                      'text-primary-600': modelValue.gradeLevel === grade.value,
                      'text-gray-700': modelValue.gradeLevel !== grade.value
                    }"
                  >
                    {{ grade.label }}
                  </span>
                  <div 
                    v-if="modelValue.gradeLevel === grade.value"
                    class="text-primary-500 animate-scale-in"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <template #info>
      <div class="flex items-start space-x-6">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
            <svg class="h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div>
          <h4 class="text-xl font-bold text-gray-900">Perfect Match Guarantee</h4>
          <p class="mt-2 text-gray-600 leading-relaxed">
            Our AI ensures your curriculum aligns perfectly with grade-level standards and learning objectives. 
            <span class="font-semibold text-primary-600">93% of teachers</span> report improved student engagement with our tailored content.
          </p>
        </div>
      </div>
    </template>
  </BaseWizardStep>
</template>

<script setup>
import BaseWizardStep from '../shared/BaseWizardStep.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:model-value']);

const gradeCategories = [
  {
    name: 'Elementary School',
    grades: [
      { value: 'k', label: 'Kindergarten' },
      { value: '1', label: '1st Grade' },
      { value: '2', label: '2nd Grade' },
      { value: '3', label: '3rd Grade' },
      { value: '4', label: '4th Grade' },
      { value: '5', label: '5th Grade' },
    ]
  },
  {
    name: 'Middle School',
    grades: [
      { value: '6', label: '6th Grade' },
      { value: '7', label: '7th Grade' },
      { value: '8', label: '8th Grade' },
    ]
  },
  {
    name: 'High School',
    grades: [
      { value: '9', label: '9th Grade' },
      { value: '10', label: '10th Grade' },
      { value: '11', label: '11th Grade' },
      { value: '12', label: '12th Grade' },
    ]
  }
];

const selectGrade = (value) => {
  emit('update:model-value', { ...props.modelValue, gradeLevel: value });
};
</script> 
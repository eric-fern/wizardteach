<template>
  <BaseWizardStep :isValid="isValid">
    <!-- Basic Course Information -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Course Information</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- Subject -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input 
            type="text"
            :value="store.formData.subject"
            @input="store.updateFormData('subject', $event.target.value)"
            class="w-full p-3 border rounded-lg focus:ring-2 border-gray-300"
            placeholder="Enter subject name"
          >
        </div>
        
        <!-- Class Duration -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Class Duration</label>
          <select 
            :value="store.formData.classDuration"
            @change="store.updateFormData('classDuration', $event.target.value)"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
          >
            <option value="">Select duration</option>
            <option v-for="(label, value) in store.durations" :key="value" :value="value">
              {{ label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Course Dates -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Course Dates</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input 
            type="date" 
            :value="store.formData.startDate"
            @change="store.updateFormData('startDate', $event.target.value)"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input 
            type="date" 
            :value="store.formData.endDate"
            @change="store.updateFormData('endDate', $event.target.value)"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
          >
        </div>
      </div>
    </div>

    <!-- Students Section -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Students</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
          <select 
            :value="store.formData.studentAgeRange"
            @change="store.updateFormData('studentAgeRange', $event.target.value)"
            class="w-full p-3 border rounded-lg focus:ring-2 border-gray-300"
          >
            <option value="">Select an age range</option>
            <option v-for="age in store.ageOptions" :key="age.value" :value="age.value">
              {{ age.label }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Number of Students</label>
          <input 
            type="number" 
            :value="store.formData.numberOfStudents"
            @input="store.updateFormData('numberOfStudents', $event.target.value)"
            min="1"
            max="100"
            class="w-full p-3 border rounded-lg focus:ring-2 border-gray-300"
            placeholder="Enter class size"
          >
        </div>
      </div>
    </div>

    <!-- Holidays & Breaks -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-900">Holidays & Breaks</h2>
        <button
          type="button"
          @click="store.startAddingHoliday"
          class="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
        >
          Add Holiday
        </button>
      </div>

      <!-- Holiday List -->
      <div v-if="store.formData.holidays.length > 0" class="space-y-2">
        <div 
          v-for="(holiday, index) in store.formData.holidays" 
          :key="index"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div>
            <div class="font-medium text-sm text-gray-900">{{ holiday.title }}</div>
            <div class="text-xs text-gray-500">
              {{ formatDate(holiday.startDate) }} - {{ formatDate(holiday.endDate) }}
            </div>
          </div>
          <button
            type="button"
            @click="store.removeHoliday(index)"
            class="text-red-600 hover:text-red-800"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div v-else class="text-sm text-gray-500 italic">
        No holidays or breaks added
      </div>
    </div>
  </BaseWizardStep>
</template>

<script setup>
import { computed } from 'vue';
import BaseWizardStep from './BaseWizardStep.vue';
import { useStore } from '../../stores/store';

const store = useStore();

const formatDate = (dateString) => {
  if (!dateString) return 'Not set';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Basic validation
const isValid = computed(() => {
  return (
    store.formData.subject !== '' &&
    store.formData.studentAgeRange !== '' &&
    store.formData.numberOfStudents !== '' &&
    store.formData.classDuration !== '' &&
    store.formData.startDate !== '' &&
    store.formData.endDate !== ''
  );
});
</script>

<style>
[v-cloak] {
  display: none;
}
</style> 
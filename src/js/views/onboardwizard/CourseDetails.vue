/**
 * Course Details Step
 * 
 * Second step in the onboarding wizard that collects:
 * - Student information (age range, class size)
 * - Course schedule (duration, dates)
 * - Resource availability (devices, field trips, etc.)
 * 
 * Uses BaseWizardStep for navigation and layout consistency.
 */
<template>
  <BaseWizardStep :isValid="isValid" @next="handleNext">
    <!-- Students Section -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Students</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- Age Range Selection -->
        <div>
          <div class="flex items-center group relative mb-1">
            <label class="block text-sm font-medium text-gray-700">Age Range</label>
            <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
              Used to tailor content and teaching strategies to your students' developmental level and learning capabilities
            </div>
          </div>
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

        <!-- Class Size Input -->
        <div>
          <div class="flex items-center group relative mb-1">
            <label class="block text-sm font-medium text-gray-700">Number of Students</label>
            <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
              Helps optimize group activities, materials distribution, and classroom management strategies
            </div>
          </div>
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

    <!-- Course Information Section -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Course Information</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- Left Column: Resources and Timing -->
        <div class="space-y-4">
          <!-- Resource Availability Checkboxes -->
          <div class="flex flex-col space-y-2">
            <label class="inline-flex items-center group relative">
              <input 
                type="checkbox" 
                v-model="store.formData.hasDevices"
                class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">Devices</span>
              <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="invisible group-hover:visible absolute left-0 ml-6 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                Students have access to phones, Chromebooks, or iPads
              </div>
            </label>
            <label class="inline-flex items-center group relative">
              <input 
                type="checkbox" 
                v-model="store.formData.hasFieldTrips"
                class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">Field Trip</span>
              <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="invisible group-hover:visible absolute left-0 ml-6 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                Ability to conduct educational trips outside the classroom
              </div>
            </label>
            <label class="inline-flex items-center group relative">
              <input 
                type="checkbox" 
                v-model="store.formData.hasProjector"
                class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">Smartboard/Projector</span>
              <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="invisible group-hover:visible absolute left-0 ml-6 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                Access to digital display technology in the classroom
              </div>
            </label>
            <label class="inline-flex items-center group relative">
              <input 
                type="checkbox" 
                v-model="store.formData.hasLab"
                class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">Science/Computer Lab Access</span>
              <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="invisible group-hover:visible absolute left-0 ml-6 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                Access to specialized laboratory facilities
              </div>
            </label>
          </div>

          <!-- Lesson Duration -->
          <div>
            <div class="flex items-center group relative mb-1">
              <label class="block text-sm font-medium text-gray-700">Lesson Duration</label>
              <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                Length of each lesson - used to properly pace activities and ensure comprehensive coverage of material
              </div>
            </div>
            <select 
              :value="store.formData.lessonDuration"
              @change="store.updateFormData('lessonDuration', $event.target.value)"
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
            >
              <option value="">Select duration</option>
              <option v-for="(label, value) in store.durations" :key="value" :value="value">
                {{ label }}
              </option>
            </select>
          </div>

          <!-- Term Dates -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="flex items-center group relative mb-2">
                <label class="block text-sm font-medium text-gray-700">Term Start</label>
                <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                  First day of your course - used to generate a properly sequenced curriculum that aligns with your academic calendar
                </div>
              </div>
              <input 
                type="date" 
                :value="store.formData.startDate"
                @change="store.updateFormData('startDate', $event.target.value)"
                class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
            </div>
            <div>
              <div class="flex items-center group relative mb-2">
                <label class="block text-sm font-medium text-gray-700">Term End</label>
                <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                  Last day of your course - helps structure the pacing and ensure all required content is covered within your timeframe
                </div>
              </div>
              <input 
                type="date" 
                :value="store.formData.endDate"
                @change="store.updateFormData('endDate', $event.target.value)"
                class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
            </div>
          </div>
        </div>

        <!-- Right Column: AI-Enabled Scheduling -->
        <div class="flex flex-col h-full">
          <TextBoxWithAITag
            label="Lesson Scheduling"
            tooltip="Our website is AI-Integrated - Describe your weekly schedule in plain english and we will do the rest."
            placeholder="Describe scheduling for this subject in plain english. Our AI will understand 5 day weeks, A/B block schedules, weekends/nights, and more."
            v-model="store.formData.lessonFrequency"
            :min-height="'160px'"
            :max-height="'300px'"
          />
        </div>
      </div>
    </div>
  </BaseWizardStep>
</template>

<script setup>
import { computed } from 'vue';
import BaseWizardStep from './BaseWizardStep.vue';
import { useStore } from '../../stores/store';
import TextBoxWithAITag from '../../components/shared/TextBoxWithAITag.vue';

const store = useStore();

/**
 * Validates all required fields for the course details step
 * Required fields:
 * - studentAgeRange
 * - numberOfStudents
 * - lessonDuration
 * - lessonFrequency
 * - startDate
 * - endDate
 */
const isValid = computed(() => {
  return (
    store.formData.studentAgeRange !== '' &&
    store.formData.numberOfStudents !== '' &&
    store.formData.lessonDuration !== '' &&
    store.formData.lessonFrequency?.trim() !== '' &&
    store.formData.startDate !== '' &&
    store.formData.endDate !== ''
  );
});

/**
 * Handles the next step transition
 * Navigation is handled by BaseWizardStep
 */
const handleNext = () => {
  // No specific logic needed for this step
  console.log('Course details completed');
};
</script>

<style>
[v-cloak] {
  display: none;
}

.v-cloak-hidden {
  display: none;
}

.v-cloak-block {
  display: block;
}

.v-cloak-inline {
  display: inline;
}
</style> 
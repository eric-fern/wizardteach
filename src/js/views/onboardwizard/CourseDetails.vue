<template>
  <BaseWizardStep :isValid="isValid">
    <!-- Students Section -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Students</h2>
      <div class="grid grid-cols-2 gap-4">
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

    <!-- Basic Course Information -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Course Information</h2>
      <!-- Class Duration and Scheduling -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Left Column: Duration and Dates -->
        <div class="space-y-4">
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

        <!-- Right Column: Scheduling -->
        <div class="flex flex-col h-full">
          <div class="flex items-center group relative mb-1">
            <label class="block text-sm font-medium text-gray-700">Lesson Scheduling</label>
            <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-80 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
              Our website is AI-Integrated - Describe your weekly schedule in plain english and we will do the rest.
            </div>
            <span class="ml-2 text-sm text-blue-500 font-medium">AI-Enabled ✨</span>
          </div>
          <textarea 
            :value="store.formData.lessonFrequency"
            @input="(e) => {
              store.updateFormData('lessonFrequency', e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }"
            placeholder="Describe scheduling for this subject in plain english. Our AI will understand 5 day weeks, A/B block schedules, weekends/nights, and more."
            class="flex-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 resize-none overflow-hidden align-top"
            rows="6"
            style="vertical-align: top; min-height: 160px;"
          ></textarea>
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
    store.formData.studentAgeRange !== '' &&
    store.formData.numberOfStudents !== '' &&
    store.formData.lessonDuration !== '' &&
    store.formData.lessonFrequency?.trim() !== '' &&
    store.formData.startDate !== '' &&
    store.formData.endDate !== ''
  );
});
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
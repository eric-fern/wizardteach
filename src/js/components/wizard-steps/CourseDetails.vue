<template>
  <BaseWizardStep :isValid="isValid">
    <!-- Schedule Section -->
    <div class="mb-8" v-cloak>
      <h2 class="text-xl font-bold text-gray-900 mb-4">Subject Schedule</h2>
      <div class="space-y-6">
        <!-- Class Days -->
        <div class="space-y-6">
          <!-- Schedule Type Toggle -->
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-700">Class Schedule</h3>
            <FeatureToggle
              :model-value="store.formData.hasAlternatingSchedule"
              @update:model-value="toggleScheduleType"
              label="Alternating Schedule"
              tooltip="Enable to set different class days for Week A and Week B"
            />
          </div>

          <!-- Regular Schedule -->
          <div v-if="!store.formData.hasAlternatingSchedule" class="space-y-2" :key="'regular-schedule'">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="day in weekDays"
                :key="day"
                type="button"
                @click="toggleDay(day)"
                class="min-w-[120px] px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :class="[
                  store.formData.classDays[day] 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                ]"
              >
                {{ dayLabels[day] }}
              </button>
            </div>
            <!-- Quick Select Buttons -->
            <div class="flex gap-2 mt-4">
              <button 
                type="button"
                @click="selectWeekdays"
                class="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
              >
                Weekdays
              </button>
              <span class="text-gray-300">|</span>
              <button 
                type="button"
                @click="clearSelection"
                class="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
              >
                Clear
              </button>
            </div>
          </div>

          <!-- Alternating Schedule -->
          <div v-else class="space-y-4">
            <!-- Week A -->
            <div class="space-y-2" :key="'week-a'">
              <h4 class="text-sm font-medium text-gray-600">Week A</h4>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="day in weekDays"
                  :key="'A-'+day"
                  type="button"
                  @click="toggleDayA(day)"
                  class="min-w-[120px] px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  :class="[
                    store.formData.classDaysA[day] 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md transform scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                  ]"
                >
                  {{ dayLabels[day] }}
                </button>
              </div>
            </div>

            <!-- Week B -->
            <div class="space-y-2" :key="'week-b'">
              <h4 class="text-sm font-medium text-gray-600">Week B</h4>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="day in weekDays"
                  :key="'B-'+day"
                  type="button"
                  @click="toggleDayB(day)"
                  class="min-w-[120px] px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  :class="[
                    store.formData.classDaysB[day] 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md transform scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                  ]"
                >
                  {{ dayLabels[day] }}
                </button>
              </div>
            </div>

            <!-- Quick Select Buttons -->
            <div class="flex gap-2">
              <button 
                type="button"
                @click="selectWeekdaysAlternating"
                class="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
              >
                Weekdays
              </button>
              <span class="text-gray-300">|</span>
              <button 
                type="button"
                @click="clearAlternatingSelection"
                class="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <!-- Class Duration -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Subject Duration</label>
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
  </BaseWizardStep>
</template>

<script setup>
import { computed, defineComponent } from 'vue';
import BaseWizardStep from './BaseWizardStep.vue';
import FeatureToggle from '../shared/FeatureToggle.vue';
import { useStore } from '../../stores/store';

defineComponent({
  name: 'CourseDetailsNew'  // Adding a unique name
});

const store = useStore();

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dayLabels = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday'
};

const clearDays = {
  Mon: false,
  Tue: false,
  Wed: false,
  Thu: false,
  Fri: false,
  Sat: false,
  Sun: false
};

const weekdaySelection = {
  Mon: true,
  Tue: true,
  Wed: true,
  Thu: true,
  Fri: true,
  Sat: false,
  Sun: false
};

// Toggle schedule type
const toggleScheduleType = (value) => {
  store.updateFormData('hasAlternatingSchedule', value);
  // Clear all schedules to ensure clean data
  store.updateFormData('classDays', { ...clearDays });
  store.updateFormData('classDaysA', { ...clearDays });
  store.updateFormData('classDaysB', { ...clearDays });
};

// Regular schedule functions
const toggleDay = (day) => {
  store.updateFormData('classDays', { 
    ...store.formData.classDays, 
    [day]: !store.formData.classDays[day] 
  });
};

const selectWeekdays = () => {
  store.updateFormData('classDays', { ...weekdaySelection });
};

const clearSelection = () => {
  store.updateFormData('classDays', { ...clearDays });
};

// Alternating schedule functions
const toggleDayA = (day) => {
  store.updateFormData('classDaysA', { 
    ...store.formData.classDaysA, 
    [day]: !store.formData.classDaysA[day] 
  });
};

const toggleDayB = (day) => {
  store.updateFormData('classDaysB', { 
    ...store.formData.classDaysB, 
    [day]: !store.formData.classDaysB[day] 
  });
};

const selectWeekdaysAlternating = () => {
  store.updateFormData('classDaysA', { ...weekdaySelection });
  store.updateFormData('classDaysB', { ...weekdaySelection });
};

const clearAlternatingSelection = () => {
  store.updateFormData('classDaysA', { ...clearDays });
  store.updateFormData('classDaysB', { ...clearDays });
};

const isValid = computed(() => {
  const hasRegularClassDays = !store.formData.hasAlternatingSchedule && 
    Object.values(store.formData.classDays).some(day => day);
  
  const hasAlternatingClassDays = store.formData.hasAlternatingSchedule && 
    Object.values(store.formData.classDaysA).some(day => day) &&
    Object.values(store.formData.classDaysB).some(day => day);

  return (
    store.formData.studentAgeRange !== '' &&
    store.formData.numberOfStudents !== '' &&
    store.formData.classDuration !== '' &&
    (hasRegularClassDays || hasAlternatingClassDays)
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
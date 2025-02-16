<template>
  <BaseWizardStep :isValid="isValid">
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

    <!-- Schedule Section -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Schedule</h2>
      <div class="space-y-6">
        <!-- Date Selection -->
        <div class="grid grid-cols-7 gap-4">
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input 
              type="date" 
              :value="store.formData.startDate"
              @input="store.updateFormData('startDate', $event.target.value)"
              class="w-44 p-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input 
              type="date" 
              :value="store.formData.endDate"
              @input="store.updateFormData('endDate', $event.target.value)"
              class="w-44 p-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>
          <div class="col-span-3 flex items-end">
            <FeatureToggle
              :model-value="store.formData.funFridays"
              @update:model-value="store.updateFormData('funFridays', $event)"
              label="Fun Friday Lessons"
              tooltip="Lessons on Friday will be a tad easier and more fun (within reason)"
            />
          </div>
        </div>

        <!-- Class Days -->
        <ClassDaysSelector 
          :hasAlternatingSchedule="store.formData.hasAlternatingSchedule"
          :classDays="store.formData.classDays"
          :classDaysA="store.formData.classDaysA"
          :classDaysB="store.formData.classDaysB"
          @update:hasAlternatingSchedule="store.updateFormData('hasAlternatingSchedule', $event)"
          @update:classDays="store.updateFormData('classDays', $event)"
          @update:classDaysA="store.updateFormData('classDaysA', $event)"
          @update:classDaysB="store.updateFormData('classDaysB', $event)"
        />

        <!-- Class Duration -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Class Duration</label>
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
    </div>

    <!-- Holidays Section -->
    <HolidayManager
      :holidays="store.formData.holidays"
      :startDate="store.formData.startDate"
      :endDate="store.formData.endDate"
      @update:holidays="store.updateFormData('holidays', $event)"
    />
  </BaseWizardStep>
</template>

<script setup>
import { computed } from 'vue';
import BaseWizardStep from './BaseWizardStep.vue';
import FeatureToggle from '../shared/FeatureToggle.vue';
import ClassDaysSelector from '../shared/ClassDaysSelector.vue';
import HolidayManager from '../shared/HolidayManager.vue';
import { useStore } from '../../stores/store';

const store = useStore();

const isValid = computed(() => {
  const hasRegularClassDays = !store.formData.hasAlternatingSchedule && 
    Object.values(store.formData.classDays).some(day => day);
  
  const hasAlternatingClassDays = store.formData.hasAlternatingSchedule && 
    Object.values(store.formData.classDaysA).some(day => day) &&
    Object.values(store.formData.classDaysB).some(day => day);

  return (
    store.formData.studentAgeRange !== '' &&
    store.formData.numberOfStudents !== '' &&
    store.formData.startDate !== '' &&
    store.formData.endDate !== '' &&
    store.formData.classDuration !== '' &&
    (hasRegularClassDays || hasAlternatingClassDays)
  );
});
</script> 
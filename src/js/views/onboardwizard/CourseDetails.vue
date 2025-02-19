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
    <div class="wizard-section">
      <h2 class="wizard-heading">Students</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- Age Range Selection -->
        <div>
          <div class="flex items-center group relative mb-1">
            <label class="wizard-label">Age Range</label>
            <button class="ml-1 focus:outline-none transition-colors duration-200 wizard-text-secondary">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div class="wizard-tooltip">
              Used to tailor content and teaching strategies to your students' developmental level and learning capabilities
            </div>
          </div>
          <select 
            :value="store.formData.studentAgeRange"
            @change="store.updateFormData('studentAgeRange', $event.target.value)"
            class="form-select w-full"
            style="color: var(--text-primary)"
          >
            <option value="" style="color: var(--text-secondary)">Select an age range</option>
            <option v-for="option in store.ageOptions" 
                    :key="option.value" 
                    :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Class Size Input -->
        <div>
          <div class="flex items-center group relative mb-1">
            <label class="wizard-label">Number of Students</label>
            <button class="ml-1 focus:outline-none transition-colors duration-200 wizard-text-secondary">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div class="wizard-tooltip">
              Helps optimize group activities, materials distribution, and classroom management strategies
            </div>
          </div>
          <input 
            type="number" 
            :value="store.formData.numberOfStudents"
            @input="store.updateFormData('numberOfStudents', $event.target.value)"
            min="1"
            max="100"
            class="form-input w-full number-students"
            placeholder="Enter class size"
            style="color: #E4E6EB"
          >
        </div>
      </div>
    </div>

    <!-- Course Information Section -->
    <div class="wizard-section">
      <h2 class="wizard-heading">Course Information</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- Left Column: Resources and Timing -->
        <div class="space-y-4">
          <!-- Resource Availability Checkboxes -->
          <div class="flex flex-col space-y-2">
            <label class="inline-flex items-center group relative">
              <input 
                type="checkbox" 
                v-model="store.formData.hasProjector"
                class="form-checkbox h-4 w-4 rounded focus:ring-2 transition-colors duration-200"
              >
              <span class="ml-2 wizard-text">Smartboard/Projector</span>
              <button class="ml-1 focus:outline-none transition-colors duration-200 wizard-text-secondary">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="wizard-tooltip">
                Access to digital display technology in the classroom
              </div>
            </label>
            <label class="inline-flex items-center group relative">
              <input 
                type="checkbox" 
                v-model="store.formData.hasFieldTrips"
                class="form-checkbox h-4 w-4 rounded focus:ring-2 transition-colors duration-200"
              >
              <span class="ml-2 wizard-text">Field Trip</span>
              <button class="ml-1 focus:outline-none transition-colors duration-200 wizard-text-secondary">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="wizard-tooltip">
                Ability to conduct educational trips outside the classroom
              </div>
            </label>
            <label class="inline-flex items-center group relative">
              <input 
                type="checkbox" 
                v-model="store.formData.hasLab"
                class="form-checkbox h-4 w-4 rounded focus:ring-2 transition-colors duration-200"
              >
              <span class="ml-2 wizard-text">Science/Computer Lab Access</span>
              <button class="ml-1 focus:outline-none transition-colors duration-200 wizard-text-secondary">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="wizard-tooltip">
                Access to specialized laboratory facilities
              </div>
            </label>
            <label class="inline-flex items-center group relative">
              <input 
                type="checkbox" 
                v-model="store.formData.hasDevices"
                class="form-checkbox h-4 w-4 rounded focus:ring-2 transition-colors duration-200"
              >
              <span class="ml-2 wizard-text">Devices</span>
              <button class="ml-1 focus:outline-none transition-colors duration-200 wizard-text-secondary">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="wizard-tooltip">
                Students have access to phones, Chromebooks, or iPads
              </div>
            </label>
          </div>

          <!-- Lesson Duration -->
          <div>
            <div class="flex items-center group relative mb-1">
              <label class="wizard-label">Lesson Duration</label>
              <button class="ml-1 focus:outline-none transition-colors duration-200 wizard-text-secondary">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div class="wizard-tooltip">
                Length of each lesson - used to properly pace activities and ensure comprehensive coverage of material
              </div>
            </div>
            <select 
              :value="store.formData.lessonDuration"
              @change="store.updateFormData('lessonDuration', $event.target.value)"
              class="form-select w-full"
              style="color: var(--text-primary)"
            >
              <option value="" style="color: var(--text-secondary)">Select duration</option>
              <option v-for="(label, value) in store.durations" 
                      :key="value" 
                      :value="value">
                {{ label }}
              </option>
            </select>
          </div>

          <!-- Term Dates -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="flex items-center group relative mb-2">
                <label class="wizard-label">Term Start</label>
                <button class="ml-1 focus:outline-none transition-colors duration-200 wizard-text-secondary">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div class="wizard-tooltip">
                  First day of your course - used to generate a properly sequenced curriculum that aligns with your academic calendar
                </div>
              </div>
              <input 
                type="date" 
                :value="store.formData.startDate"
                @change="store.updateFormData('startDate', $event.target.value)"
                class="form-input w-full"
                style="color: var(--text-primary)"
              >
            </div>
            <div>
              <div class="flex items-center group relative mb-2">
                <label class="wizard-label">Term End</label>
                <button class="ml-1 focus:outline-none transition-colors duration-200 wizard-text-secondary">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div class="wizard-tooltip">
                  Last day of your course - helps structure the pacing and ensure all required content is covered within your timeframe
                </div>
              </div>
              <input 
                type="date" 
                :value="store.formData.endDate"
                @change="store.updateFormData('endDate', $event.target.value)"
                class="form-input w-full"
                style="color: var(--text-primary)"
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

/* Dropdown styling */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1em;
  padding-right: 2.5rem;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-500);
}

/* Ensure dropdown options are styled correctly */
select option {
  padding: 0.5rem;
}

select option:checked {
  background-color: var(--primary-500);
  color: white;
}

/* Hover state for options */
select option:hover {
  background-color: var(--primary-100);
}
</style>

<style scoped>
/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Card styling */
.wizard-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
}

/* Wizard specific text styles */
.wizard-text {
  color: var(--text-primary);
}

.wizard-text-secondary {
  color: var(--text-secondary);
}

.wizard-label {
  color: var(--text-primary);
}

/* Super specific selector for number input placeholder */
.wizard-section input[type="number"].form-input.number-students::placeholder {
  color: #E4E6EB !important;
  opacity: 1 !important;
}

/* Webkit specific */
.wizard-section input[type="number"].form-input.number-students::-webkit-input-placeholder {
  color: #E4E6EB !important;
  opacity: 1 !important;
}

/* Firefox specific */
.wizard-section input[type="number"].form-input.number-students::-moz-placeholder {
  color: #E4E6EB !important;
  opacity: 1 !important;
}

/* Internet Explorer specific */
.wizard-section input[type="number"].form-input.number-students:-ms-input-placeholder {
  color: #E4E6EB !important;
  opacity: 1 !important;
}

/* Remove previous less specific rules */
input[type="number"].form-input::placeholder {
  color: #E4E6EB !important;
  opacity: 1 !important;
}

/* Keep other form control styles */
.form-input::placeholder {
  color: var(--text-secondary) !important;
  opacity: 0.7;
}

.form-select option[value=""] {
  color: var(--text-secondary) !important;
  opacity: 0.7;
}

/* Tooltip */
.wizard-tooltip {
  @apply invisible group-hover:visible absolute bottom-full left-0 mb-2 w-80 p-2 rounded shadow-lg z-10;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}
</style> 
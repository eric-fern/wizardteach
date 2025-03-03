/**
 * Progress Indicator Component
 * 
 * Displays completed form fields in a visually appealing oval layout.
 * Automatically updates based on the Pinia store state.
 * Uses different colors to distinguish between basic info and standards.
 */
<template>
  <div class="mb-8 border-2 border-dashed rounded-xl p-4 transition-colors duration-200"
       :style="{
         borderColor: 'var(--primary-300)',
       }">
    <div class="flex flex-wrap gap-2">
      <template v-for="(field, key) in displayFields" :key="key">
        <!-- Individual Field Indicator -->
        <div v-if="field.value" 
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
          :style="{
            backgroundColor: field.type === 'standards' ? 'var(--success-500)' : 'var(--primary-100)',
            color: field.type === 'standards' ? 'var(--success-900)' : 'var(--primary-700)'
          }"
        >
          <span>{{ field.label }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../../stores/store';

const store = useStore();

/**
 * Formats a date string into a human-readable format
 * Used for displaying course start/end dates
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Computed property that generates the display fields based on store state
 * Each field is an object with:
 * - type: The category of the field (basic, duration, standards)
 * - value: Whether the field should be shown
 * - label: The formatted text to display
 */
const displayFields = computed(() => {
  const fields = [];
  const { formData } = store;

  // Basic Info Fields
  if (formData.subject) {
    fields.push({
      type: 'basic',
      value: true,
      label: `Subject: ${formData.subject}`
    });
  }

  if (formData.studentAgeRange) {
    fields.push({
      type: 'basic',
      value: true,
      label: `Age: ${store.getGradeLevelLabel(formData.studentAgeRange)}`
    });
  }

  if (formData.numberOfStudents) {
    fields.push({
      type: 'basic',
      value: true,
      label: `${formData.numberOfStudents} Students`
    });
  }

  // Course Duration Fields
  if (formData.startDate && formData.endDate) {
    fields.push({
      type: 'duration',
      value: true,
      label: `${formatDate(formData.startDate)} to ${formatDate(formData.endDate)}`
    });
  }

  // Lesson Duration Field
  if (formData.lessonDuration) {
    fields.push({
      type: 'duration',
      value: true,
      label: `${store.formatDuration(formData.lessonDuration)} per class`
    });
  }

  // Standards Selection Field
  // Uses selectedType to match the store structure
  if (formData.standards.selectedType) {
    let standardsLabel = '';
    if (formData.standards.selectedType === 'state' && formData.standards.state) {
      standardsLabel = `${store.getStateName(formData.standards.state)} State Standards`;
    } else {
      standardsLabel = store.getStandardsTypeLabel(formData.standards.selectedType);
    }
    fields.push({
      type: 'standards',
      value: true,
      label: standardsLabel
    });
  }

  return fields;
});
</script>

<style scoped>
/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 
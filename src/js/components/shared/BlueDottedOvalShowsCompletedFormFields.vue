<template>
  <div class="mb-8 border-2 border-dashed border-blue-300 rounded-xl p-4 bg-blue-50/50">
    <div class="flex flex-wrap gap-2">
      <template v-for="(field, key) in displayFields" :key="key">
        <div v-if="field.value" 
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          :class="field.type === 'standards' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'"
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

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const displayFields = computed(() => {
  const fields = [];
  const { formData } = store;

  // Basic Info
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

  // Course Duration
  if (formData.startDate && formData.endDate) {
    fields.push({
      type: 'duration',
      value: true,
      label: `${formatDate(formData.startDate)} to ${formatDate(formData.endDate)}`
    });
  }

  // Lesson Duration
  if (formData.lessonDuration) {
    fields.push({
      type: 'duration',
      value: true,
      label: `${store.formatDuration(formData.lessonDuration)} per class`
    });
  }

  // Standards
  if (formData.standards.type) {
    let standardsLabel = '';
    if (formData.standards.type === 'state' && formData.standards.state) {
      standardsLabel = `${store.getStateName(formData.standards.state)} State Standards`;
    } else {
      standardsLabel = store.getStandardsTypeLabel(formData.standards.type);
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
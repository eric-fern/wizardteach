<template>
  <div class="mb-8 border-2 border-dashed border-blue-300 rounded-xl p-4 bg-blue-50/50">
    <div class="flex flex-wrap gap-2">
      <!-- Subject Tag -->
      <div v-if="store.formData.subject" 
        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
      >
        <span>Subject: {{ store.formData.subject }}</span>
      </div>

      <!-- Age Range Tag -->
      <div v-if="store.formData.studentAgeRange" 
        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
      >
        <span>Age: {{ store.getGradeLevelLabel(store.formData.studentAgeRange) }}</span>
      </div>

      <!-- Number of Students Tag -->
      <div v-if="store.formData.numberOfStudents" 
        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
      >
        <span>{{ store.formData.numberOfStudents }} Students</span>
      </div>

      <!-- Course Duration Tags -->
      <template v-if="store.formData.startDate && store.formData.endDate">
        <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
          <span>{{ formatDate(store.formData.startDate) }} to {{ formatDate(store.formData.endDate) }}</span>
        </div>
      </template>

      <!-- Lesson Duration Tag -->
      <div v-if="store.formData.lessonDuration" 
        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
      >
        <span>{{ store.formatDuration(store.formData.lessonDuration) }} per class</span>
      </div>

      <!-- Standards Tags -->
      <template v-if="store.formData.standards.type">
        <!-- State Standards -->
        <div v-if="store.formData.standards.type === 'state' && store.formData.standards.state" 
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
        >
          <span>{{ store.getStateName(store.formData.standards.state) }} State Standards</span>
        </div>
        <!-- Common Core -->
        <div v-if="store.formData.standards.type === 'common-core'" 
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
        >
          <span>Common Core Standards</span>
        </div>
        <!-- AP -->
        <div v-if="store.formData.standards.type === 'ap'" 
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
        >
          <span>Advanced Placement Standards</span>
        </div>
        <!-- IB -->
        <div v-if="store.formData.standards.type === 'ib'" 
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
        >
          <span>International Baccalaureate Standards</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
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
</script> 
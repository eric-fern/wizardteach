/**
 * WizardAssistant Component
 * Displays a wizard emoji on specific pages defined in WIZARD_ENABLED_VIEWS
 */
<template>
  <div v-if="shouldShowWizard" class="fixed bottom-4 right-4">
    <span class="text-2xl">🧙‍♂️</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// List of views where wizard should appear
const WIZARD_ENABLED_VIEWS = [
  'onboard-entry',
  'course-details',
  'choose-standards',
  'wizard-questions'
]

const shouldShowWizard = computed(() => 
  WIZARD_ENABLED_VIEWS.includes(route.name)
)
</script>

<style scoped>
/* Basic styling only */
.bg-primary-500 {
  background-color: var(--primary-500);
}

.bg-white {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style> 
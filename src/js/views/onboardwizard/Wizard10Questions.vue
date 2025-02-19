<template>
  <BaseWizardStep
    :is-valid="isValid"
    @next="handleNext"
    @prev="handlePrev"
  >
    <div class="text-center mb-8 p-4 rounded-lg bg-primary-100">
      <h1 class="text-2xl font-bold text-primary-800">Let's Chat About Your Class</h1>
      <p class="text-primary-600">Our AI assistant will ask you some questions to understand your needs better.</p>
    </div>

    <div class="wizard-card p-6 bg-white rounded-lg shadow-sm">
      <OnboardChatAI />
    </div>
  </BaseWizardStep>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseWizardStep from './BaseWizardStep.vue'
import OnboardChatAI from '../../components/shared/OnboardChatAI.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// For now, always valid until we implement proper validation
const isValid = computed(() => true)

const handleNext = () => {
  router.push('/create')
}

const handlePrev = () => {
  router.push('/onboard/standards')
}
</script>

<style scoped>
.wizard-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
}

/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 
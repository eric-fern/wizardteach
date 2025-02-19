/**
 * ThinkingStep Component
 * 
 * A wizard step that shows the thinking animation while processing AI requests.
 * This step is automatically navigated to after standards selection and before
 * the questions step.
 */
<template>
  <BaseWizardStep
    :is-valid="true"
    :hide-previous="true"
    @next="handleNext"
  >
    <template #title>
      Processing Your Curriculum
    </template>
    <template #subtitle>
      Our AI wizard is analyzing your requirements and preparing personalized questions
    </template>

    <ThinkingView />
  </BaseWizardStep>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../stores/store';
import BaseWizardStep from './BaseWizardStep.vue';
import ThinkingView from '../../components/shared/ThinkingView.vue';

const router = useRouter();
const store = useStore();

// Simulate AI processing time (15 seconds)
onMounted(() => {
  setTimeout(() => {
    router.push('/onboard/questions');
  }, 15000);
});

const handleNext = () => {
  router.push('/onboard/questions');
};
</script> 
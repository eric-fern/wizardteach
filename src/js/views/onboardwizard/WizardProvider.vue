/**
 * WizardProvider Component
 * 
 * Provides wizard context to all child components in the wizard flow.
 * Wraps the router-view to ensure context is available to all wizard steps.
 */
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import { provideWizardContext } from '../../composables/useWizardContext';

// Provide wizard context when component mounts
onMounted(() => {
  console.log('WizardProvider: Providing wizard context');
  provideWizardContext();
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
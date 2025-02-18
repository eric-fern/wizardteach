<template>
  <div class="min-h-screen dark" :class="{ 'dark': true }" style="background-color: var(--bg-secondary);">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <GlobalNav />
    <DebugPanel />
    <WizardAssistant />
  </div>
</template>

<script setup>
import DebugPanel from './components/shared/DebugPanel.vue';
import GlobalNav from './components/shared/GlobalNav.vue';
import WizardAssistant from './components/shared/WizardAssistant.vue';
// Component logic will be handled by the router and individual views
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Apply dark mode styles to the root */
:root {
  color-scheme: dark;
}

/* Ensure background colors use CSS variables */
.dark {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}
</style> 
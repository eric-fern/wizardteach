<template>
  <div class="min-h-screen bg-gray-50">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <GlobalNav />
    <DebugPanel />
  </div>
</template>

<script setup>
import DebugPanel from './components/shared/DebugPanel.vue';
import GlobalNav from './components/shared/GlobalNav.vue';
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
</style> 
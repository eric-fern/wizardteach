<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="text-center animate-fade-in">
      <h3 
        class="heading-2 animate-slide-up" 
        :style="{ animationDelay: '100ms' }"
      >
        <slot name="title">{{ title }}</slot>
      </h3>
      <p 
        class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" 
        :style="{ animationDelay: '200ms' }"
      >
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </div>

    <!-- Main Content -->
    <div 
      class="animate-fade-in"
      :style="{ animationDelay: '300ms' }"
    >
      <slot></slot>
    </div>

    <!-- Footer/Actions -->
    <div 
      v-if="$slots.actions"
      class="mt-8 animate-fade-in"
      :style="{ animationDelay: '400ms' }"
    >
      <slot name="actions"></slot>
    </div>

    <!-- Info Section -->
    <div 
      v-if="$slots.info"
      class="mt-12 bg-gradient-subtle rounded-2xl p-8 animate-fade-in"
      :style="{ animationDelay: '500ms' }"
    >
      <slot name="info"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}
</style> 
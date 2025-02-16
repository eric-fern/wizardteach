<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div v-if="$slots.title || $slots.subtitle || title || subtitle" class="text-center animate-fade-in">
      <h3 
        class="heading-2 animate-slide-up" 
        :style="{ animationDelay: '100ms' }"
      >
        <slot name="title">{{ title }}</slot>
      </h3>
      <p 
        v-if="$slots.subtitle || subtitle"
        class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" 
        :style="{ animationDelay: '200ms' }"
      >
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </div>

    <!-- Main Content -->
    <div 
      class="animate-fade-in space-y-6"
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
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  isValid: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:formData', 'validate']);
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 
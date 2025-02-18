<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center group relative mb-1">
      <label class="block text-sm font-medium" style="color: var(--text-primary);">{{ label }}</label>
      <button class="ml-1 focus:outline-none transition-colors duration-200" style="color: var(--text-secondary);">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-80 p-2 rounded shadow-lg z-10"
           style="background-color: var(--bg-secondary); color: var(--text-primary);">
        {{ tooltip }}
      </div>
      <span class="ml-2 text-sm font-medium" style="color: var(--primary-500);">AI-Enabled ✨</span>
    </div>
    <textarea 
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.target.value)"
      :placeholder="placeholder"
      class="form-textarea flex-1 w-full resize-none overflow-y-auto"
      :rows="rows"
      :style="{
        'min-height': minHeight,
        'max-height': maxHeight
      }"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  tooltip: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 6
  },
  minHeight: {
    type: String,
    default: '160px'
  },
  maxHeight: {
    type: String,
    default: '300px'
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
textarea {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-200) var(--bg-secondary);
}

textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb {
  background-color: var(--primary-200);
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background-color: var(--primary-300);
}

/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 
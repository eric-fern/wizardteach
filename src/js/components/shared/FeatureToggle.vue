<template>
  <label class="inline-flex items-center group relative">
    <input 
      type="checkbox" 
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
    >
    <span class="ml-2 text-sm text-gray-700">{{ label }}</span>
    <button v-if="tooltip" class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
    <div v-if="tooltip" class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
      {{ tooltip }}
    </div>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  tooltip: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script> 
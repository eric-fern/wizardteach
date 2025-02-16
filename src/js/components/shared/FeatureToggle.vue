<template>
  <div class="flex items-center">
    <button 
      type="button"
      :class="[
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        modelValue ? 'bg-blue-600' : 'bg-gray-200'
      ]"
      @click="$emit('update:model-value', !modelValue)"
    >
      <span 
        :class="[
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          modelValue ? 'translate-x-5' : 'translate-x-0'
        ]"
      />
    </button>
    <span class="ml-3 text-sm font-medium text-gray-700">{{ label }}</span>
    <div v-if="tooltip" class="ml-2 group relative">
      <span class="cursor-help text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      </span>
      <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 p-2 -top-2 left-6 w-48 text-xs text-white bg-gray-900 rounded shadow-lg">
        {{ tooltip }}
      </div>
    </div>
  </div>
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

defineEmits(['update:model-value']);
</script> 
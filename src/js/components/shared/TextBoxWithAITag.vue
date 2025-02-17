<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center group relative mb-1">
      <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-80 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
        {{ tooltip }}
      </div>
      <span class="ml-2 text-sm text-blue-500 font-medium">AI-Enabled ✨</span>
    </div>
    <textarea 
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.target.value)"
      :placeholder="placeholder"
      class="flex-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 resize-none overflow-y-auto"
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
  scrollbar-color: #CBD5E0 #EDF2F7;
}

textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #EDF2F7;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background-color: #A0AEC0;
}
</style> 
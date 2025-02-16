<template>
  <div class="space-y-6">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  isValid: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:formData', 'validate']);
</script> 
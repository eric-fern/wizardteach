<template>
  <div class="space-y-1">
    <template v-for="(value, key) in data" :key="key">
      <div class="flex items-center">
        <button 
          v-if="isExpandable(value)"
          @click="toggleExpand(key)"
          class="w-4 h-4 mr-1 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {{ isExpanded(key) ? '▼' : '▶' }}
        </button>
        <span v-else class="w-4 mr-1"></span>
        
        <span class="text-xs">
          <span class="text-gray-600">{{ key }}:</span>
          <span 
            class="ml-1"
            :class="{'text-gray-800': !isExpandable(value), 'text-gray-500': isExpandable(value)}"
          >
            {{ formatValue(value) }}
          </span>
        </span>
      </div>
      
      <div v-if="isExpandable(value) && isExpanded(key)" class="pl-4">
        <StateTree 
          :data="value"
          :path="getChildPath(key)"
          :expanded="expanded"
          @toggle="(childPath) => $emit('toggle', childPath)"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: [Object, Array],
    required: true
  },
  path: {
    type: String,
    default: ''
  },
  expanded: {
    type: Set,
    required: true
  }
});

const emit = defineEmits(['toggle']);

const getNodePath = (key) => props.path ? `${props.path}.${key}` : key;

const isExpanded = (key) => props.expanded.has(getNodePath(key));

const getChildPath = (key) => getNodePath(key);

const toggleExpand = (key) => {
  emit('toggle', getNodePath(key));
};

const formatValue = (value) => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'object') {
    if (Array.isArray(value)) return `Array(${value.length})`;
    return 'Object';
  }
  return String(value);
};

const isExpandable = (value) => {
  return value !== null && typeof value === 'object';
};
</script> 
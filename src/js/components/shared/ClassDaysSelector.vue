<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-medium text-gray-700">Class Days</h3>
      <FeatureToggle
        :model-value="hasAlternatingSchedule"
        @update:model-value="toggleSchedule"
        label="Alternating Schedule"
        tooltip="Enable alternating schedule to set different class days for Week A and Week B"
      />
    </div>

    <!-- Regular Schedule -->
    <div v-if="!hasAlternatingSchedule" class="flex gap-2 flex-wrap">
      <label v-for="day in weekDays" :key="day" class="inline-flex items-center px-3 py-2 border rounded-lg hover:bg-gray-50">
        <input 
          type="checkbox" 
          :checked="classDays[day]"
          @change="updateRegularDay(day, $event.target.checked)"
          class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
        >
        <span class="ml-2 text-sm text-gray-700">{{ day }}</span>
      </label>
    </div>

    <!-- Alternating Schedule -->
    <div v-else class="space-y-3">
      <!-- Week A -->
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-gray-700 w-16">Week A</span>
        <div class="flex gap-2 flex-wrap">
          <label v-for="day in weekDays" :key="'A-'+day" class="inline-flex items-center px-3 py-2 border rounded-lg hover:bg-gray-50">
            <input 
              type="checkbox" 
              :checked="classDaysA[day]"
              @change="updateWeekADay(day, $event.target.checked)"
              class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
            >
            <span class="ml-2 text-sm text-gray-700">{{ day }}</span>
          </label>
        </div>
      </div>
      <!-- Week B -->
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-gray-700 w-16">Week B</span>
        <div class="flex gap-2 flex-wrap">
          <label v-for="day in weekDays" :key="'B-'+day" class="inline-flex items-center px-3 py-2 border rounded-lg hover:bg-gray-50">
            <input 
              type="checkbox" 
              :checked="classDaysB[day]"
              @change="updateWeekBDay(day, $event.target.checked)"
              class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
            >
            <span class="ml-2 text-sm text-gray-700">{{ day }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import FeatureToggle from './FeatureToggle.vue';

const props = defineProps({
  hasAlternatingSchedule: {
    type: Boolean,
    required: true
  },
  classDays: {
    type: Object,
    required: true
  },
  classDaysA: {
    type: Object,
    required: true
  },
  classDaysB: {
    type: Object,
    required: true
  }
});

const emit = defineEmits([
  'update:hasAlternatingSchedule',
  'update:classDays',
  'update:classDaysA',
  'update:classDaysB'
]);

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const clearDays = {
  Mon: false,
  Tue: false,
  Wed: false,
  Thu: false,
  Fri: false,
  Sat: false,
  Sun: false
};

const toggleSchedule = (value) => {
  emit('update:hasAlternatingSchedule', value);
  emit('update:classDays', { ...clearDays });
  emit('update:classDaysA', { ...clearDays });
  emit('update:classDaysB', { ...clearDays });
};

const updateRegularDay = (day, checked) => {
  emit('update:classDays', { ...props.classDays, [day]: checked });
};

const updateWeekADay = (day, checked) => {
  emit('update:classDaysA', { ...props.classDaysA, [day]: checked });
};

const updateWeekBDay = (day, checked) => {
  emit('update:classDaysB', { ...props.classDaysB, [day]: checked });
};
</script> 
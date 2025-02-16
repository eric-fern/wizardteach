<template>
  <div class="bg-gray-50 p-3 rounded-lg">
    <div class="flex justify-between items-center mb-3">
      <div class="flex items-center group relative">
        <h3 class="text-sm font-medium text-gray-900">Holidays & Breaks</h3>
        <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
          End of lessons before holidays will include holiday-specific language (e.g., "Merry Christmas!", "Happy Thanksgiving!")
        </div>
      </div>
      <button 
        @click="isAddingHoliday = true"
        class="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>

    <!-- Add Holiday Form -->
    <div v-if="isAddingHoliday" class="mb-3 p-3 bg-white rounded-lg border border-gray-200">
      <div class="space-y-2">
        <input
          v-model="newHoliday.title"
          type="text"
          placeholder="Holiday Name"
          class="w-full p-1.5 text-sm border border-gray-300 rounded-lg"
        />
        <div class="grid grid-cols-2 gap-2">
          <div>
            <input
              v-model="newHoliday.startDate"
              type="date"
              class="w-full p-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <input
              v-model="newHoliday.endDate"
              type="date"
              class="w-full p-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button 
            @click="isAddingHoliday = false"
            class="px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            @click="addHoliday"
            class="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            :disabled="!canAddHoliday"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- Holiday List -->
    <div class="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
      <div 
        v-for="(holiday, index) in holidays" 
        :key="index"
        class="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200"
      >
        <div>
          <div class="font-medium text-sm text-gray-900">{{ holiday.title }}</div>
          <div class="text-xs text-gray-500">
            {{ formatDate(holiday.startDate) }} - {{ formatDate(holiday.endDate) }}
          </div>
        </div>
        <button 
          @click="removeHoliday(index)"
          class="text-gray-400 hover:text-red-500"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  holidays: {
    type: Array,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:holidays']);

const isAddingHoliday = ref(false);
const newHoliday = ref({
  title: '',
  startDate: '',
  endDate: ''
});

const canAddHoliday = computed(() => {
  if (!newHoliday.value.title || 
      !newHoliday.value.startDate || 
      !newHoliday.value.endDate) {
    return false;
  }

  const start = new Date(newHoliday.value.startDate);
  const end = new Date(newHoliday.value.endDate);
  const courseStart = new Date(props.startDate);
  const courseEnd = new Date(props.endDate);
  
  return !isNaN(start) && !isNaN(end) && 
         start <= end &&
         start >= courseStart &&
         end <= courseEnd;
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const addHoliday = () => {
  if (canAddHoliday.value && props.holidays.length < 10) {
    emit('update:holidays', [...props.holidays, {...newHoliday.value}]);
    newHoliday.value = { title: '', startDate: '', endDate: '' };
    isAddingHoliday.value = false;
  }
};

const removeHoliday = (index) => {
  const updatedHolidays = [...props.holidays];
  updatedHolidays.splice(index, 1);
  emit('update:holidays', updatedHolidays);
};
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #EDF2F7;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #EDF2F7;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
  border: 2px solid #EDF2F7;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #A0AEC0;
}
</style> 
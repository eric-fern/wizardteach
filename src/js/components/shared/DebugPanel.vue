<template>
  <div>
    <!-- Debug Toggle -->
    <div class="fixed bottom-4 right-4 z-50">
      <label class="flex items-center cursor-pointer bg-white px-3 py-2 rounded-lg shadow-md">
        <input
          type="checkbox"
          v-model="isDebugVisible"
          @change="toggleDebug"
          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
        >
        <span class="ml-2 text-sm text-gray-600">Debug</span>
      </label>
    </div>

    <!-- Debug Content -->
    <div v-if="isDebugVisible" class="fixed bottom-20 right-4 z-40 w-[600px] max-h-[80vh] bg-gray-50 rounded-lg border border-gray-200 shadow-xl flex flex-col">
      <!-- Header (Fixed) -->
      <div class="p-4 border-b border-gray-200 bg-gray-50">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <h4 class="text-sm font-medium text-gray-700">Debug Panel</h4>
            <span class="text-xs text-blue-500">(synced with Pinia store)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Current Step:</span>
            <span class="text-sm font-medium text-blue-600">
              {{ store.currentStep + 1 }}: {{ store.steps[store.currentStep] }}
            </span>
          </div>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-4">
        <div class="grid grid-cols-2 gap-4">
          <!-- Basic Info -->
          <div class="space-y-2">
            <h5 class="text-xs font-semibold text-gray-700 border-b pb-1">Basic Information</h5>
            <div class="space-y-1 text-xs">
              <div><span class="text-gray-500">Subject:</span> {{ store.formData.subject }}</div>
              <div><span class="text-gray-500">Age Range:</span> {{ store.formData.studentAgeRange }}</div>
              <div><span class="text-gray-500">Students:</span> {{ store.formData.numberOfStudents }}</div>
            </div>
          </div>

          <!-- Schedule -->
          <div class="space-y-2">
            <h5 class="text-xs font-semibold text-gray-700 border-b pb-1">Schedule</h5>
            <div class="space-y-1 text-xs">
              <div><span class="text-gray-500">Start:</span> {{ formatDate(store.formData.startDate) }}</div>
              <div><span class="text-gray-500">End:</span> {{ formatDate(store.formData.endDate) }}</div>
              <div><span class="text-gray-500">Duration:</span> {{ store.formData.lessonDuration }} mins</div>
              <div><span class="text-gray-500">Scheduling:</span> {{ store.formData.lessonFrequency || 'Not set' }}</div>
              <div><span class="text-gray-500">Fun Fridays:</span> {{ store.formData.funFridays ? 'Yes' : 'No' }}</div>
            </div>
          </div>

          <!-- Class Days -->
          <div class="space-y-2">
            <h5 class="text-xs font-semibold text-gray-700 border-b pb-1">Class Days</h5>
            <div class="space-y-1 text-xs">
              <template v-if="!store.formData.hasAlternatingSchedule">
                <div><span class="text-gray-500">Schedule Type:</span> Regular</div>
                <div class="flex gap-1 flex-wrap">
                  <span 
                    v-for="(enabled, day) in store.formData.classDays" 
                    :key="day"
                    :class="enabled ? 'text-blue-600' : 'text-gray-400'"
                  >
                    {{ day }}
                  </span>
                </div>
              </template>
              <template v-else>
                <div><span class="text-gray-500">Schedule Type:</span> Alternating</div>
                <div><span class="text-gray-500">Week A:</span>
                  <span 
                    v-for="(enabled, day) in store.formData.classDaysA" 
                    :key="day"
                    :class="enabled ? 'text-blue-600 ml-1' : 'text-gray-400 ml-1'"
                  >
                    {{ day }}
                  </span>
                </div>
                <div><span class="text-gray-500">Week B:</span>
                  <span 
                    v-for="(enabled, day) in store.formData.classDaysB" 
                    :key="day"
                    :class="enabled ? 'text-blue-600 ml-1' : 'text-gray-400 ml-1'"
                  >
                    {{ day }}
                  </span>
                </div>
              </template>
            </div>
          </div>

          <!-- Standards -->
          <div class="space-y-2">
            <h5 class="text-xs font-semibold text-gray-700 border-b pb-1">Standards</h5>
            <div class="space-y-1 text-xs">
              <div><span class="text-gray-500">Type:</span> {{ store.formData.standards.type || 'Not set' }}</div>
              <div v-if="store.formData.standards.type === 'state'">
                <span class="text-gray-500">State:</span> {{ store.formData.standards.state || 'Not selected' }}
              </div>
            </div>
          </div>

          <!-- Focus Areas -->
          <div class="space-y-2">
            <h5 class="text-xs font-semibold text-gray-700 border-b pb-1">Focus Areas</h5>
            <div class="space-y-2 text-xs">
              <!-- Learning Focus -->
              <div>
                <div class="text-gray-500 mb-1">Learning Focus:</div>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="(enabled, focus) in store.formData.focusAreas" 
                    :key="focus"
                    :class="enabled ? 'text-blue-600' : 'text-gray-400'"
                  >
                    {{ formatFocusArea(focus) }}{{ enabled ? '' : ' (disabled)' }}
                  </span>
                </div>
              </div>
              
              <!-- Test Prep -->
              <div>
                <div class="text-gray-500 mb-1">Test Preparation:</div>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="(enabled, test) in store.formData.testPrep" 
                    :key="test"
                    :class="enabled ? 'text-blue-600' : 'text-gray-400'"
                  >
                    {{ test.toUpperCase() }}{{ enabled ? '' : ' (disabled)' }}
                  </span>
                </div>
              </div>

              <!-- Student Composition -->
              <div>
                <div class="text-gray-500 mb-1">Student Composition:</div>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="(enabled, type) in store.formData.studentComposition" 
                    :key="type"
                    :class="enabled ? 'text-blue-600' : 'text-gray-400'"
                  >
                    {{ type.toUpperCase() }}{{ enabled ? '' : ' (disabled)' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- HTTP Request Testing -->
          <div class="space-y-2 col-span-2">
            <h5 class="text-xs font-semibold text-gray-700 border-b pb-1">HTTP Request Testing</h5>
            <div class="flex items-center space-x-4">
              <button
                @click="handleTestRequest"
                :disabled="isGenerating"
                class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2 text-xs"
              >
                <span>Test API</span>
                <svg v-if="requestSuccess" class="w-4 h-4 text-white animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="debugError" class="text-red-500 text-xs">
                {{ debugError }}
              </div>
            </div>
            <div v-if="lastRequestData" class="mt-2">
              <div class="text-xs text-gray-500 mb-1">Last request data:</div>
              <pre class="text-xs p-2 bg-gray-200 rounded overflow-auto max-h-32">{{ lastRequestData }}</pre>
            </div>
            <div v-if="lastResponse" class="mt-2">
              <div class="text-xs text-gray-500 mb-1">Last response:</div>
              <pre class="text-xs p-2 bg-gray-200 rounded overflow-auto max-h-32">{{ lastResponse }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from '@/stores/store';
import { apiService } from '@/api/apiService';
import { createEmptyRequest } from '@/models/Request';

const store = useStore();
const isDebugVisible = ref(false);
const isGenerating = ref(false);
const requestSuccess = ref(false);
const debugError = ref(null);
const lastRequestData = ref(null);
const lastResponse = ref(null);

const toggleDebug = () => {
  // Save debug visibility state to localStorage
  localStorage.setItem('debugPanelVisible', isDebugVisible.value);
  // Enable/disable debug mode in store
  store.setDebugMode(isDebugVisible.value);
};

// Load debug visibility state from localStorage on mount
onMounted(() => {
  // Default to false, only enable if explicitly set to 'true' in localStorage
  const savedState = localStorage.getItem('debugPanelVisible');
  isDebugVisible.value = savedState === 'true';
  store.setDebugMode(isDebugVisible.value);
});

const formatDate = (dateString) => {
  if (!dateString) return 'Not set';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatFocusArea = (key) => {
  const labels = {
    collaborative: 'Collaborative Learning',
    presentations: 'Presentations',
    classDiscussions: 'Class Discussions',
    research: 'Research Skills'
  };
  return labels[key] || key;
};

const handleTestRequest = async () => {
  if (isGenerating.value) return;
  
  isGenerating.value = true;
  debugError.value = null;
  lastResponse.value = null;
  
  try {
    // Create test data using current form state
    const data = {
      // Basic Information
      subject: store.formData.subject,
      studentAgeRange: store.formData.studentAgeRange,
      numberOfStudents: store.formData.numberOfStudents,
      
      // Schedule Information
      startDate: store.formData.startDate,
      endDate: store.formData.endDate,
      lessonDuration: store.formData.lessonDuration,
      lessonFrequency: store.formData.lessonFrequency
    };
    
    const payload = createEmptyRequest();
    Object.assign(payload, data);
    lastRequestData.value = JSON.stringify(payload, null, 2);
    const response = await apiService.testRequest(data);
    lastResponse.value = JSON.stringify(response.data, null, 2);
    
    requestSuccess.value = true;
    setTimeout(() => {
      requestSuccess.value = false;
    }, 3000);
  } catch (err) {
    debugError.value = err.message;
    console.error('API test failed:', err);
  } finally {
    isGenerating.value = false;
  }
};

const debugInfo = (state) => ({
  currentStep: state.currentStep,
  hasAttemptedNext: state.hasAttemptedNext,
  canProceed: state.currentStep === 0 ? 
    !!(state.formData.studentAgeRange && 
       state.formData.numberOfStudents &&
       state.formData.startDate && 
       state.formData.endDate && 
       state.formData.lessonDuration &&
       state.formData.lessonFrequency) : true,
  studentAgeRange: state.formData.studentAgeRange,
  numberOfStudents: state.formData.numberOfStudents,
  startDate: formatDate(state.formData.startDate),
  endDate: formatDate(state.formData.endDate),
  lessonDuration: state.formData.lessonDuration + ' minutes',
  lessonFrequency: state.formData.lessonFrequency,
  holidays: state.formData.holidays.length + ' holidays'
});
</script>

<style scoped>
/* Custom scrollbar styles */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #EDF2F7;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #EDF2F7;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
  border: 2px solid #EDF2F7;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #A0AEC0;
}

/* Ensure sticky header works properly */
.sticky {
  position: sticky;
  background-color: #F9FAFB;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: -1rem;
  padding-top: 1rem;
}
</style> 
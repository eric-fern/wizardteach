<template>
  <div>
    <!-- Debug Toggle -->
    <div class="fixed bottom-4 right-4 z-[9999]">
      <label class="flex items-center cursor-pointer px-3 py-2 rounded-lg shadow-md transition-colors duration-200"
             :style="{
               backgroundColor: 'var(--bg-primary)',
               color: 'var(--text-primary)',
               borderColor: 'var(--border-color)',
               border: '1px solid var(--border-color)'
             }">
        <input
          type="checkbox"
          v-model="isDebugVisible"
          @change="toggleDebug"
          class="form-checkbox h-4 w-4 transition duration-150 ease-in-out"
          :style="{
            color: 'var(--primary-500)',
            borderColor: 'var(--border-color)'
          }"
        >
        <span class="ml-2 text-sm" style="color: var(--text-secondary);">Debug</span>
      </label>
    </div>

    <!-- Debug Content -->
    <div v-if="isDebugVisible" 
         class="fixed bottom-20 right-4 z-[9998] w-[600px] max-h-[80vh] rounded-lg shadow-xl flex flex-col"
         :style="{
           backgroundColor: 'var(--bg-primary)',
           borderColor: 'var(--border-color)',
           border: '1px solid var(--border-color)'
         }">
      <!-- Header -->
      <div class="p-4 border-b"
           :style="{
             backgroundColor: 'var(--bg-secondary)',
             borderColor: 'var(--border-color)'
           }">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <h4 class="text-sm font-medium" style="color: var(--text-primary);">Debug Panel</h4>
            <span class="text-xs" style="color: var(--primary-500);">(synced with Pinia store)</span>
          </div>
          <div class="flex items-center gap-2">
            <button @click="expandAll" 
                    class="text-xs transition-colors duration-200" 
                    style="color: var(--primary-500);">Expand All</button>
            <button @click="collapseAll" 
                    class="text-xs transition-colors duration-200" 
                    style="color: var(--primary-500);">Collapse All</button>
          </div>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-4">
        <div class="space-y-4">
          <!-- Navigation State -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h5 class="text-xs font-semibold" style="color: var(--text-primary);">Navigation</h5>
              <button @click="toggleSection('navigation')" 
                      class="text-xs transition-colors duration-200" 
                      style="color: var(--text-secondary);">
                {{ expandedSections.navigation ? 'Collapse' : 'Expand' }}
              </button>
            </div>
            <div v-if="expandedSections.navigation" class="pl-4">
              <div class="text-xs">
                <div class="flex items-center justify-between py-1">
                  <span style="color: var(--text-secondary);">Current Step:</span>
                  <span style="color: var(--text-primary);">{{ store.currentStep }} ({{ store.steps[store.currentStep] }})</span>
                </div>
                <div class="flex items-center justify-between py-1">
                  <span style="color: var(--text-secondary);">Total Steps:</span>
                  <span style="color: var(--text-primary);">{{ store.steps.length }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Data -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h5 class="text-xs font-semibold" style="color: var(--text-primary);">Form Data</h5>
              <button @click="toggleSection('formData')" 
                      class="text-xs transition-colors duration-200" 
                      style="color: var(--text-secondary);">
                {{ expandedSections.formData ? 'Collapse' : 'Expand' }}
              </button>
            </div>
            <div v-if="expandedSections.formData" class="pl-4">
              <StateTree 
                :data="filteredFormData" 
                :expanded="expandedPaths"
                @toggle="togglePath"
              />
            </div>
          </div>

          <!-- Validation Status -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h5 class="text-xs font-semibold" style="color: var(--text-primary);">Validation</h5>
              <button @click="toggleSection('validation')" 
                      class="text-xs transition-colors duration-200" 
                      style="color: var(--text-secondary);">
                {{ expandedSections.validation ? 'Collapse' : 'Expand' }}
              </button>
            </div>
            <div v-if="expandedSections.validation" class="pl-4">
              <div class="text-xs">
                <div class="flex items-center justify-between py-1">
                  <span style="color: var(--text-secondary);">Current Step Valid:</span>
                  <span :style="{
                    color: store.currentStepValidation.isValid ? 'var(--success-500)' : 'var(--error-500)'
                  }">
                    {{ store.currentStepValidation.isValid ? 'Yes' : 'No' }}
                  </span>
                </div>
                <div v-if="store.currentStepValidation.requiredFields.length > 0" class="mt-2">
                  <span style="color: var(--text-secondary);">Required Fields:</span>
                  <ul class="mt-1 list-disc list-inside">
                    <li v-for="field in store.currentStepValidation.requiredFields" 
                        :key="field" 
                        style="color: var(--text-primary);">
                      {{ field }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '@/stores/store';
import StateTree from './StateTree.vue';

// Store initialization
const store = useStore();

// UI State
const isDebugVisible = ref(false);
const expandedSections = ref({
  navigation: true,
  formData: true,
  validation: true
});
const expandedPaths = ref(new Set());

// Computed property to filter form data to only show what we use
const filteredFormData = computed(() => {
  const { formData } = store;
  return {
    // Basic Info
    subject: formData.subject,
    studentAgeRange: formData.studentAgeRange,
    lessonDuration: formData.lessonDuration,
    startDate: formData.startDate,
    endDate: formData.endDate,
    lessonFrequency: formData.lessonFrequency,
    numberOfStudents: formData.numberOfStudents,
    
    // Resource Availability
    resources: {
      hasDevices: formData.hasDevices,
      hasFieldTrips: formData.hasFieldTrips,
      hasProjector: formData.hasProjector,
      hasLab: formData.hasLab
    },
    
    // Standards
    standards: {
      selectedType: formData.standards.selectedType,
      state: formData.standards.state,
      customStandards: formData.standards.customStandards
    }
  };
});

// Toggle handlers
const toggleDebug = () => {
  localStorage.setItem('debugPanelVisible', isDebugVisible.value);
  store.setDebugMode(isDebugVisible.value);
};

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section];
};

const togglePath = (path) => {
  if (expandedPaths.value.has(path)) {
    expandedPaths.value.delete(path);
  } else {
    expandedPaths.value.add(path);
  }
};

const expandAll = () => {
  Object.keys(expandedSections.value).forEach(key => {
    expandedSections.value[key] = true;
  });
  // Expand all state paths
  const expandAllPaths = (obj, parentPath = '') => {
    if (typeof obj !== 'object' || obj === null) return;
    Object.keys(obj).forEach(key => {
      const path = parentPath ? `${parentPath}.${key}` : key;
      expandedPaths.value.add(path);
      expandAllPaths(obj[key], path);
    });
  };
  expandAllPaths(filteredFormData.value);
};

const collapseAll = () => {
  Object.keys(expandedSections.value).forEach(key => {
    expandedSections.value[key] = false;
  });
  expandedPaths.value.clear();
};

// Initialize on mount
onMounted(() => {
  const savedState = localStorage.getItem('debugPanelVisible');
  isDebugVisible.value = savedState === 'true';
  store.setDebugMode(isDebugVisible.value);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 
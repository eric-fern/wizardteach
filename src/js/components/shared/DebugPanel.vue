/**
 * DebugPanel Component
 * 
 * A development tool that provides real-time visibility into the application state.
 * Features:
 * - Collapsible sections for navigation, form data, and validation
 * - Persistent visibility state through localStorage
 * - Forced store updates to ensure consistent state display
 * - Theme-consistent styling with CSS variables
 */
<template>
  <div>
    <!-- Debug Toggle -->
    <div class="fixed bottom-4 right-4 z-[9999]">
      <label class="flex items-center cursor-pointer px-3 py-2 rounded-lg transition-colors"
             :style="{
               backgroundColor: 'var(--bg-primary)',
               color: 'var(--text-primary)',
               borderColor: 'var(--border-color)',
               border: '1px solid var(--border-color)',
               boxShadow: 'var(--shadow-md)',
               transition: 'var(--transition-default)'
             }">
        <input
          type="checkbox"
          v-model="isDebugVisible"
          @change="toggleDebug"
          class="form-checkbox h-4 w-4"
          :style="{
            color: 'var(--primary-500)',
            borderColor: 'var(--border-color)',
            transition: 'var(--transition-fast)'
          }"
        >
        <span class="ml-2 text-sm" style="color: var(--text-secondary);">Debug</span>
      </label>
    </div>

    <!-- Debug Content -->
    <div v-if="isDebugVisible" 
         class="fixed bottom-20 right-4 z-[9998] w-[600px] max-h-[80vh] flex flex-col animate-fade-in"
         :style="{
           backgroundColor: 'var(--bg-primary)',
           borderColor: 'var(--border-color)',
           border: '1px solid var(--border-color)',
           boxShadow: 'var(--shadow-xl)',
           borderRadius: 'var(--radius-lg)',
           transition: 'var(--transition-default)'
         }">
      <!-- Header -->
      <div class="p-4 border-b"
           :style="{
             backgroundColor: 'var(--bg-secondary)',
             borderColor: 'var(--border-color)',
             borderTopLeftRadius: 'var(--radius-lg)',
             borderTopRightRadius: 'var(--radius-lg)'
           }">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <h4 class="text-sm font-medium" style="color: var(--text-primary);">Debug Panel</h4>
            <span class="text-xs px-2 py-1 rounded"
                  :style="{
                    backgroundColor: 'var(--primary-500/0.1)',
                    color: 'var(--primary-500)'
                  }">(synced with our single source of truth - the Pinia store)</span>
          </div>
          <div class="flex items-center gap-2">
            <button @click="expandAll" 
                    class="text-xs px-2 py-1 rounded transition-colors hover-effect" 
                    :style="{
                      color: 'var(--primary-500)',
                      transition: 'var(--transition-fast)'
                    }">Expand All</button>
            <button @click="collapseAll" 
                    class="text-xs px-2 py-1 rounded transition-colors hover-effect" 
                    :style="{
                      color: 'var(--primary-500)',
                      transition: 'var(--transition-fast)'
                    }">Collapse All</button>
          </div>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div class="space-y-4">
          <!-- Navigation State -->
          <div class="space-y-2 section-card">
            <div class="flex items-center justify-between">
              <h5 class="text-xs font-semibold" style="color: var(--text-primary);">Navigation</h5>
              <button @click="toggleSection('navigation')" 
                      class="text-xs px-2 py-1 rounded transition-colors hover-effect" 
                      :style="{
                        color: 'var(--text-secondary)',
                        transition: 'var(--transition-fast)'
                      }">
                {{ expandedSections.navigation ? 'Collapse' : 'Expand' }}
              </button>
            </div>
            <div v-if="expandedSections.navigation" 
                 class="pl-4 animate-slide-down">
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
          <div class="space-y-2 section-card">
            <div class="flex items-center justify-between">
              <h5 class="text-xs font-semibold" style="color: var(--text-primary);">Form Data</h5>
              <button @click="toggleSection('formData')" 
                      class="text-xs px-2 py-1 rounded transition-colors hover-effect" 
                      :style="{
                        color: 'var(--text-secondary)',
                        transition: 'var(--transition-fast)'
                      }">
                {{ expandedSections.formData ? 'Collapse' : 'Expand' }}
              </button>
            </div>
            <div v-if="expandedSections.formData" 
                 class="pl-4 animate-slide-down">
              <div class="space-y-3">
                <!-- Basic Info Section -->
                <div class="space-y-2">
                  <span class="text-xs" style="color: var(--text-secondary);">Basic Info:</span>
                  <div class="space-y-1">
                    <div v-for="(value, key) in filteredFormData" 
                         :key="key"
                         v-if="!['resources', 'standards'].includes(key)"
                         class="flex items-center justify-between py-1 px-2 rounded text-xs"
                         :style="{
                           backgroundColor: 'var(--bg-secondary)',
                           transition: 'var(--transition-fast)'
                         }">
                      <span style="color: var(--text-secondary);">{{ key }}:</span>
                      <span :style="{
                        color: value ? 'var(--text-primary)' : 'var(--error-500)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: value ? 'var(--primary-500/0.1)' : 'var(--error-500/0.1)'
                      }">
                        {{ value || 'Not Set' }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Resources Section -->
                <div class="space-y-2">
                  <span class="text-xs" style="color: var(--text-secondary);">Resources:</span>
                  <div class="space-y-1">
                    <div v-for="(value, key) in filteredFormData.resources" 
                         :key="key"
                         class="flex items-center justify-between py-1 px-2 rounded text-xs"
                         :style="{
                           backgroundColor: 'var(--bg-secondary)',
                           transition: 'var(--transition-fast)'
                         }">
                      <span style="color: var(--text-secondary);">{{ key }}:</span>
                      <span :style="{
                        color: value ? 'var(--success-500)' : 'var(--text-secondary)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: value ? 'var(--success-500/0.1)' : 'var(--bg-primary)'
                      }">
                        {{ value ? 'Available' : 'Not Available' }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Standards Section -->
                <div class="space-y-2">
                  <span class="text-xs" style="color: var(--text-secondary);">Standards:</span>
                  <div class="space-y-1">
                    <div v-for="(value, key) in filteredFormData.standards" 
                         :key="key"
                         class="flex items-center justify-between py-1 px-2 rounded text-xs"
                         :style="{
                           backgroundColor: 'var(--bg-secondary)',
                           transition: 'var(--transition-fast)'
                         }">
                      <span style="color: var(--text-secondary);">{{ key }}:</span>
                      <span :style="{
                        color: value ? 'var(--text-primary)' : 'var(--error-500)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: value ? 'var(--primary-500/0.1)' : 'var(--error-500/0.1)'
                      }">
                        {{ value || 'Not Set' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Validation Status -->
          <div class="space-y-2 section-card">
            <div class="flex items-center justify-between">
              <h5 class="text-xs font-semibold" style="color: var(--text-primary);">Validation</h5>
              <button @click="toggleSection('validation')" 
                      class="text-xs px-2 py-1 rounded transition-colors hover-effect" 
                      :style="{
                        color: 'var(--text-secondary)',
                        transition: 'var(--transition-fast)'
                      }">
                {{ expandedSections.validation ? 'Collapse' : 'Expand' }}
              </button>
            </div>
            <div v-if="expandedSections.validation" 
                 class="pl-4 animate-slide-down">
              <div class="text-xs">
                <div class="flex items-center justify-between py-1">
                  <span style="color: var(--text-secondary);">Current Step Valid:</span>
                  <span :style="{
                    color: store.currentStepValidation.isValid ? 'var(--success-500)' : 'var(--error-500)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: store.currentStepValidation.isValid ? 'var(--success-500/0.1)' : 'var(--error-500/0.1)'
                  }">
                    {{ store.currentStepValidation.isValid ? 'Yes' : 'No' }}
                  </span>
                </div>
                <div v-if="store.currentStepValidation.requiredFields.length > 0" class="mt-2">
                  <span style="color: var(--text-secondary);">Required Fields:</span>
                  <ul class="mt-1 list-disc list-inside">
                    <li v-for="field in store.currentStepValidation.requiredFields" 
                        :key="field" 
                        class="py-1 px-2 my-1 rounded"
                        :style="{
                          color: 'var(--text-primary)',
                          backgroundColor: 'var(--bg-secondary)'
                        }">
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
  navigation: false,
  formData: false,
  validation: false
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
  
  // Force a re-render of the debug state
  store.updateDebugState();
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
  
  // Initial debug state update
  store.updateDebugState();
});
</script>

<style scoped>
.hover-effect:hover {
  background-color: var(--bg-secondary);
}

.section-card {
  padding: 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  transition: var(--transition-default);
}

.section-card:hover {
  border-color: var(--primary-500);
}

.animate-fade-in {
  animation: fadeIn var(--duration-default) var(--easing-default);
}

.animate-slide-down {
  animation: slideDown var(--duration-default) var(--easing-default);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom Scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-200) var(--bg-secondary);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--primary-200);
  border-radius: var(--radius-full);
}
</style> 
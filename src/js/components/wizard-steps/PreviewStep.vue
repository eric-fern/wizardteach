<template>
  <div class="space-y-8">
    <div class="text-center animate-fade-in">
      <h3 class="text-3xl font-extrabold text-gray-900 animate-slide-up" style="animation-delay: 100ms">
        Preview Your Curriculum
      </h3>
      <p class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 200ms">
        Review and customize your generated curriculum
      </p>
    </div>

    <div class="max-w-4xl mx-auto mt-12">
      <div v-if="loading" class="text-center py-12 animate-fade-in">
        <div class="w-20 h-20 mx-auto mb-6">
          <svg class="animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900">Generating your curriculum...</p>
        <p class="mt-2 text-gray-500">This may take a few moments</p>
      </div>

      <div v-else-if="error" class="text-center py-12 animate-fade-in">
        <div class="w-20 h-20 mx-auto mb-6 text-error-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900">Something went wrong</p>
        <p class="mt-2 text-gray-500">{{ error }}</p>
        <button 
          class="mt-6 btn btn-primary"
          @click="$emit('retry')"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="previewData" class="space-y-8 animate-fade-in">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-xl font-bold text-gray-900">Curriculum Overview</h4>
                <p class="mt-1 text-sm text-gray-500">
                  {{ previewData.overview.duration }} • {{ previewData.overview.unitsCount }} Units
                </p>
              </div>
              <div class="flex items-center space-x-4">
                <button class="btn btn-secondary">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
                <button class="btn btn-primary">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>

            <div class="mt-6 border-t pt-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 class="text-sm font-medium text-gray-500 uppercase">Standards Framework</h5>
                  <p class="mt-2 text-gray-900">{{ previewData.standards.framework }}</p>
                  <div class="mt-1 flex items-center">
                    <span class="text-sm text-success-500">{{ previewData.standards.coverage }} Coverage</span>
                    <svg class="w-4 h-4 ml-1 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h5 class="text-sm font-medium text-gray-500 uppercase">Assessment Types</h5>
                  <div class="mt-2 space-y-1">
                    <p v-for="assessment in previewData.assessments.formative" :key="assessment" class="text-gray-900">
                      • {{ assessment }}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 class="text-sm font-medium text-gray-500 uppercase">Included Materials</h5>
                  <div class="mt-2 space-y-1">
                    <p v-for="(unit, index) in previewData.units" :key="index" class="text-gray-900">
                      • {{ unit.title }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="p-6">
            <h4 class="text-xl font-bold text-gray-900 mb-6">Units Overview</h4>
            
            <div class="space-y-6">
              <div 
                v-for="(unit, index) in previewData.units" 
                :key="index"
                class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <h5 class="font-semibold text-gray-900">{{ unit.title }}</h5>
                    <p class="mt-1 text-sm text-gray-500">{{ unit.duration }}</p>
                  </div>
                  <button class="text-primary-500 hover:text-primary-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div class="mt-4 space-y-2">
                  <p v-for="topic in unit.topics" :key="topic" class="text-sm text-gray-600">
                    • {{ topic }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="previewData"
      class="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 animate-fade-in"
      style="animation-delay: 800ms"
    >
      <div class="flex items-start space-x-6">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
        <div>
          <h4 class="text-xl font-bold text-gray-900">Ready to Transform Your Teaching</h4>
          <p class="mt-2 text-gray-600 leading-relaxed">
            Your curriculum is ready! Download now or make final adjustments. 
            <span class="font-semibold text-primary-600">98% of teachers</span> report saving 5+ hours per week using our materials.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  previewData: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['retry']);
</script> 
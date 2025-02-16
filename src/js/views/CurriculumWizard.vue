<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Main Content -->
    <div class="max-w-3xl mx-auto">
      <!-- Selection Tags -->
      <div class="mb-8 border-2 border-dashed border-blue-300 rounded-xl p-4 bg-blue-50/50">
        <div class="flex flex-wrap gap-2">
          <!-- Subject Tag -->
          <div v-if="formData.subject" 
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
          >
            <span>Subject: {{ formData.subject }}</span>
          </div>

          <!-- Standards Tags -->
          <template v-if="formData.standards.type">
            <!-- State Standards -->
            <div v-if="formData.standards.type === 'state' && formData.standards.state" 
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
            >
              <span>{{ getStateName(formData.standards.state) }} State Standards</span>
            </div>
            <!-- Common Core -->
            <div v-if="formData.standards.type === 'common-core'" 
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
            >
              <span>Common Core Standards</span>
            </div>
            <!-- AP -->
            <div v-if="formData.standards.type === 'ap'" 
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
            >
              <span>Advanced Placement Standards</span>
            </div>
            <!-- IB -->
            <div v-if="formData.standards.type === 'ib'" 
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
            >
              <span>International Baccalaureate Standards</span>
            </div>
          </template>

          <!-- Grade Level Tag -->
          <div v-if="formData.studentAgeRange" 
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
          >
            <span>Age: {{ getGradeLevelLabel(formData.studentAgeRange) }}</span>
          </div>

          <!-- Number of Students Tag -->
          <div v-if="formData.numberOfStudents" 
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
          >
            <span>{{ formData.numberOfStudents }} Students</span>
          </div>

          <!-- Course Duration Tags -->
          <template v-if="formData.startDate && formData.endDate">
            <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              <span>{{ formatDate(formData.startDate) }} to {{ formatDate(formData.endDate) }}</span>
            </div>
            <div v-if="formData.funFridays" 
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700"
            >
              <span>Fun Friday Lessons 🎉</span>
            </div>
          </template>

          <!-- Class Schedule Tags -->
          <template v-if="formData.lessonDuration">
            <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              <span>{{ formatDuration(formData.lessonDuration) }} per class</span>
            </div>
          </template>

          <!-- Focus Area Tags -->
          <template v-if="getSelectedFocusAreas.length > 0">
            <div 
              v-for="focus in getSelectedFocusAreas" 
              :key="focus"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700"
            >
              <span>{{ focus }}</span>
            </div>
          </template>

          <!-- Test Prep Tags -->
          <template v-if="getSelectedTestPrep.length > 0">
            <div 
              v-for="prep in getSelectedTestPrep" 
              :key="prep"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700"
            >
              <span>{{ prep }}</span>
            </div>
          </template>

          <!-- Accommodation Tags -->
          <template v-if="getSelectedAccommodations.length > 0">
            <div 
              v-for="accommodation in getSelectedAccommodations" 
              :key="accommodation"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700"
            >
              <span>{{ accommodation }}</span>
          </div>
          </template>
        </div>
      </div>

      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="flex items-center"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center border-2"
              :class="{
                'border-blue-500 bg-blue-500 text-white': currentStep > index,
                'border-blue-500 bg-white text-blue-500': currentStep === index,
                'border-gray-300 bg-white text-gray-500': currentStep < index
              }"
            >
              {{ index + 1 }}
            </div>
            <div 
              v-if="index < steps.length - 1"
              class="flex-1 h-0.5 mx-4"
              :class="{
                'bg-blue-500': currentStep > index,
                'bg-gray-300': currentStep <= index
              }"
            ></div>
          </div>
        </div>
        <div class="flex justify-between mt-2">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="text-sm font-medium"
            :class="{
              'text-blue-500': currentStep >= index,
              'text-gray-500': currentStep < index
            }"
          >
            {{ step }}
          </div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <!-- Step 1: Course Details -->
        <CourseDetails 
          v-if="currentStep === 0"
        />

        <!-- Step 2: Standards -->
        <div v-if="currentStep === 1">
          <div class="space-y-6">
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-4">Curriculum Standards</h2>
              
              <!-- Standards Type Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-4">Select Standards Type</label>
                <div class="space-y-2">
                  <!-- National Standards -->
                  <div class="mb-4">
                    <h3 class="text-sm font-medium text-gray-700 mb-2">National & International Standards</h3>
                    <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="radio" 
                        v-model="formData.standards.type"
                        value="common-core"
                        class="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                      >
                      <div class="ml-3">
                        <span class="text-sm font-medium text-gray-900">Common Core Standards</span>
                        <p class="text-sm text-gray-500">Nationally recognized K-12 academic standards</p>
                      </div>
                    </label>

                    <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer mt-2">
                      <input 
                        type="radio" 
                        v-model="formData.standards.type"
                        value="ap"
                        @change="handleAPorIBSelection"
                        class="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                      >
                      <div class="ml-3">
                        <span class="text-sm font-medium text-gray-900">Advanced Placement (AP)</span>
                        <p class="text-sm text-gray-500">College Board AP curriculum standards for college-level courses</p>
                      </div>
                    </label>

                    <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer mt-2">
                      <input 
                        type="radio" 
                        v-model="formData.standards.type"
                        value="ib"
                        @change="handleAPorIBSelection"
                        class="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                      >
                      <div class="ml-3">
                        <span class="text-sm font-medium text-gray-900">International Baccalaureate (IB)</span>
                        <p class="text-sm text-gray-500">International education framework and standards</p>
                      </div>
                    </label>
                  </div>

                  <!-- State Standards -->
                  <div class="pt-4 border-t">
                    <h3 class="text-sm font-medium text-gray-700 mb-2">State-Specific Standards</h3>
                    <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="radio" 
                        v-model="formData.standards.type"
                        value="state"
                        class="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                      >
                      <div class="ml-3">
                        <span class="text-sm font-medium text-gray-900">State Standards</span>
                        <p class="text-sm text-gray-500">Standards specific to your state's requirements</p>
                      </div>
                    </label>

                    <!-- State Selection (only shown when state standards are selected) -->
                    <div v-if="formData.standards.type === 'state'" 
                      class="mt-3 ml-7 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <label class="block text-sm font-medium text-gray-700 mb-2">Select Your State</label>
                      <select 
                        v-model="formData.standards.state"
                        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                      >
                        <option value="">Choose a state</option>
                        <option v-for="state in states" :key="state.code" :value="state.code">
                          {{ state.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Student Accommodations -->
              <div class="mb-6 pt-4 border-t">
                <h3 class="text-sm font-medium text-gray-700 mb-4">Student Accommodations</h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex space-x-6">
                    <label class="inline-flex items-center group relative">
                      <input 
                        type="checkbox" 
                        v-model="formData.studentComposition.esl"
                        class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">ESL</span>
                      <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                        English as Second Language learners - Materials will include language support
                      </div>
                    </label>
                    <label class="inline-flex items-center group relative">
                      <input 
                        type="checkbox" 
                        v-model="formData.studentComposition.iep"
                        class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">IEP</span>
                      <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                        Individualized Education Program - Includes modified content and accommodations
                      </div>
                    </label>
                    <label class="inline-flex items-center group relative">
                      <input 
                        type="checkbox" 
                        v-model="formData.studentComposition.gifted"
                        class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">Gifted</span>
                      <button class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <div class="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                        Advanced learners - Includes enrichment and challenging content
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Test Prep -->
              <div class="mb-6 pt-4 border-t">
                <h3 class="text-sm font-medium text-gray-700 mb-4">Test Preparation Focus</h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="grid grid-cols-2 gap-4">
                    <label class="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        v-model="formData.testPrep.ap"
                        :disabled="formData.standards.type === 'ap'"
                        class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">AP Exam Prep</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        v-model="formData.testPrep.ib"
                        :disabled="formData.standards.type === 'ib'"
                        class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">IB Exam Prep</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        v-model="formData.testPrep.sat"
                        class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">SAT Prep</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        v-model="formData.testPrep.act"
                        class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">ACT Prep</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Standards Preview -->
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-sm font-medium text-gray-900">Selected Standards Preview</h3>
                  <span class="text-xs text-gray-500">Full standards list will be included in generated materials</span>
                </div>
                <div class="space-y-2">
                  <div v-if="formData.standards.type" class="p-3 bg-white rounded-lg border border-gray-200">
                    <div class="text-sm text-gray-900">
                      {{ getStandardsTypeLabel(formData.standards.type) }}
                      <span v-if="formData.standards.type === 'state' && formData.standards.state" class="ml-2 text-gray-500">
                        - {{ getStateName(formData.standards.state) }}
                      </span>
                    </div>
                    <div class="mt-2 text-xs text-gray-500">
                      All materials will be aligned with {{ getStandardsTypeLabel(formData.standards.type) }}
                      {{ formData.standards.type === 'state' && formData.standards.state ? 'for ' + getStateName(formData.standards.state) : '' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Review -->
        <div v-if="currentStep === 2">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Review Your Selections</h2>
          <div class="space-y-4">
            <div class="p-4 bg-gray-50 rounded-lg">
              <div class="font-medium text-gray-700">Subject</div>
              <div class="mt-1 text-lg">{{ formData.subject }}</div>
            </div>
            <div class="p-4 bg-gray-50 rounded-lg">
              <div class="font-medium text-gray-700">Grade Level</div>
              <div class="mt-1 text-lg">{{ getGradeLevelLabel(formData.studentAgeRange) }}</div>
            </div>
            <div class="p-4 bg-gray-50 rounded-lg">
              <div class="font-medium text-gray-700">Course Duration</div>
              <div class="mt-1 text-lg">
                {{ formatDate(formData.startDate) }} - {{ formatDate(formData.endDate) }}
                <br>
                <span class="text-sm text-gray-600">
                  {{ formatDuration(formData.lessonDuration) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-6">
        <button 
          v-if="currentStep > 0"
          @click="store.prevStep()"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>
        <div class="flex-1"></div>
        <button 
          v-if="currentStep < steps.length - 1"
          @click="store.nextStep()"
          :disabled="!store.canProceed"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg',
            store.isDebugMode || store.canProceed 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '../stores/store';
import CourseDetails from './onboardwizard/CourseDetails.vue';
import BaseWizardStep from './onboardwizard/BaseWizardStep.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();
const steps = ['Course Details', 'Standards', 'Review'];
const currentStep = computed(() => store.currentStep);
const formData = computed(() => store.formData);
const hasAttemptedNext = ref(false);

const isAddingHoliday = ref(false);
const newHoliday = ref({
  title: '',
  startDate: '',
  endDate: ''
});

// Set initial subject from URL query
onMounted(() => {
  if (route.query.subject) {
    store.setSubject(route.query.subject);
  } else {
    // If no subject is provided, go back to home
    router.push('/');
  }
});

const ageOptions = [
  { value: '6-7', label: '6-7 years' },
  { value: '8-9', label: '8-9 years' },
  { value: '10-11', label: '10-11 years' },
  { value: '12-13', label: '12-13 years' },
  { value: '14-15', label: '14-15 years' },
  { value: '16-17', label: '16-17 years' },
  { value: '17-18', label: '17-18 years' },
  { value: 'college', label: 'College/Professionals' }
];

const states = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0:
      console.log('Validating step 0:', {
        studentAgeRange: formData.value.studentAgeRange,
        numberOfStudents: formData.value.numberOfStudents,
        startDate: formData.value.startDate,
        endDate: formData.value.endDate,
        lessonDuration: formData.value.lessonDuration,
        hasAlternatingSchedule: formData.value.hasAlternatingSchedule,
        classDays: formData.value.classDays,
        classDaysA: formData.value.classDaysA,
        classDaysB: formData.value.classDaysB
      });

      // Check if at least one class day is selected
      const hasRegularClassDays = !formData.value.hasAlternatingSchedule && 
        Object.values(formData.value.classDays).some(day => day);
      
      const hasAlternatingClassDays = formData.value.hasAlternatingSchedule && 
        Object.values(formData.value.classDaysA).some(day => day) &&
        Object.values(formData.value.classDaysB).some(day => day);

      return (
        formData.value.studentAgeRange !== '' &&
        formData.value.numberOfStudents !== '' &&
        formData.value.startDate !== '' &&
        formData.value.endDate !== '' &&
        formData.value.lessonDuration !== '' &&
        (hasRegularClassDays || hasAlternatingClassDays)
      );
    case 1:
      console.log('Validating step 1:', {
        standardsType: formData.value.standards.type,
        standardsState: formData.value.standards.state
      });
      return (
        formData.value.standards.type !== '' &&
        (formData.value.standards.type !== 'state' || formData.value.standards.state !== '')
      );
    default:
      return true;
  }
});

const getGradeLevelLabel = (value) => {
  const age = ageOptions.find(a => a.value === value);
  return age ? age.label : value;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const handleNext = () => {
  console.log('Button clicked!');
  
  console.log('handleNext called', {
    currentStep: currentStep.value,
    canProceed: store.canProceed,
    formData: {
      studentAgeRange: formData.value.studentAgeRange,
      startDate: formData.value.startDate,
      endDate: formData.value.endDate,
      lessonDuration: formData.value.lessonDuration
    }
  });

  hasAttemptedNext.value = true;
  
  if (store.canProceed) {
    store.nextStep();
    hasAttemptedNext.value = false;
    console.log('Step advanced to:', store.currentStep);
  } else {
    console.log('Cannot proceed, validation failed');
  }
};

const handleBack = () => {
  if (currentStep.value === 0) {
    router.push('/');
  } else {
    store.prevStep();
  }
};

const handleGenerate = () => {
  const curriculumData = store.prepareCurriculumData();
  console.log('Generating curriculum with:', curriculumData);
  router.push('/');
};

const getSelectedFocusAreas = computed(() => {
  const areas = [];
  if (formData.value.focusAreas.collaborative) areas.push('Collaborative Learning');
  if (formData.value.focusAreas.presentations) areas.push('Presentations');
  if (formData.value.focusAreas.classDiscussions) areas.push('Class Discussions');
  if (formData.value.focusAreas.research) areas.push('Research Skills');
  return areas;
});

const getSelectedTestPrep = computed(() => {
  const preps = [];
  if (formData.value.testPrep.ap) preps.push('AP Exam Prep');
  if (formData.value.testPrep.ib) preps.push('IB Exam Prep');
  if (formData.value.testPrep.sat) preps.push('SAT Prep');
  if (formData.value.testPrep.act) preps.push('ACT Prep');
  return preps;
});

const getSelectedAccommodations = computed(() => {
  const accommodations = [];
  if (formData.value.studentComposition.esl) accommodations.push('ESL');
  if (formData.value.studentComposition.iep) accommodations.push('IEP');
  if (formData.value.studentComposition.gifted) accommodations.push('Gifted');
  return accommodations;
});

const canAddHoliday = computed(() => {
  return newHoliday.value.title &&
         newHoliday.value.startDate &&
         newHoliday.value.endDate;
});

const addHoliday = () => {
  if (canAddHoliday.value && formData.value.holidays.length < 10) {
    formData.value.holidays.push({...newHoliday.value});
    newHoliday.value = { title: '', startDate: '', endDate: '' };
    isAddingHoliday.value = false;
  }
};

const removeHoliday = (index) => {
  formData.value.holidays.splice(index, 1);
};

const getStandardsTypeLabel = (type) => {
  const labels = {
    'common-core': 'Common Core Standards',
    'state': 'State Standards',
    'ib': 'International Baccalaureate',
    'ap': 'Advanced Placement'
  };
  return labels[type] || type;
};

const getStateName = (code) => {
  const state = states.find(s => s.code === code);
  return state ? state.name : code;
};

// Add these watches after the other watches
watch(() => formData.value.studentAgeRange, (newVal) => {
  console.log('studentAgeRange changed:', newVal);
});

watch(() => hasAttemptedNext.value, (newVal, oldVal) => {
  console.log('hasAttemptedNext changed:', {
    old: oldVal,
    new: newVal,
    studentAgeRange: formData.value.studentAgeRange,
    currentStep: currentStep.value
  });
});

// Add formatDuration function in script section
const formatDuration = (minutes) => {
  const durations = {
    '30': '30 minutes',
    '45': '45 minutes',
    '60': '1 hour',
    '90': '1.5 hours',
    '120': '2 hours',
    '180': '3 hours',
    '360': 'Half day',
    '480': 'Full day'
  };
  return durations[minutes] || `${minutes} minutes`;
};

const handleAPorIBSelection = () => {
  // Implementation of handleAPorIBSelection
};

// Add this after the other watch statements in the script section
watch(() => formData.value.hasAlternatingSchedule, (newVal) => {
  if (newVal) {
    // Clear all standard class days when alternating schedule is enabled
    Object.keys(formData.value.classDays).forEach(day => {
      formData.value.classDays[day] = false;
    });
  }
});
</script> 

<style>
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
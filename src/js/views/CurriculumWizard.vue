<template>
  <div class="min-h-screen p-8" style="background-color: var(--bg-secondary);">
    <!-- AI Assistant Banner -->
    <div class="mb-8 rounded-xl p-4 border-2 border-dashed" 
         style="background-color: var(--primary-50); border-color: var(--primary-300);">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <span 
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            style="background-color: var(--primary-100); color: var(--primary-700);"
          >
            AI-Powered ✨
          </span>
          <p style="color: var(--primary-700);">
            Our AI assistant will help you create a comprehensive curriculum
          </p>
        </div>
      </div>
    </div>

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
        <div class="flex items-center">
          <div v-for="(step, index) in steps" :key="step.id" class="flex items-center">
            <!-- Step Circle -->
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-200"
              :class="{
                'cursor-pointer': currentStep >= index
              }"
              :style="{
                backgroundColor: getStepStyle(index).bg,
                borderColor: getStepStyle(index).border,
                color: getStepStyle(index).text
              }"
              @click="currentStep >= index && goToStep(index)"
            >
              {{ index + 1 }}
            </div>

            <!-- Connector Line -->
            <div
              v-if="index < steps.length - 1"
              class="w-24 h-1 mx-2 rounded transition-colors duration-200"
              :style="{
                backgroundColor: currentStep > index ? 'var(--primary-500)' : 'var(--border-color)'
              }"
            ></div>
          </div>
        </div>

        <!-- Step Labels -->
        <div class="flex items-center mt-2">
          <div v-for="(step, index) in steps" :key="step.id" class="flex items-center">
            <div
              class="w-8 text-center text-sm font-medium transition-colors duration-200"
              :style="{
                color: currentStep >= index ? 'var(--primary-500)' : 'var(--text-secondary)'
              }"
            >
              {{ step.label }}
            </div>
            <div v-if="index < steps.length - 1" class="w-24 mx-2"></div>
          </div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="rounded-lg shadow-sm p-6" style="background-color: var(--bg-primary);">
        <component :is="currentStepComponent" @next="nextStep" @prev="prevStep" />
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between mt-6">
      <button 
        v-if="currentStep > 0"
        @click="prevStep"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Previous
      </button>
      <div class="flex-1"></div>
      <button 
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
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
const steps = [
  { id: 1, label: 'Start', component: 'OnboardEntry' },
  { id: 2, label: 'Details', component: 'CourseDetails' },
  { id: 3, label: 'Standards', component: 'ChooseStandards' },
  { id: 4, label: 'Questions', component: 'Wizard10Questions' },
  { id: 5, label: 'Create', component: 'GenerateCurriculum' }
];
const currentStep = ref(0);
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

const currentStepComponent = computed(() => {
  return steps[currentStep.value].component
})

const getStepStyle = (index) => {
  if (currentStep.value > index) {
    return {
      bg: 'var(--primary-500)',
      border: 'var(--primary-500)',
      text: '#ffffff'
    }
  } else if (currentStep.value === index) {
    return {
      bg: 'var(--bg-primary)',
      border: 'var(--primary-500)',
      text: 'var(--primary-500)'
    }
  } else {
    return {
      bg: 'var(--bg-primary)',
      border: 'var(--border-color)',
      text: 'var(--text-secondary)'
    }
  }
}

const goToStep = (index) => {
  if (currentStep.value >= index) {
    currentStep.value = index
    router.push(getStepRoute(index))
  }
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    router.push(getStepRoute(currentStep.value))
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    router.push(getStepRoute(currentStep.value))
  }
}

const getStepRoute = (index) => {
  switch (index) {
    case 0:
      return '/onboard'
    case 1:
      return '/onboard/course-details'
    case 2:
      return '/onboard/standards'
    case 3:
      return '/onboard/questions'
    case 4:
      return '/create'
    default:
      return '/onboard'
  }
}
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
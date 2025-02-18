import { defineStore } from 'pinia';
import router from '../router';  // Direct import instead of useRouter hook

/**
 * Main application store
 * 
 * Handles:
 * - Wizard navigation state
 * - Form data management
 * - Debug mode and validation
 * - Reference data for dropdowns/labels
 */
export const useStore = defineStore('store', {
  state: () => ({
    // UI State Management
    currentStep: 0,  // Tracks current position in wizard flow
    
    /**
     * Wizard Flow Steps
     * 0: Entry - Initial subject selection
     * 1: Course Details - Age range, duration, dates
     * 2: Standards - Educational standards selection
     * 3: Review - Final review before generation
     */
    steps: ['Entry', 'Course Details', 'Standards', 'Review'],
    
    isDebugMode: false,  // Controls debug panel visibility
    
    // Form Data Management
    formData: {
      // Basic Info
      subject: '',
      studentAgeRange: '',
      lessonDuration: '',
      startDate: '',
      endDate: '',
      
      // Standards & Requirements
      standards: {
        type: '', // 'common-core', 'state', 'ib', 'ap'
        state: '', // if type is 'state'
      },

      // Student Composition
      studentComposition: {
        esl: false,
        iep: false,
        gifted: false
      },

      // Test Prep
      testPrep: {
        ap: false,
        ib: false,
        sat: false,
        act: false
      }
    },

    // Reference Data (needed for dropdowns/labels)
    ageOptions: [
      { value: '6-7', label: '6-7 years' },
      { value: '8-9', label: '8-9 years' },
      { value: '10-11', label: '10-11 years' },
      { value: '12-13', label: '12-13 years' },
      { value: '14-15', label: '14-15 years' },
      { value: '16-17', label: '16-17 years' },
      { value: '17-18', label: '17-18 years' },
      { value: 'college', label: 'College/Professionals' }
    ],
    
    durations: {
      '15': '15 minutes',
      '30': '30 minutes',
      '45': '45 minutes',
      '60': '1 hour',
      '75': '1 hour 15 minutes',
      '90': '1 hour 30 minutes',
      '105': '1 hour 45 minutes',
      '120': '2 hours',
      '240': '4 hours'
    },

    states: [
      { code: 'AL', name: 'Alabama' },
      { code: 'AK', name: 'Alaska' },
      // ... rest of states
    ],
    
    standardsTypes: {
      'common-core': 'Common Core Standards',
      'state': 'State Standards',
      'ib': 'International Baccalaureate',
      'ap': 'Advanced Placement'
    }
  }),

  getters: {
    /**
     * Computes the status of all form fields for debugging
     * Returns an object with field values and completion status
     */
    formFieldStatus: (state) => {
      const status = {};
      
      Object.entries(state.formData).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          status[key] = Object.entries(value).reduce((acc, [subKey, subValue]) => {
            acc[subKey] = {
              value: subValue,
              isComplete: !!subValue
            };
            return acc;
          }, {});
        } else {
          status[key] = {
            value,
            isComplete: !!value
          };
        }
      });
      
      return status;
    },

    /**
     * Validates the current step based on required fields
     * Returns validation status and list of required fields
     * 
     * Validation Rules by Step:
     * 0 (Entry): Requires subject selection
     * 1 (Course Details): Requires age range, duration, start/end dates
     * 2 (Standards): Requires standards type and state if applicable
     * 3 (Review): No validation, always valid
     */
    currentStepValidation: (state) => {
      switch (state.currentStep) {
        case 0: // Entry
          return {
            isValid: !!state.formData.subject,
            requiredFields: ['subject']
          };

        case 1: // Course Details
          return {
            isValid: !!(
              state.formData.studentAgeRange &&
              state.formData.lessonDuration &&
              state.formData.startDate &&
              state.formData.endDate
            ),
            requiredFields: [
              'studentAgeRange',
              'lessonDuration',
              'startDate',
              'endDate'
            ]
          };

        case 2: // Standards
          return {
            isValid: !!(
              state.formData.standards.type &&
              (state.formData.standards.type !== 'state' || state.formData.standards.state)
            ),
            requiredFields: ['standards.type', 'standards.state']
          };

        case 3: // Review
          return {
            isValid: true,
            requiredFields: []
          };

        default:
          return {
            isValid: false,
            requiredFields: []
          };
      }
    },

    // Helper getters for formatting
    getGradeLevelLabel: (state) => (value) => {
      const age = state.ageOptions.find(a => a.value === value);
      return age ? age.label : value;
    },

    getStateName: (state) => (code) => {
      const state = state.states.find(s => s.code === code);
      return state ? state.name : code;
    },

    getStandardsTypeLabel: (state) => (type) => {
      return state.standardsTypes[type] || type;
    },

    formatDuration: (state) => (minutes) => {
      return state.durations[minutes] || `${minutes} minutes`;
    }
  },

  actions: {
    /**
     * Navigation Actions
     * Uses router for navigation to maintain sync between
     * router state and store state
     * 
     * Navigation Flow:
     * / (Entry) -> /onboard/course-details -> /onboard/standards -> /create
     * 
     * Each navigation updates both the router and store state to maintain
     * a single source of truth for the current step.
     */
    nextStep() {
      console.log('Next step called, current step:', this.currentStep);
      if (this.currentStep < this.steps.length - 1) {
        const nextStep = this.currentStep + 1;
        switch(nextStep) {
          case 1:
            router.push('/onboard/course-details');  // From Entry to Course Details
            break;
          case 2:
            router.push('/onboard/standards');       // From Course Details to Standards
            break;
          case 3:
            router.push('/create');                  // From Standards to Review
            break;
        }
      }
    },

    prevStep() {
      console.log('Prev step called, current step:', this.currentStep);
      if (this.currentStep > 0) {
        const prevStep = this.currentStep - 1;
        console.log('Going to previous step:', prevStep);
        switch(prevStep) {
          case 0:
            router.push('/');                        // Back to Entry
            break;
          case 1:
            router.push('/onboard/course-details');  // Back to Course Details
            break;
          case 2:
            router.push('/onboard/standards');       // Back to Standards
            break;
        }
      }
    },

    /**
     * Debug Mode Management
     * Toggles visibility of the debug panel and enables debug features
     */
    setDebugMode(enabled) {
      this.isDebugMode = enabled;
    },

    /**
     * Form Data Management
     * Handles updates to nested and top-level form fields
     * @param {string} path - Field path (e.g., 'subject' or 'standards.type')
     * @param {any} value - New value to set
     */
    updateFormData(path, value) {
      if (path.includes('.')) {
        const [parent, child] = path.split('.');
        this.formData[parent] = {
          ...this.formData[parent],
          [child]: value
        };
      } else {
        this.formData[path] = value;
      }
    },

    /**
     * Standards Selection Handler
     * Automatically updates test prep settings based on standards selection
     */
    handleAPorIBSelection() {
      if (this.formData.standards.type === 'ap') {
        this.formData.testPrep.ap = true;
      }
      if (this.formData.standards.type === 'ib') {
        this.formData.testPrep.ib = true;
      }
    }
  }
}); 
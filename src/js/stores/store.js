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
      lessonFrequency: '', // For TextBoxWithAITag in CourseDetails
      
      // Resource Availability
      hasDevices: false,
      hasFieldTrips: false,
      hasProjector: false,
      hasLab: false,
      
      // Student Count
      numberOfStudents: '',
      
      // Standards & Requirements
      standards: {
        // Current Selection
        selectedType: '', // 'common-core' | 'state' | 'custom'
        state: '', // Only used when selectedType is 'state'
        
        // Custom Standards Upload
        customStandards: {
          file: null, // The PDF File object
          status: null, // 'pending' | 'processing' | 'ready'
          metadata: {
            filename: '',
            size: 0,
            uploadDate: null
          }
        }
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
      { code: 'CA', name: 'California' },
      { code: 'NY', name: 'New York' },
      { code: 'TX', name: 'Texas' }
      // Add more as needed
    ],
    
    standardsTypes: {
      'common-core': 'Common Core Standards',
      'state': 'State Standards',
      'ib': 'International Baccalaureate',
      'ap': 'Advanced Placement'
    },

    // Standards Reference Data
    standardsConfig: {
      types: {
        'common-core': {
          label: 'Common Core Standards',
          description: 'National standards for K-12 education'
        },
        'state': {
          label: 'State Standards',
          description: 'Standards specific to your state'
        },
        'custom': {
          label: 'Custom Standards',
          description: 'Upload your own standards document',
          aiEnabled: true
        }
      },
      states: [
        { code: 'CA', name: 'California' },
        { code: 'NY', name: 'New York' },
        { code: 'TX', name: 'Texas' }
      ]
    },

    // PDF Upload State
    uploadedMaterials: {
      pdf: null, // The actual PDF File object
      type: null, // 'standards' | 'curriculum' | 'textbook'
      status: null, // 'pending' | 'processing' | 'ready'
      metadata: {
        filename: '',
        size: 0,
        uploadDate: null
      }
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
              state.formData.endDate &&
              state.formData.lessonFrequency &&
              state.formData.numberOfStudents
            ),
            requiredFields: [
              'studentAgeRange',
              'lessonDuration',
              'startDate',
              'endDate',
              'lessonFrequency',
              'numberOfStudents'
            ]
          };

        case 2: // Standards
          return {
            isValid: !!(
              state.formData.standards.selectedType &&
              (state.formData.standards.selectedType !== 'state' || state.formData.standards.state) &&
              (state.formData.standards.selectedType !== 'custom' || state.formData.standards.customStandards.file)
            ),
            requiredFields: [
              'standards.selectedType',
              ...(state.formData.standards.selectedType === 'state' ? ['standards.state'] : []),
              ...(state.formData.standards.selectedType === 'custom' ? ['standards.customStandards.file'] : [])
            ]
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
      const state = state.standardsConfig.states.find(s => s.code === code);
      return state ? state.name : code;
    },

    getStandardsTypeLabel: (state) => (type) => {
      return state.standardsConfig.types[type]?.label || type;
    },

    getStandardsTypeDescription: (state) => (type) => {
      return state.standardsConfig.types[type]?.description || '';
    },

    formatDuration: (state) => (minutes) => {
      return state.durations[minutes] || `${minutes} minutes`;
    },

    // Add standards-specific getters
    standardsFormStatus: (state) => ({
      selectedType: {
        value: state.formData.standards.selectedType,
        isComplete: !!state.formData.standards.selectedType
      },
      state: {
        value: state.formData.standards.state,
        isComplete: state.formData.standards.selectedType !== 'state' || !!state.formData.standards.state
      },
      customFile: {
        value: state.formData.standards.customStandards.file?.name || '',
        isComplete: state.formData.standards.selectedType !== 'custom' || !!state.formData.standards.customStandards.file
      }
    }),

    // Update existing formFieldStatus getter to include standards
    formFieldStatus(state) {
      return {
        ...this.existingFormFieldStatus,
        standards: this.standardsFormStatus
      }
    },

    // Add validation getter for standards step
    isStandardsStepValid: (state) => {
      const standards = state.formData.standards;
      if (standards.selectedType === 'state') {
        return !!standards.state;
      }
      if (standards.selectedType === 'custom') {
        return !!standards.customStandards.file;
      }
      return !!standards.selectedType;
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
    },

    // Update standards selection
    setStandardsType(type) {
      this.formData.standards.selectedType = type;
      // Clear state if not state standards
      if (type !== 'state') {
        this.formData.standards.state = '';
      }
      // Clear custom file if not custom
      if (type !== 'custom') {
        this.formData.standards.customStandards = {
          file: null,
          status: null,
          metadata: {
            filename: '',
            size: 0,
            uploadDate: null
          }
        };
      }
    },

    setStateStandard(state) {
      this.formData.standards.state = state;
    },

    // PDF handling actions
    setPdfMaterial(file) {
      this.uploadedMaterials.pdf = file
      this.uploadedMaterials.metadata = {
        filename: file.name,
        size: file.size,
        uploadDate: new Date().toISOString()
      }
      this.uploadedMaterials.status = 'pending'
      this.uploadedMaterials.type = 'standards' // Since we're using this for standards
    },

    clearPdfMaterial() {
      this.uploadedMaterials.pdf = null
      this.uploadedMaterials.type = null
      this.uploadedMaterials.status = null
      this.uploadedMaterials.metadata = {
        filename: '',
        size: 0,
        uploadDate: null
      }
    },

    setPdfType(type) {
      this.uploadedMaterials.type = type
    },

    setPdfStatus(status) {
      this.uploadedMaterials.status = status
    },

    setCustomStandardsFile(file) {
      this.formData.standards.customStandards = {
        file,
        status: 'pending',
        metadata: {
          filename: file.name,
          size: file.size,
          uploadDate: new Date().toISOString()
        }
      };
    },

    clearCustomStandardsFile() {
      this.formData.standards.customStandards = {
        file: null,
        status: null,
        metadata: {
          filename: '',
          size: 0,
          uploadDate: null
        }
      };
    },

    // Add step tracking
    setCurrentStep(step) {
      console.log('Store: Setting current step from', this.currentStep, 'to', step);
      this.currentStep = step;
    }
  },

  // Add persistence configuration
  persist: {
    paths: ['formData']
  }
}); 
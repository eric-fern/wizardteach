import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    // UI State
    currentStep: 0,
    isAddingHoliday: false,
    hasAttemptedNext: false,
    steps: ['Course Details', 'Standards', 'Review'],
    isDebugMode: false,
    
    formData: {
      // Basic Info
      subject: '',
      studentAgeRange: '',
      numberOfStudents: '',
      
      // Schedule
      startDate: '',
      endDate: '',
      classDuration: '',
      funFridays: false,
      hasAlternatingSchedule: false,
      classDays: {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false
      },
      classDaysA: {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false
      },
      classDaysB: {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false
      },
      holidays: [], // Each holiday will be { title: string, startDate: string, endDate: string }
      
      // Student Composition
      studentComposition: {
        esl: false,
        iep: false,
        gifted: false
      },
      
      // Focus Areas
      focusAreas: {
        collaborative: false,
        presentations: false,
        classDiscussions: false,
        research: false
      },
      
      // Standards
      standards: {
        type: '', // 'common-core', 'state', 'ib', 'ap'
        state: '', // if type is 'state'
        specificStandards: [] // selected standards
      },

      // Test Prep
      testPrep: {
        ap: false,
        ib: false,
        sat: false,
        act: false
      }
    },

    // Holiday Form State
    newHoliday: {
      title: '',
      startDate: '',
      endDate: ''
    },

    // Reference Data
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
    },
    
    durations: {
      '15': '15 minutes',
      '30': '30 minutes',
      '45': '45 minutes',
      '60': '1 hour',
      '75': '1 hour 15 minutes',
      '90': '1 hour 30 minutes',
      '105': '1 hour 45 minutes',
      '120': '2 hours'
    }
  }),

  getters: {
    // Debug Information
    debugInfo: (state) => ({
      currentStep: state.currentStep,
      hasAttemptedNext: state.hasAttemptedNext,
      canProceed: state.currentStep === 0 ? 
        !!(state.formData.studentAgeRange && 
           state.formData.numberOfStudents &&
           state.formData.startDate && 
           state.formData.endDate && 
           state.formData.classDuration) : true,
      studentAgeRange: state.formData.studentAgeRange,
      numberOfStudents: state.formData.numberOfStudents,
      startDate: state.formData.startDate,
      endDate: state.formData.endDate,
      classDuration: state.formData.classDuration,
      holidaysCount: state.formData.holidays.length
    }),

    canProceed: (state) => {
      // In debug mode, always allow progression
      if (state.isDebugMode) return true;

      switch (state.currentStep) {
        case 0: // Course Details
          // Check if at least one class day is selected
          const hasRegularClassDays = !state.formData.hasAlternatingSchedule && 
            Object.values(state.formData.classDays).some(day => day);
          
          const hasAlternatingClassDays = state.formData.hasAlternatingSchedule && 
            Object.values(state.formData.classDaysA).some(day => day) &&
            Object.values(state.formData.classDaysB).some(day => day);

          return !!(
            state.formData.studentAgeRange &&
            state.formData.numberOfStudents &&
            state.formData.startDate &&
            state.formData.endDate &&
            state.formData.classDuration &&
            (hasRegularClassDays || hasAlternatingClassDays)
          );

        case 1: // Standards
          return !!(
            state.formData.standards.type &&
            (state.formData.standards.type !== 'state' || state.formData.standards.state)
          );

        case 2: // Review
          return true;

        default:
          return false;
      }
    },

    getSelectedFocusAreas: (state) => {
      const areas = [];
      if (state.formData.focusAreas.collaborative) areas.push('Collaborative Learning');
      if (state.formData.focusAreas.presentations) areas.push('Presentations');
      if (state.formData.focusAreas.classDiscussions) areas.push('Class Discussions');
      if (state.formData.focusAreas.research) areas.push('Research Skills');
      return areas;
    },

    getSelectedAccommodations: (state) => {
      const accommodations = [];
      if (state.formData.studentComposition.esl) accommodations.push('ESL');
      if (state.formData.studentComposition.iep) accommodations.push('IEP');
      if (state.formData.studentComposition.gifted) accommodations.push('Gifted');
      return accommodations;
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
    },

    canAddHoliday: (state) => {
      if (!state.newHoliday.title || 
          !state.newHoliday.startDate || 
          !state.newHoliday.endDate) {
        return false;
      }

      const start = new Date(state.newHoliday.startDate);
      const end = new Date(state.newHoliday.endDate);
      
      // Also check if holiday is within course dates
      const courseStart = new Date(state.formData.startDate);
      const courseEnd = new Date(state.formData.endDate);
      
      return !isNaN(start) && !isNaN(end) && 
             start <= end &&
             start >= courseStart &&
             end <= courseEnd;
    },
    
    formatHolidayDate: () => (dateString) => {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
  },

  actions: {
    // Step Management
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    },

    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },

    setDebugMode(enabled) {
      this.isDebugMode = enabled;
      // Reset hasAttemptedNext when toggling debug mode
      this.hasAttemptedNext = false;
      // Clear any saved debug state if disabling
      if (!enabled) {
        localStorage.removeItem('debugPanelVisible');
      }
    },

    setStep(step) {
      if (this.isDebugMode && step >= 0 && step < this.steps.length) {
        this.currentStep = step;
      }
    },

    // Holiday Management
    startAddingHoliday() {
      this.isAddingHoliday = true;
    },

    cancelAddingHoliday() {
      this.isAddingHoliday = false;
      this.newHoliday = {
        title: '',
        startDate: '',
        endDate: ''
      };
    },

    addHoliday() {
      if (this.canAddHoliday) {
        this.formData.holidays.push({...this.newHoliday});
        this.cancelAddingHoliday();
      }
    },

    updateNewHoliday(field, value) {
      this.newHoliday[field] = value;
    },

    removeHoliday(index) {
      this.formData.holidays.splice(index, 1);
    },

    // Form Management
    setSubject(subject) {
      this.formData.subject = subject;
    },

    updateFormData(field, value) {
      if (field === 'hasAlternatingSchedule') {
        // First update the flag
        this.formData.hasAlternatingSchedule = value;
        
        // Clear all schedules when toggling
        const clearDays = {
          Mon: false,
          Tue: false,
          Wed: false,
          Thu: false,
          Fri: false,
          Sat: false,
          Sun: false
        };

        if (value) {
          // Switching TO alternating schedule
          // Clear regular schedule only
          this.formData.classDays = { ...clearDays };
        } else {
          // Switching FROM alternating schedule
          // Clear A/B schedules only
          this.formData.classDaysA = { ...clearDays };
          this.formData.classDaysB = { ...clearDays };
        }
      } else if (field === 'classDays' && this.formData.hasAlternatingSchedule) {
        // Prevent updates to regular schedule when in alternating mode
        return;
      } else if ((field === 'classDaysA' || field === 'classDaysB') && !this.formData.hasAlternatingSchedule) {
        // Prevent updates to alternating schedules when in regular mode
        return;
      } else {
        this.formData[field] = value;
      }
    },

    // This will be used when we're ready to send to the backend
    prepareCurriculumData() {
      const data = { ...this.formData };
      
      // Only include relevant schedule data
      if (data.hasAlternatingSchedule) {
        // Remove regular schedule data if using alternating
        delete data.classDays;
      } else {
        // Remove alternating schedule data if using regular
        delete data.classDaysA;
        delete data.classDaysB;
      }

      return {
        ...data,
        selectedFocusAreas: this.getSelectedFocusAreas,
        selectedAccommodations: this.getSelectedAccommodations,
        metadata: {
          createdAt: new Date().toISOString(),
          version: '1.0'
        }
      };
    },

    handleAPorIBSelection() {
      // If AP is selected as standards type, automatically enable AP test prep
      if (this.formData.standards.type === 'ap') {
        this.formData.testPrep.ap = true;
      }
      // If IB is selected as standards type, automatically enable IB test prep
      if (this.formData.standards.type === 'ib') {
        this.formData.testPrep.ib = true;
      }
    },

    resetForm() {
      this.currentStep = 0;
      this.formData = {
        subject: '',
        studentAgeRange: '',
        numberOfStudents: '',
        startDate: '',
        endDate: '',
        classDuration: '',
        funFridays: false,
        hasAlternatingSchedule: false,
        classDays: {
          Mon: false,
          Tue: false,
          Wed: false,
          Thu: false,
          Fri: false,
          Sat: false,
          Sun: false
        },
        classDaysA: {
          Mon: false,
          Tue: false,
          Wed: false,
          Thu: false,
          Fri: false,
          Sat: false,
          Sun: false
        },
        classDaysB: {
          Mon: false,
          Tue: false,
          Wed: false,
          Thu: false,
          Fri: false,
          Sat: false,
          Sun: false
        },
        holidays: [],
        studentComposition: {
          esl: false,
          iep: false,
          gifted: false
        },
        focusAreas: {
          collaborative: false,
          presentations: false,
          classDiscussions: false,
          research: false
        },
        standards: {
          type: '',
          state: '',
          specificStandards: []
        },
        testPrep: {
          ap: false,
          ib: false,
          sat: false,
          act: false
        }
      };
      this.newHoliday = {
        title: '',
        startDate: '',
        endDate: ''
      };
    }
  }
}); 
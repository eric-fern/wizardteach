/**
 * Request models for curriculum generation
 */

/**
 * @typedef {Object} Holiday
 * @property {string} title - Name of the holiday or break period
 * @property {string} startDate - ISO date string for holiday start
 * @property {string} endDate - ISO date string for holiday end
 * @description Used to mark non-teaching days and adjust curriculum pacing
 */

/**
 * @typedef {Object} StudentComposition
 * @property {boolean} esl - English as Second Language learners requiring language support
 * @property {boolean} iep - Students with Individualized Education Programs needing accommodations
 * @property {boolean} gifted - Advanced learners requiring enrichment
 * @description Influences material difficulty, pacing, and teaching strategies
 */

/**
 * @typedef {Object} FocusAreas
 * @property {boolean} collaborative - Group work and peer learning activities
 * @property {boolean} presentations - Student speaking and presentation skills
 * @property {boolean} classDiscussions - Guided discussions and debates
 * @property {boolean} research - Independent research and investigation
 * @description Determines types of activities and assessments generated
 */

/**
 * @typedef {Object} Standards
 * @property {string} type - Curriculum framework ('common-core', 'state', 'ib', 'ap')
 * @property {string} state - US state code for state-specific standards
 * @property {Array<string>} specificStandards - Specific standard codes to target
 * @description Controls alignment with educational requirements
 */

/**
 * @typedef {Object} TestPrep
 * @property {boolean} ap - Include AP exam preparation
 * @property {boolean} ib - Include IB exam preparation
 * @property {boolean} sat - Include SAT subject preparation
 * @property {boolean} act - Include ACT subject preparation
 * @description Influences content difficulty and assessment style
 */

/**
 * Complete curriculum generation request model
 * @typedef {Object} CurriculumRequest
 * @property {string} correlationId - Unique identifier for request tracking
 * @property {string} requestType - Type of generation request (e.g., 'curriculum', 'test')
 * 
 * Basic Information
 * @property {string} subject - Primary subject area being taught
 * @property {string} studentAgeRange - Target age/grade level
 * @property {number} numberOfStudents - Class size for activity scaling
 * 
 * Schedule Information
 * @property {string} startDate - ISO date string for course start
 * @property {string} endDate - ISO date string for course end
 * @property {number} lessonDuration - Minutes per lesson
 * @property {Array<Holiday>} holidays - Non-teaching days
 * 
 * Learning Accommodations
 * @property {StudentComposition} studentComposition - Student learning needs
 * @property {FocusAreas} focusAreas - Emphasized teaching methods
 * 
 * Curriculum Standards
 * @property {Standards} standards - Educational standards alignment
 * @property {TestPrep} testPrep - Exam preparation focuses
 */

/**
 * Base request model with all fields initialized to null/empty
 */
export const createEmptyRequest = () => ({
  // Request Metadata
  correlationId: null,
  requestType: null,

  // Basic Info
  subject: null,
  studentAgeRange: null,
  numberOfStudents: null,
  
  // Schedule
  startDate: null,
  endDate: null,
  lessonDuration: null,
  holidays: [],
  
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
    type: null,
    state: null,
    specificStandards: []
  },

  // Test Prep
  testPrep: {
    ap: false,
    ib: false,
    sat: false,
    act: false
  }
});

/**
 * Response model for curriculum generation
 * @typedef {Object} CurriculumResponse
 * @property {string} status - Request status ('success', 'error', 'pending')
 * @property {string} message - Human-readable status message
 * @property {Object} data - Response payload
 * @property {boolean} data.requestReceived - Confirmation of request receipt
 * @property {string} data.processingTime - Time taken to generate
 * @property {Object} data.scheduleSummary - Generated schedule overview
 * @property {number} data.scheduleSummary.totalWeeks - Number of teaching weeks
 * @property {number} data.scheduleSummary.totalClasses - Number of class sessions
 * @property {number} data.scheduleSummary.holidayCount - Number of holiday days
 * @property {string} data.scheduleSummary.standardsType - Selected standards framework
 * @property {number} data.scheduleSummary.focusAreasCount - Number of active focus areas
 * @property {number} data.scheduleSummary.accommodationsCount - Number of active accommodations
 */

export const createEmptyResponse = () => ({
  status: null,
  message: null,
  data: {
    requestReceived: false,
    processingTime: null,
    scheduleSummary: {
      totalWeeks: null,
      totalClasses: null,
      holidayCount: 0,
      standardsType: null,
      focusAreasCount: 0,
      accommodationsCount: 0
    }
  }
}); 
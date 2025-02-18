<template>
  <BaseWizardStep
    title="10 Questions About Your Class"
    subtitle="Help me understand your teaching needs (Step 4 of 5)"
    :is-valid="isValid"
    @next="handleNext"
    @prev="handlePrev"
  >
    <div class="text-center mb-8 p-4 rounded-lg bg-primary-100">
      <h1 class="text-2xl font-bold text-primary-800">Wizard 10 Questions View</h1>
      <p class="text-primary-600">You should see a wizard emoji in the bottom right!</p>
    </div>

    <div class="space-y-8">
      <div v-for="(question, index) in questions" 
           :key="index" 
           class="wizard-card"
      >
        <h3 class="wizard-heading">{{ question.text }}</h3>
        
        <!-- Multiple Choice Questions -->
        <div v-if="question.type === 'multiple-choice'" class="space-y-4">
          <label 
            v-for="option in question.options" 
            :key="option"
            class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 wizard-card hover:bg-dark-hover"
          >
            <input
              type="radio"
              :name="'question-' + index"
              :value="option"
              v-model="answers[index]"
              class="h-4 w-4"
            />
            <span class="wizard-text">{{ option }}</span>
          </label>
        </div>

        <!-- Text Input Questions -->
        <div v-else-if="question.type === 'text'" class="mt-2">
          <input
            type="text"
            v-model="answers[index]"
            class="form-input w-full"
            :placeholder="question.placeholder || 'Enter your answer...'"
          />
        </div>
      </div>
    </div>
  </BaseWizardStep>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseWizardStep from './BaseWizardStep.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Questions data
const questions = [
  {
    text: "What's your preferred teaching style?",
    type: "multiple-choice",
    options: [
      "Interactive and discussion-based",
      "Structured lectures with examples",
      "Project-based learning",
      "Mixed approach"
    ]
  },
  {
    text: "How do your students learn best?",
    type: "multiple-choice",
    options: [
      "Visual learning with diagrams and videos",
      "Hands-on activities and experiments",
      "Reading and writing exercises",
      "Group discussions and peer learning"
    ]
  },
  {
    text: "What's the biggest challenge in your classroom?",
    type: "multiple-choice",
    options: [
      "Keeping students engaged",
      "Managing different skill levels",
      "Time management",
      "Resource limitations"
    ]
  },
  {
    text: "What special topics interest your students most?",
    type: "text",
    placeholder: "E.g., Technology, Nature, Current Events..."
  }
]

// Store answers
const answers = ref(new Array(questions.length).fill(''))

// Validation
const isValid = computed(() => answers.value.every(answer => answer.trim() !== ''))

const handleNext = () => {
  // Here we would typically save answers before proceeding
  // For now, just navigate to the next step
  router.push('/create')
}

const handlePrev = () => {
  router.push('/onboard/standards')
}
</script>

<style scoped>
/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 
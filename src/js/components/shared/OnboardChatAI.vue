/**
 * OnboardChatAI Component
 * Handles the 10-question onboarding chat flow with AI integration
 */
<template>
  <div class="flex flex-col space-y-4">
    <!-- Progress Bar -->
    <div class="w-full bg-secondary rounded-full h-2.5">
      <div 
        class="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
        :style="{ width: `${(questionCount / 10) * 100}%` }"
      ></div>
    </div>
    
    <!-- Question Counter -->
    <div class="text-sm" style="color: var(--text-secondary);">
      Question {{ questionCount }}/10
    </div>

    <!-- Chat Messages -->
    <div class="flex flex-col space-y-2 min-h-[200px] max-h-[400px] overflow-y-auto">
      <div 
        v-for="(message, index) in messages" 
        :key="index"
        :class="[
          'p-3 rounded-lg max-w-[80%]',
          message.isUser ? 'ml-auto bg-primary-500 text-white' : 'bg-secondary'
        ]"
      >
        {{ message.text }}
      </div>
    </div>

    <!-- Input Area -->
    <div class="flex items-center space-x-2 mt-4">
      <input
        v-model="userInput"
        type="text"
        class="form-input flex-1"
        placeholder="Type your answer..."
        @keyup.enter="handleSubmit"
      />
      <button 
        @click="handleSubmit"
        class="px-4 py-2 rounded-lg transition-colors duration-200"
        :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
        style="background-color: var(--primary-500); color: white;"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Sending...' : 'Send' }}
      </button>
    </div>

    <!-- Debug Message -->
    <div v-if="showDebug && lastResponse" class="text-sm mt-2 p-2 rounded bg-secondary">
      <pre class="whitespace-pre-wrap" style="color: var(--text-primary);">{{ lastResponse }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiService } from '../../api/apiService'

// State
const userInput = ref('')
const messages = ref([
  { text: "Hi! Let's learn about your class. What subject do you teach?", isUser: false }
])
const questionCount = ref(0)
const isLoading = ref(false)
const lastResponse = ref(null)
const showDebug = ref(true) // TODO: Connect to actual debug state

// Methods
const handleSubmit = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  // Add user message
  messages.value.push({
    text: userInput.value,
    isUser: true
  })

  // Clear input and set loading
  const userMessage = userInput.value
  userInput.value = ''
  isLoading.value = true

  try {
    // Make API call
    const response = await apiService.testRequest({
      message: userMessage,
      questionNumber: questionCount.value
    })

    // Store response for debug
    lastResponse.value = JSON.stringify(response.data, null, 2)

    // Add AI response
    messages.value.push({
      text: "Thanks! Next question will come from API response",
      isUser: false
    })

    // Increment question counter
    questionCount.value++

  } catch (error) {
    console.error('API call failed:', error)
    messages.value.push({
      text: "Sorry, I couldn't process that. Please try again.",
      isUser: false
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.bg-secondary {
  background-color: var(--bg-secondary);
}

/* Custom Scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-200) var(--bg-secondary);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: var(--primary-200);
  border-radius: 3px;
}
</style> 
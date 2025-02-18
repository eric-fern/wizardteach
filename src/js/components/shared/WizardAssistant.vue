/**
 * WizardAssistant Component
 * 
 * A self-contained assistant that provides contextual help and guidance throughout the application.
 * 
 * Architecture:
 * - Self-managed visibility through WIZARD_ENABLED_VIEWS configuration
 * - View-specific messaging system with configurable delays
 * - Animated typing effect for natural interaction
 * - Responsive positioning with z-index management
 * 
 * Features:
 * - Appears only on configured views (managed via WIZARD_ENABLED_VIEWS)
 * - Animated entrance with typing effect
 * - Subtle bounce animation for engagement
 * - Speech bubble with dynamic content
 * - Proper layering beneath debug panel (z-index: 9000)
 * 
 * Usage:
 * 1. Import and include in App.vue or layout component
 * 2. Add view names to WIZARD_ENABLED_VIEWS array
 * 3. Configure messages in viewMessages object
 * 
 * Example:
 * const WIZARD_ENABLED_VIEWS = ['ViewName']
 * const viewMessages = {
 *   'ViewName': {
 *     message: "Hello! I'm here to help...",
 *     delay: 500
 *   }
 * }
 */
<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Wizard Icon -->
    <div class="relative w-12 h-12">
      <!-- Glow Effect -->
      <div class="absolute inset-0 rounded-full" 
           style="background-color: var(--primary-200); opacity: 0.4; filter: blur(8px);"></div>
      
      <!-- Inner Glow -->
      <div class="absolute inset-2 rounded-full" 
           style="background-color: var(--primary-100); opacity: 0.6; filter: blur(4px);"></div>
      
      <!-- Icon -->
      <button 
        class="relative w-full h-full rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 focus:outline-none"
        style="background-color: var(--primary-500);"
        @click="toggleAssistant"
      >
        <span class="text-2xl">🧙‍♂️</span>
      </button>
    </div>

    <!-- Assistant Panel -->
    <div 
      v-if="isOpen"
      class="absolute bottom-16 right-0 w-96 rounded-lg shadow-lg p-4 transition-all duration-200 transform origin-bottom-right"
      style="background-color: var(--bg-primary);"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium" style="color: var(--text-primary);">AI Wizard Assistant</h3>
        <button 
          class="p-1 rounded-full transition-colors duration-200 focus:outline-none"
          style="color: var(--text-secondary);"
          @click="toggleAssistant"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <!-- Message History -->
        <div class="h-64 overflow-y-auto space-y-3 pr-2">
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            class="flex items-start space-x-2"
          >
            <!-- Avatar -->
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              :style="{
                backgroundColor: message.isUser ? 'var(--bg-secondary)' : 'var(--primary-100)',
                color: message.isUser ? 'var(--text-primary)' : 'var(--primary-700)'
              }"
            >
              <span>{{ message.isUser ? '👤' : '🧙‍♂️' }}</span>
            </div>

            <!-- Message Content -->
            <div 
              class="flex-1 p-3 rounded-lg"
              :style="{
                backgroundColor: message.isUser ? 'var(--bg-secondary)' : 'var(--primary-50)',
                color: message.isUser ? 'var(--text-primary)' : 'var(--primary-900)'
              }"
            >
              {{ message.text }}
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="flex items-center space-x-2">
          <input
            v-model="userInput"
            type="text"
            class="flex-1 p-2 rounded-lg transition-colors duration-200"
            :style="{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
              border: '1px solid var(--border-color)'
            }"
            placeholder="Ask the wizard for help..."
            @keyup.enter="sendMessage"
          >
          <button
            class="p-2 rounded-lg transition-colors duration-200"
            :style="{
              backgroundColor: 'var(--primary-500)',
              color: '#ffffff'
            }"
            @click="sendMessage"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const userInput = ref('')
const messages = ref([
  {
    text: "Hello! I'm your AI Wizard Assistant. How can I help you with your curriculum planning?",
    isUser: false
  }
])

const toggleAssistant = () => {
  isOpen.value = !isOpen.value
}

const sendMessage = () => {
  if (!userInput.value.trim()) return

  // Add user message
  messages.value.push({
    text: userInput.value,
    isUser: true
  })

  // Simulate AI response (replace with actual AI integration)
  setTimeout(() => {
    messages.value.push({
      text: "I'm processing your request. This is a placeholder response.",
      isUser: false
    })
  }, 1000)

  userInput.value = ''
}
</script>

<style scoped>
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

/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 
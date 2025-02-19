/**
 * ThinkingView Component
 * 
 * A shared component that displays a magic-themed loading animation
 * with dynamic wizard-themed messages while waiting for AI responses.
 */
<template>
  <div class="thinking-container">
    <div class="magic-circle">
      <div class="sparkles">
        <div class="sparkle" v-for="n in 8" :key="n" :style="{ '--i': n }"></div>
      </div>
      <div class="wand">
        <div class="wand-tip"></div>
        <div class="wand-body"></div>
      </div>
    </div>
    
    <div class="message-container">
      <transition name="fade" mode="out-in">
        <p :key="currentMessage" class="thinking-message">
          {{ currentMessage }}<span class="dots"><span v-for="n in activeDots" :key="n">.</span></span>
        </p>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from '../../stores/store';

const store = useStore();

const messages = [
  "Brewing Purposeful Pedagogy",
  "Enchanting Mindful Mastery",
  "Conjuring Dedicated Discovery",
  "Summoning Purposeful Practice",
  "Casting Logical Learning",
  "Bewitching Studious Scholars",
  "Divining Meaningful Methods",
  "Spellbinding Creative Cognition",
  "Channeling Thoughtful Teaching",
  "Transmuting Brilliant Breakthroughs",
  "Hexing Powerful Practices",
  "Mystifying Lasting Learning",
  "Invoking Studious Success",
  "Materializing Mindful Moments",
  "Charming Dedicated Discoveries",
  "Transfiguring Brilliant Behaviors",
  "Wizarding Purposeful Patterns",
  "Alchemy Lasting Literacy",
  "Sorcering Meaningful Mastery",
  "Enchanting Wonderful Wisdom"
];

const currentMessage = ref(messages[0]);
const activeDots = ref(0);
let messageInterval;
let dotsInterval;

// Function to cycle through messages
const cycleMessages = () => {
  const currentIndex = messages.indexOf(currentMessage.value);
  const nextIndex = (currentIndex + 1) % messages.length;
  currentMessage.value = messages[nextIndex];
};

// Function to animate dots
const cycleDots = () => {
  activeDots.value = (activeDots.value % 3) + 1;
};

onMounted(() => {
  // Update store state
  store.setLoadingState(true);
  
  // Start message cycling every 5 seconds
  messageInterval = setInterval(cycleMessages, 5000);
  
  // Animate dots every 500ms
  dotsInterval = setInterval(cycleDots, 500);
});

onBeforeUnmount(() => {
  // Clean up intervals and store state
  clearInterval(messageInterval);
  clearInterval(dotsInterval);
  store.setLoadingState(false);
});
</script>

<style scoped>
.thinking-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
}

.magic-circle {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 2rem;
}

.sparkles {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: rotate 10s linear infinite;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--primary-500);
  transform-origin: 60px 60px;
  animation: sparkle 1.5s ease-in-out infinite;
  --angle: calc(360deg / 8 * var(--i));
  transform: rotate(var(--angle)) translateX(50px);
}

.wand {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.wand-tip {
  width: 12px;
  height: 12px;
  background: var(--primary-500);
  border-radius: 50%;
  position: absolute;
  top: -6px;
  left: -6px;
  animation: glow 2s ease-in-out infinite;
}

.wand-body {
  width: 4px;
  height: 60px;
  background: var(--text-primary);
  transform-origin: top;
  position: absolute;
  top: 0;
  left: -2px;
}

.message-container {
  text-align: center;
  height: 2em;
  margin-top: 1rem;
}

.thinking-message {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin: 0;
  display: inline-block;
}

.dots {
  display: inline-block;
  min-width: 24px;
}

/* Animations */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes sparkle {
  0%, 100% { opacity: 0.2; transform: rotate(var(--angle)) translateX(50px) scale(1); }
  50% { opacity: 1; transform: rotate(var(--angle)) translateX(50px) scale(1.5); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px var(--primary-500), 0 0 10px var(--primary-500); }
  50% { box-shadow: 0 0 15px var(--primary-500), 0 0 20px var(--primary-500); }
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
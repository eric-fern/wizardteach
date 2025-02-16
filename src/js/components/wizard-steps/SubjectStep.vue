<template>
  <div class="space-y-8">
    <div class="text-center animate-fade-in">
      <h3 class="text-3xl font-extrabold text-gray-900 animate-slide-up" style="animation-delay: 100ms">
        What Do You Teach?
      </h3>
      <p class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 200ms">
        Create professional teaching materials that stand out
      </p>
    </div>
    
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
      <div
        v-for="(subject, index) in subjects"
        :key="subject.value"
        class="relative group animate-slide-up"
        :style="{ animationDelay: `${300 + index * 100}ms` }"
      >
        <div
          class="relative rounded-xl border-2 bg-white px-6 py-8 shadow-sm hover:shadow-xl flex flex-col items-center space-y-4 cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          :class="{ 
            'border-primary ring-4 ring-primary/20 shadow-primary/20': modelValue.subject === subject.value,
            'border-gray-100 hover:border-primary/30': modelValue.subject !== subject.value 
          }"
          @click="selectSubject(subject.value)"
          @mouseenter="hoveredSubject = subject.value"
          @mouseleave="hoveredSubject = null"
        >
          <div 
            class="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform group-hover:scale-110"
            :class="{
              'bg-primary/10': modelValue.subject === subject.value || hoveredSubject === subject.value,
              'bg-gray-50': modelValue.subject !== subject.value && hoveredSubject !== subject.value
            }"
          >
            <component
              :is="getSubjectIcon(subject.value)"
              class="w-10 h-10 transition-colors duration-300"
              :class="{
                'text-primary': modelValue.subject === subject.value || hoveredSubject === subject.value,
                'text-gray-400': modelValue.subject !== subject.value && hoveredSubject !== subject.value
              }"
            />
          </div>

          <div class="text-center space-y-2">
            <p 
              class="text-lg font-semibold transition-colors duration-300"
              :class="{
                'text-primary': modelValue.subject === subject.value || hoveredSubject === subject.value,
                'text-gray-900': modelValue.subject !== subject.value && hoveredSubject !== subject.value
              }"
            >
              {{ subject.label }}
            </p>
            <p class="text-sm text-gray-500 transition-colors duration-300">
              {{ getSubjectDescription(subject.value) }}
            </p>
          </div>

          <div 
            v-if="modelValue.subject === subject.value"
            class="absolute top-4 right-4 text-primary animate-scale-in"
          >
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div 
      class="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 animate-fade-in"
      style="animation-delay: 800ms"
    >
      <div class="flex items-start space-x-6">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div>
          <h4 class="text-xl font-bold text-gray-900">Turn Your Expertise Into Income</h4>
          <p class="mt-2 text-gray-600 leading-relaxed">
            Join thousands of educators who are earning passive income by sharing their teaching materials. 
            Our top creators earn <span class="font-semibold text-primary">$1,200+</span> monthly while helping other teachers succeed.
          </p>
          <div class="mt-4 flex items-center space-x-4">
            <div class="flex -space-x-2">
              <div v-for="i in 4" :key="i" class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent ring-2 ring-white"></div>
            </div>
            <p class="text-sm text-gray-500">
              <span class="font-medium text-gray-900">2,547 teachers</span> joined this month
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  BeakerIcon, // Science
  CalculatorIcon, // Math
  BookOpenIcon, // English
  GlobeAltIcon, // History
  ChatBubbleBottomCenterTextIcon, // Foreign Language
  PaintBrushIcon, // Art
  MusicalNoteIcon, // Music
  HeartIcon // PE
} from '@heroicons/vue/24/outline';

const props = defineProps({
  subjects: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:model-value']);
const hoveredSubject = ref(null);

const selectSubject = (value) => {
  emit('update:model-value', { ...props.modelValue, subject: value });
};

const getSubjectIcon = (subject) => {
  const icons = {
    math: CalculatorIcon,
    science: BeakerIcon,
    english: BookOpenIcon,
    history: GlobeAltIcon,
    foreign_language: ChatBubbleBottomCenterTextIcon,
    art: PaintBrushIcon,
    music: MusicalNoteIcon,
    pe: HeartIcon
  };
  return icons[subject];
};

const getSubjectDescription = (subject) => {
  const descriptions = {
    math: 'Create premium math worksheets & interactive lessons',
    science: 'Design engaging experiments & visual materials',
    english: 'Build comprehensive language arts resources',
    history: 'Craft immersive historical content & activities',
    foreign_language: 'Develop effective language learning tools',
    art: 'Share creative projects & visual guides',
    music: 'Produce sheet music & listening activities',
    pe: 'Design fitness plans & sports curricula'
  };
  return descriptions[subject];
};
</script>

<style scoped>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style> 
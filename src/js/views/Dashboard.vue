<template>
  <div class="min-h-screen py-8" style="background-color: var(--bg-secondary);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <h1 class="text-3xl font-bold" style="color: var(--text-primary);">My Curricula</h1>
      <p class="mt-2 text-sm" style="color: var(--text-secondary);">
        Manage and track your curriculum development progress
      </p>

      <!-- Curriculum List -->
      <div class="mt-8 rounded-md shadow-sm" style="background-color: var(--bg-primary);">
        <div v-if="curricula.length > 0">
          <!-- Curriculum Items -->
          <div
            v-for="curriculum in curricula"
            :key="curriculum.id"
            class="px-4 py-4 sm:px-6 cursor-pointer transition-colors duration-200"
            :style="{
              backgroundColor: 'var(--bg-primary)',
              '&:hover': {
                backgroundColor: 'var(--bg-secondary)'
              }
            }"
            @click="handleCurriculumClick(curriculum)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center min-w-0 space-x-3">
                <div
                  class="h-12 w-12 rounded-full flex items-center justify-center"
                  style="background-color: var(--primary-500); color: #ffffff;"
                >
                  {{ curriculum.subject.charAt(0).toUpperCase() }}
                </div>
                <div class="min-w-0 flex-1">
                  <h2 class="text-lg font-medium truncate" style="color: var(--text-primary);">
                    {{ curriculum.subject }}
                  </h2>
                  <div class="mt-1 flex items-center">
                    <span class="text-sm" style="color: var(--text-secondary);">
                      {{ curriculum.gradeLevel }}
                    </span>
                    <span
                      class="ml-2 px-2 py-1 text-xs font-medium rounded-full"
                      :style="{
                        backgroundColor: getStatusColor(curriculum.status).bg,
                        color: getStatusColor(curriculum.status).text
                      }"
                    >
                      {{ curriculum.status }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Meta Information -->
              <div class="flex flex-col items-end space-y-2">
                <p class="flex items-center text-sm" style="color: var(--text-secondary);">
                  {{ curriculum.lastModified }}
                </p>
                <p class="flex items-center text-sm" style="color: var(--text-secondary);">
                  {{ curriculum.completionPercentage }}% Complete
                </p>
                <div class="flex items-center text-sm" style="color: var(--text-secondary);">
                  {{ curriculum.totalLessons }} Lessons
                </div>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mt-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-500"
                :style="{
                  width: `${curriculum.completionPercentage}%`,
                  backgroundColor: 'var(--primary-500)'
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div style="color: var(--text-secondary);">
            <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 class="mt-2 text-sm font-medium" style="color: var(--text-primary);">No curricula</h3>
          <p class="mt-1 text-sm" style="color: var(--text-secondary);">
            Get started by creating your first curriculum
          </p>
          <div class="mt-6">
            <router-link
              to="/create"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md transition-colors duration-200"
              style="background-color: var(--primary-500); color: #ffffff;"
            >
              <svg
                class="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Create New Curriculum
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const curricula = ref([])

const getStatusColor = (status) => {
  switch (status) {
    case 'In Progress':
      return {
        bg: 'var(--primary-100)',
        text: 'var(--primary-800)'
      }
    case 'Complete':
      return {
        bg: 'var(--success-100)',
        text: 'var(--success-800)'
      }
    case 'Draft':
      return {
        bg: 'var(--accent-100)',
        text: 'var(--accent-800)'
      }
    default:
      return {
        bg: 'var(--bg-secondary)',
        text: 'var(--text-secondary)'
      }
  }
}

const handleCurriculumClick = (curriculum) => {
  router.push(`/curriculum/${curriculum.id}`)
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
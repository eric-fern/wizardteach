<template>
  <div class="min-h-screen p-8" style="background-color: var(--bg-secondary);">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-8" style="color: var(--text-primary);">My Materials</h1>

      <!-- Empty State -->
      <div v-if="!materials || materials.length === 0">
        <div class="text-center py-12 rounded-lg border-2 border-dashed" 
             style="background-color: var(--bg-primary); border-color: var(--border-color);">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="mx-auto h-12 w-12"
            style="color: var(--text-secondary);"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium" style="color: var(--text-primary);">No materials yet</h3>
          <p class="mt-1 text-sm" style="color: var(--text-secondary);">Get started by creating a new curriculum</p>
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

      <!-- Materials Grid -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="material in materials"
          :key="material.id"
          class="rounded-lg shadow-sm hover:shadow-md transition-shadow"
          style="background-color: var(--bg-primary);"
        >
          <!-- Material Card Content -->
          <div class="p-6">
            <h3 class="text-lg font-medium" style="color: var(--text-primary);">{{ material.title }}</h3>
            <p class="mt-2 text-sm" style="color: var(--text-secondary);">{{ material.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-sm" style="color: var(--text-secondary);">{{ material.date }}</span>
              <button
                class="text-sm font-medium transition-colors duration-200"
                style="color: var(--primary-500);"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic
const materials = []
</script>

<style scoped>
/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 
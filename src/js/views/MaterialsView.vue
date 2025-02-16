<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">My Materials</h1>
      
      <!-- Materials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Empty State -->
        <div v-if="!materials.length" class="col-span-full">
          <div class="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <svg 
              class="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No materials yet</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new curriculum</p>
            <div class="mt-6">
              <router-link
                to="/"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg 
                  class="-ml-1 mr-2 h-5 w-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create New Curriculum
              </router-link>
            </div>
          </div>
        </div>

        <!-- Material Cards -->
        <div
          v-for="material in materials"
          :key="material.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Card content will go here once we have materials -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// This will eventually come from your store or API
const materials = ref([]);
</script> 
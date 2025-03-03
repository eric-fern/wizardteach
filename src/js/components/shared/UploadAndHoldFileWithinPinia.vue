<template>
  <div class="rounded-lg shadow-sm p-6" style="background-color: var(--bg-primary);">
    <!-- Upload Area -->
    <div 
      class="border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200"
      :style="{
        borderColor: isDragging ? 'var(--primary-500)' : 'var(--border-color)',
        backgroundColor: isDragging ? 'var(--primary-50)' : 'var(--bg-primary)'
      }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleFileDrop"
    >
      <input 
        type="file" 
        ref="fileInput"
        accept="application/pdf"
        @change="handleFileUpload"
        class="hidden"
      />

      <!-- Upload State -->
      <div v-if="!store.uploadedMaterials.pdf">
        <svg class="mx-auto h-12 w-12" style="color: var(--text-secondary);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <div class="mt-4">
          <button 
            @click="triggerFileInput"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors duration-200"
            style="background-color: var(--primary-500); color: #ffffff;"
          >
            Upload PDF
          </button>
        </div>
        <p class="mt-2 text-sm" style="color: var(--text-secondary);">
          or drag and drop your PDF file here
        </p>
      </div>

      <!-- File Preview -->
      <div v-else class="animate-fade-in">
        <div class="flex items-center justify-center space-x-4">
          <svg class="h-8 w-8" style="color: var(--primary-500);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <div class="text-left">
            <p class="text-sm font-medium" style="color: var(--text-primary);">
              {{ store.uploadedMaterials.metadata.filename }}
            </p>
            <p class="text-xs" style="color: var(--text-secondary);">
              {{ formatFileSize(store.uploadedMaterials.metadata.size) }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-4 flex justify-center space-x-4">
          <button 
            @click="store.clearPdfMaterial()"
            class="inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded-md transition-colors duration-200"
            :style="{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          >
            Remove
          </button>
          <button 
            @click="triggerFileInput"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md transition-colors duration-200"
            style="background-color: var(--primary-500); color: #ffffff;"
          >
            Replace
          </button>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mt-2 text-sm text-red-600 animate-fade-in">
      {{ error }}
    </div>

    <!-- File Requirements -->
    <div class="mt-4 text-xs" style="color: var(--text-secondary);">
      <p>Accepted file type: PDF</p>
      <p>Maximum file size: 100MB</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '../../stores/store'

const store = useStore()
const fileInput = ref(null)
const isDragging = ref(false)
const error = ref('')

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB

const validateFile = (file) => {
  if (!file) {
    error.value = 'Please select a file.'
    return false
  }

  if (file.type !== 'application/pdf') {
    error.value = 'Only PDF files are accepted.'
    return false
  }

  if (file.size > MAX_FILE_SIZE) {
    error.value = 'File size must be less than 100MB.'
    return false
  }

  error.value = ''
  return true
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (validateFile(file)) {
    store.setPdfMaterial(file)
  }
  // Clear input to allow uploading the same file again
  event.target.value = ''
}

const handleFileDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (validateFile(file)) {
    store.setPdfMaterial(file)
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 
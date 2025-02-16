<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Curricula</h1>
        <p class="mt-2 text-sm text-gray-600">
          Manage and edit your saved curriculum plans
        </p>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li v-for="curriculum in savedCurricula" :key="curriculum.id">
            <div class="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div 
                        class="h-12 w-12 rounded-full flex items-center justify-center bg-primary text-white"
                      >
                        {{ curriculum.subject.charAt(0).toUpperCase() }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <h2 class="text-lg font-medium text-gray-900 truncate">
                        {{ curriculum.customization.className }}
                      </h2>
                      <div class="mt-1 flex items-center">
                        <span class="text-sm text-gray-500">
                          {{ curriculum.subject }} | Grade {{ curriculum.gradeLevel }}
                        </span>
                        <span class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                              :class="statusClasses[curriculum.status]">
                          {{ curriculum.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <el-button type="text" @click="editCurriculum(curriculum)">
                    Edit
                  </el-button>
                  <el-button type="text" @click="downloadPDF(curriculum)">
                    Download
                  </el-button>
                  <el-button type="text" class="text-danger" @click="deleteCurriculum(curriculum)">
                    Delete
                  </el-button>
                </div>
              </div>
              <div class="mt-4">
                <div class="sm:flex sm:items-center sm:justify-between">
                  <div class="sm:flex sm:space-x-4">
                    <p class="flex items-center text-sm text-gray-500">
                      <span>Teacher: {{ curriculum.customization.teacherName }}</span>
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <span>School: {{ curriculum.customization.schoolName }}</span>
                    </p>
                  </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span>
                      Created {{ new Date(curriculum.createdAt).toLocaleDateString() }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="savedCurricula.length === 0" class="text-center py-12">
        <div class="text-gray-400">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No curricula</h3>
        <p class="mt-1 text-sm text-gray-500">
          Get started by creating a new curriculum
        </p>
        <div class="mt-6">
          <router-link
            to="/create"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
          >
            Create Curriculum
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';

const savedCurricula = ref([
  {
    id: 1,
    subject: 'Mathematics',
    gradeLevel: '9',
    status: 'Complete',
    customization: {
      className: 'Algebra I',
      teacherName: 'John Smith',
      schoolName: 'Lincoln High School'
    },
    createdAt: '2024-02-20T12:00:00Z'
  },
  {
    id: 2,
    subject: 'Science',
    gradeLevel: '10',
    status: 'Draft',
    customization: {
      className: 'Biology',
      teacherName: 'Sarah Johnson',
      schoolName: 'Lincoln High School'
    },
    createdAt: '2024-02-19T15:30:00Z'
  }
]);

const statusClasses = {
  Complete: 'bg-green-100 text-green-800',
  Draft: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800'
};

const editCurriculum = (curriculum) => {
  // TODO: Implement edit functionality
  console.log('Edit curriculum:', curriculum);
};

const downloadPDF = (curriculum) => {
  // TODO: Implement PDF download
  console.log('Download PDF for:', curriculum);
};

const deleteCurriculum = async (curriculum) => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to delete this curriculum? This action cannot be undone.',
      'Warning',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    );
    // TODO: Implement actual delete
    const index = savedCurricula.value.findIndex(c => c.id === curriculum.id);
    if (index > -1) {
      savedCurricula.value.splice(index, 1);
    }
  } catch {
    // User cancelled
  }
};
</script> 
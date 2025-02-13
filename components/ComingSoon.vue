<template>
    <div class="flex items-center h-screen  bg-customPrimary-900 p-8">
      <div class="max-w-2xl mx-auto bg-customPrimary-500 border border-gray-700 rounded-lg">
        <div class="flex flex-col items-center justify-center p-12 text-center">
          <div class="w-16 h-16 text-blue-500 mb-6">
            <Icon name="aterial-symbols:construction" />
            <Icon name="material-symbols:construction" size="64" class="text-2xl text-blue-500 hover:text-white cursor-pointer" />
          </div>
          <h1 class="text-3xl font-bold text-white mb-4">{{ title }}</h1>
          <p class="text-gray-400 mb-8 text-lg">{{ description }}</p>
          
          <div class="flex items-center gap-3 text-blue-400 mb-6">
            <Icon name="ph:clock-fill" />
            <span>Expected Launch: {{ eta }}</span>
          </div>
          

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    eta: {
      type: String,
      default: 'Soon'
    },
    features: {
      type: Array,
      default: () => ['Feature 1 - Coming in Phase 1', 'Feature 2 - Coming in Phase 2', 'Feature 3 - Coming in Phase 3']
    }
  })
  </script>
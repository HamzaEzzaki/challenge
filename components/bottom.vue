<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
    <!-- Last Activity Card -->
    <div class="bg-customPrimary-500 rounded-lg p-4 md:p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-white text-lg font-medium">Last Activity</h3>
        <button class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#585858] hover:bg-gray-800 transition-colors">
          <Icon name="icon-park-outline:share" class="w-4 h-4 text-gray-300" />
          <span class="text-white text-sm">Share</span>
        </button>
      </div>

      <div class="text-gray-400 text-sm mb-4">Recently for this week.</div>

      <div class="space-y-4">
        <div 
          v-for="activity in analyticsStore.LastActivity" 
          :key="activity.title" 
          class="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <!-- Activity Info -->
          <div class="flex items-start gap-3 w-full sm:w-1/3">
            <div class="flex items-center bg-gray-50 p-2 rounded-lg">
              <Icon v-if="activity.icon === 'ads'" name="bi:file-post-fill" class="w-5 h-5 text-blue-500" />
              <Icon v-else name="qlementine-icons:user-16" class="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div class="text-white text-sm">{{ activity.name }}</div>
              <div class="text-gray-500 text-xs">{{ activity.text }}</div>
            </div>
          </div>

          <!-- Target Progress -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-1/3">
            <span class="text-gray-500 text-sm">
              <span class="text-white mr-2">{{ (activity.target * 100).toFixed(0) }}%</span> Targeted
            </span>
            <div class="w-full h-1 bg-gray-700 rounded-full">
              <div 
                class="h-full bg-blue-500 rounded-full" 
                :style="{ width: (activity.target * 100) + '%' }"
              ></div>
            </div>
          </div>

          <!-- Status -->
          <div class="flex flex-col items-start gap-1 w-full sm:w-1/3">
            <div class="text-gray-500 text-xs">Status: {{ activity.status.split('T')[0] }}</div>
            <div class="text-blue-400 text-xs cursor-pointer hover:underline">Details</div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Achievement Card -->
    <div :style="{ backgroundImage: `url('/cover.png')`, backgroundSize: 'cover', backgroundPosition: 'center'}"
       class="bg-[#307BF4] rounded-lg p-6 md:p-8 relative overflow-hidden">
      <div class="relative z-10">
        <h3 class="text-white text-2xl tracking-wide font-black mb-2 md:mb-3">New Achievement!</h3>
        <p class="text-white text-base tracking-wide font-thin mb-4 md:mb-6 max-w-full md:max-w-[80%]">
          Congratulations on becoming our <br>member after 1 year. We hope you are comfortable.
        </p>
        <button class="bg-white text-blue-600 px-6 py-2 rounded-lg text-base font-semibold hover:bg-blue-50 transition-colors">
          See Benefits
        </button>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute right-0 bottom-0 transform translate-x-8 translate-y-8">
        <div class="w-28 h-28 md:w-40 md:h-40 bg-blue-500 bg-opacity-20 rounded-lg rotate-45"></div>
      </div>
      <div class="absolute right-4 bottom-4 md:right-8 md:bottom-8">
        <div class="w-24 h-24 md:w-32 md:h-32 bg-blue-500 bg-opacity-20 rounded-lg rotate-45"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnalyticsStore } from '../store/analytics'
import { onMounted } from 'vue'

const analyticsStore = useAnalyticsStore()

async function fetchData() {
  await analyticsStore.LastActivityData()
}

onMounted(() => {
  fetchData()
})
</script>

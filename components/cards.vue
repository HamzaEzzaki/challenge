<template>
  <div class="p-2 ">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 tracking-wide">
      <div v-for="metric in analyticsStore.metrics" :key="metric.title" class="bg-customPrimary-500 w-full min-h-[120px] p-4 rounded-xl">
        <div class="flex items-center mb-3">
          <Icon :name="'tabler:point-filled'" :class="['w-4', 'h-4', 'mr-2', metric.color]" />
          <span class="sm:text-sm md:text-base lg:text-lg  font-light  text-white">
            {{ metric.title }}
          </span>
        </div>
        <div class="flex  justify-between">
          <div class="items-start">
            <div class="text-white text-2xl tracking-wide font-semibold mb-1">{{ formatMetricValue(metric.value) }}</div>
            <div :class="[metric.color, 'text-sm']">{{ metric.change }}</div>
          </div>
          <!-- <charts class="items-end" :color="metric.graphColor" /> -->
           <div class="items-end text-white">
            <charts class=" " :name="metric.title" :color="metric.graphColor" /> 
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnalyticsStore } from '../store/analytics'
import { onMounted } from 'vue'

const analyticsStore = useAnalyticsStore()

async function fetchData() {
  await analyticsStore.fetchAnalyticsData('2024-01-01+00:00', '2025-01-30+00:00')
}

onMounted(() => {
  fetchData()
})

function formatMetricValue(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + 'M'
  } else if (value >= 100000) {
    return (value / 1000).toFixed(0) + 'k'
  }
  return value
}
</script>
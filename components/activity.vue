<!-- ActivityFollowers.vue -->
<template>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-2">
    <!-- Activity Followers Chart -->
    <div class="lg:col-span-2 bg-customPrimary-500 rounded-xl p-4">
    <div class="flex justify-between items-center mb-6">
        <h2 @click="test" class="md:text-lg  text-xs font-semibold text-white">Activity Followers</h2>
        <div class="md:flex  grid   grid-row-3  gap-2">
        <button class="p-2 bg-[#307BF4] rounded-lg">
            <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.21412 8.92255H2.7038C2.108 8.92255 1.625 9.45331 1.625 10.108V12.4395C1.625 13.0942 2.108 13.625 2.7038 13.625H4.21412C4.80993 13.625 5.29292 13.0942 5.29292 12.4395V10.108C5.29292 9.45331 4.80993 8.92255 4.21412 8.92255Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.2551 5.1488H8.74482C8.14901 5.1488 7.66602 5.67956 7.66602 6.33429V12.4395C7.66602 13.0942 8.14901 13.625 8.74482 13.625H10.2551C10.8509 13.625 11.3339 13.0942 11.3339 12.4395V6.33429C11.3339 5.67956 10.8509 5.1488 10.2551 5.1488Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.2942 1.375H14.7839C14.1881 1.375 13.7051 1.90576 13.7051 2.56048V12.4395C13.7051 13.0942 14.1881 13.625 14.7839 13.625H16.2942C16.89 13.625 17.373 13.0942 17.373 12.4395V2.56048C17.373 1.90576 16.89 1.375 16.2942 1.375Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        </button>
        <button class="p-2 rounded-lg border border-[#585858]">
            <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.625 6.96018H4.24273L6.40672 1.82331C6.48088 1.64217 6.60146 1.49072 6.75265 1.38878C6.90384 1.28685 7.07859 1.2392 7.25402 1.25206C7.42945 1.26492 7.59737 1.3377 7.73578 1.46087C7.87419 1.58404 7.97664 1.75184 8.02971 1.94231L10.6474 11.0558C10.6983 11.2394 10.795 11.4023 10.9259 11.5245C11.0568 11.6468 11.2161 11.723 11.3845 11.7441C11.5529 11.7651 11.723 11.73 11.8742 11.643C12.0253 11.556 12.1508 11.4209 12.2355 11.2541L14.7573 6.36517H17.375" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <select class="bg-customPrimary-500 text-white rounded-lg border border-[#585858] px-3 py-1 text-sm">
            <option>Month</option>
        </select>
        </div>
    </div>
    
    <!-- Chart using ApexCharts -->
    <client-only>
        <apexchart
        type="bar"
        height="250"
        :options="chartOptions"
        :series="series"
        ></apexchart>
    </client-only>
    </div>

    <!-- New Followers List -->
    <div class="bg-customPrimary-500 rounded-xl p-6">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg text-white font-bold">New Followers </h2>
        <button class="text-sm text-gray-400">See All</button>
    </div>
    <div class="space-y-4">
        <div v-for="follower in analyticsStore.NewFollowers" :key="follower.name" class="flex items-center gap-3 text-base">
            <img v-if="follower.image" 
            :src="follower.image" 
            alt="Profile" 
            class="w-10 h-10 rounded-full mr-2"
            />    
            <div v-else class="w-10 h-10 bg-gray-800 rounded-full"></div>
            <div class="flex-1">
                <div class="flex items-center gap-1">
                <span class="text-white font-semibold">{{ follower.username }}</span>
                <Icon v-if="follower.verified" name="material-symbols:verified" class="text-2xl text-blue-500 hover:text-white cursor-pointer" />

                </div>
                <p class="text-gray-400">{{ formatMetricValue(follower.followers) }} followers</p>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { useAnalyticsStore } from '../store/analytics';
import { onMounted, ref, computed } from 'vue';

const analyticsStore = useAnalyticsStore();
const isLoading = ref(true);

async function fetchData() {
    try {
        await analyticsStore.NewFollowersData();
        await analyticsStore.fetchChartsData('2024-01-01+00:00', '2025-01-30+00:00');
    } catch (error) {
        console.error('Failed to fetch data:', error);
    } finally {
        isLoading.value = false;
    }
}
function formatMetricValue(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + 'M'
  } else if (value >= 10000) {
    return (value / 1000).toFixed(0) + 'k'
  }
  return value
}

const chartData = computed(() => {
    if (!analyticsStore.chartData || analyticsStore.chartData.length === 0) {
        return [
            { month: 'Jan', value: 0 },
            { month: 'Feb', value: 0 },
            // Add all months with default value 0
        ];
    }
    return analyticsStore.chartData.map(item => ({
        month: item.month,
        value: item.value
    }));
});

const series = computed(() => [{
    name: 'Followers',
    data: chartData.value.map(item => item.value)
}]);

const chartOptions = computed(() => ({
    chart: {
        type: 'bar',
        toolbar: {
            show: false
        },
        background: 'transparent'
    },
    plotOptions: {
        bar: {
            borderRadius: 20, 
            columnWidth: '58%',
            borderRadiusApplication: 'end'
        }
    },
    colors: ['#3B82F6'],
    grid: {
        borderColor: '#374151',
        strokeDashArray: 4,
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: chartData.value.map(item => item.month),
        labels: {
            style: {
                colors: '#6B7280'
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: '#6B7280'
            },
            formatter: (value) => `${value / 1000}k`
        }
    },
    theme: {
        mode: 'dark'
    }
}));

onMounted(() => {
    fetchData();
});
</script>



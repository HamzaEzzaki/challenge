
  <template>
    <div :class="[' ', ' ', 'rounded-md', , 'p-2']">
      <client-only>
        <apexchart
          type="area"
          height="50"
          width="50"
          :options="spark3Options"
          :series="spark3Options.series"
        ></apexchart>
      </client-only>
    </div>
  </template>  

<script setup>

import { useAnalyticsStore } from '../store/analytics';
import { onMounted, ref, computed,defineProps } from 'vue';

const analyticsStore = useAnalyticsStore();
const isLoading = ref(true);

const props = defineProps({
    color: {
      type: String,
      default: 'green'
    },
    name: {
      type: String,
      default: 'value'
    },
  });


const strokeColor = computed(() => {
  const colors = {
    'bg-customSecondary-600': '#29BB89',
    'bg-customSecondary-700': '#307BF4',
    'bg-customSecondary-800': '#FF0073',
    'bg-customSecondary-900': '#724EE6',
    'bg-customSecondary-950': '#F6C059',
  };
  return colors[props.color] || colors.green;
});

const selectedMetric = computed(() => {
  const names = {
    'New Likes': 'likes',
    'Comments': 'comments',
    'Total Posts': 'posts',
    'Blocked Accounts': 'blocked',
    'Total Followers': 'value',
  };
  return names[props.name] || 'likes';
});

   
async function fetchData() {
    try {
          const today = new Date().toISOString().split('T')[0] + '+00:00';
          await analyticsStore.fetchChartsData2('2024-01-01+00:00', today);
        } catch (error) {
        console.error('Failed to fetch data:', error);
    } finally {
        isLoading.value = false;
    }
}

const chartData = computed(() => {
    if (!analyticsStore.chartData2 || analyticsStore.chartData2.length === 0) {
        return [0, 0];  
    }
   return analyticsStore.chartData2.map(item => item[selectedMetric.value]);  
});
 
const labels = [...Array(12).keys()].map(n => `2024-${(n + 1).toString().padStart(2, '0')}-30`);

// Base sparkline options
const baseSparklineOptions = {
  chart: {
    type: 'area',
    height: 50,
    sparkline: {
      enabled: true
    },
  },
  stroke: {
    curve: 'straight'
  },
  fill: {
    opacity: 1,
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: 0
  },
  labels: labels,
  tooltip: {
    enabled: false  
  }
};
 
// Spark3 Options
const spark3Options = {
  ...baseSparklineOptions,
  chart: {
    ...baseSparklineOptions.chart,
    id: 'sparkline3',
    group: 'sparklines',
  },
  colors: [strokeColor.value],
  series: [{
    name: 'Profits',
    data: chartData
  }],
};
onMounted(() => {
    fetchData();
});
 
</script>
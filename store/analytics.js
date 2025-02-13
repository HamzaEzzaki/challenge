// // store/analytics.js
 
import { defineStore } from 'pinia'

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    metrics: [],
    LastActivity: [],
    NewFollowers: null,
    chartData: [],
    chartData2: [],
    timeSeriesData: {},
    loading: false,
    error: null
  }),
  actions: {
    async fetchChartsData(from, to) {
      this.loading = true;
      this.error = null;
    
      try {
        const response = await $fetch(`https://jsonplaceholder.leadsbounty.com/analytics?from=${from}&to=${to}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const rawData = response.data;  // Your API response data
    
        // Transform API data to match the static data structure
        this.chartData = Object.entries(rawData).map(([key, value]) => {
          const month = new Date(key).toLocaleString('en-US', { month: 'short' });
    
          // Safeguard: Check if followers data exists before accessing
          const followersCount = value.followers && value.followers[0] && value.followers[0][0] || 0;
    
          return {
            month: month,
            value: followersCount,  // Map followers count to 'value'
          };
        }).slice(0, 12);  // Limit to the last 12 months (or the current year's data)
    
      } catch (err) {
        this.error = {
          message: err.message || 'Failed to fetch analytics data',
          status: err.response?.status,
          statusText: err.response?.statusText,
        };
        console.error('Analytics fetch error:', err);
      } finally {
        this.loading = false;
      }
    },
    
    async NewFollowersData() {
      this.loading = true;
      this.error = null;
    
      try {
          const response = await $fetch(`https://jsonplaceholder.leadsbounty.com/followers`, {
              headers: {
                'Content-Type': 'application/json',
              }
            });

            this.NewFollowers = response
          } catch (err) {
            this.error = err
          } finally {
            this.loading = false
          }
    },
    async LastActivityData() {
      this.loading = true;
      this.error = null;
    
      try {
          const response = await $fetch(`https://jsonplaceholder.leadsbounty.com/activities`, {
              headers: {
                'Content-Type': 'application/json',
              }
            });

            this.LastActivity = response
          } catch (err) {
            this.error = err
          } finally {
            this.loading = false
          }
    },
    async fetchAnalyticsData(from, to) {
        this.loading = true;
        this.error = null;
      
        try {
            const response = await $fetch(`https://jsonplaceholder.leadsbounty.com/analytics?from=${from}&to=${to}`, {
                headers: {
                  'Content-Type': 'application/json',
                }
              });
      
          let totals = {
            followers: 0,
            likes: 0,
            comments: 0,
            posts: 0,
            blocked: 0
          };
      
          // Get sorted years to identify first and last for change calculation
          const years = Object.keys(response.data).sort();
          const firstYear = response.data[years[0]];
          const lastYear = response.data[years[years.length - 1]];
      
          // Calculate totals and prepare for change calculation
          Object.values(response.data).forEach(metrics => {
            totals.followers += metrics.followers[0][0];
            totals.likes += metrics.likes[0];
            totals.comments += metrics.comments[0];
            totals.posts += metrics.posts[0];
            totals.blocked += metrics.blocked[0];
          });
      
          // Function to get the first and last values for change calculation
          const getFirstLast = (metricName) => ({
            first: firstYear[metricName][0]?.[0] || firstYear[metricName][0] || 0,
            last: lastYear[metricName][0]?.[0] || lastYear[metricName][0] || 0
          });
      
          // Set the metrics with change calculation
          this.metrics = [
            {
              title: 'Total Followers',
              value: totals.followers,
              change: this.calculateChange(getFirstLast('followers').last, getFirstLast('followers').first),
              color: this.getColorForMetric('followers'),
              graphColor: this.getGraphColorForMetric('followers'),
            },
            {
              title: 'New Likes',
              value: totals.likes,
              change: this.calculateChange(getFirstLast('likes').last, getFirstLast('likes').first),
              color: this.getColorForMetric('likes'),
              graphColor: this.getGraphColorForMetric('likes'),
            },
            {
              title: 'Comments',
              value: totals.comments,
              change: this.calculateChange(getFirstLast('comments').last, getFirstLast('comments').first),
              color: this.getColorForMetric('comments'),
              graphColor: this.getGraphColorForMetric('comments'),
            },
            {
              title: 'Total Posts',
              value: totals.posts,
              change: this.calculateChange(getFirstLast('posts').last, getFirstLast('posts').first),
              color: this.getColorForMetric('posts'),
              graphColor: this.getGraphColorForMetric('posts'),
            },
            {
              title: 'Blocked Accounts',
              value: totals.blocked,
              change: this.calculateChange(getFirstLast('blocked').last, getFirstLast('blocked').first),
              color: this.getColorForMetric('blocked'),
              graphColor: this.getGraphColorForMetric('blocked'),
            }
          ];
      
        } catch (err) {
          this.error = {
            message: err.message || 'Failed to fetch analytics data',
            status: err.response?.status,
            statusText: err.response?.statusText
          };
          console.error('Analytics fetch error:', err);
        } finally {
          this.loading = false;
        }
      },
      
    calculateChange(current, previous) {
      if (!previous || previous === 0) return '+0%'
      const change = ((current - previous) / previous) * 100
      const sign = change >= 0 ? '+' : ''
      return `${sign}${change.toFixed(1)}%`
    },
    getColorForMetric(frame) {
      const colors = {
        followers: 'text-customSecondary-600',
        likes: 'text-customSecondary-700',
        comments: 'text-customSecondary-800',
        posts: 'text-customSecondary-900',
        blocked: 'text-customSecondary-950'
      }
      return colors[frame] || 'text-gray-400'
    },

    getGraphColorForMetric(frame) {
      const graphColors = {
        followers: 'bg-customSecondary-600',
        likes: 'bg-customSecondary-700',
        comments: 'bg-customSecondary-800',
        posts: 'bg-customSecondary-900',
        blocked: 'bg-customSecondary-950'
      }
      return graphColors[frame] || 'bg-gray-500'
    },

    async fetchChartsData2(from, to) {
      this.loading = true;
      this.error = null;
    
      try {
        const response = await $fetch(`https://jsonplaceholder.leadsbounty.com/analytics?from=${from}&to=${to}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const rawData = response.data;  // Your API response data
    
        // Transform API data to match the static data structure
        this.chartData2 = Object.entries(rawData).map(([key, value]) => {
          const month = new Date(key).toLocaleString('en-US', { month: 'short' });
    
          // Safeguard: Check if followers data exists before accessing
          const followersCount = value.followers && value.followers[0] && value.followers[0][0] || 0;
          // const likesCount = value.likes && value.likes[0] && value.likes[0][0] || 0;

    
          return {
            month: month,
            value: followersCount,
            likes: value?.likes?.[0] ?? 0,
            comments: value?.comments?.[0] ?? 0,
            posts: value?.posts?.[0] ?? 0,
            blocked: value?.blocked?.[0] ?? 0

          };
        }).slice(0, 12);  // Limit to the last 12 months (or the current year's data)
    
      } catch (err) {
        this.error = {
          message: err.message || 'Failed to fetch analytics data',
          status: err.response?.status,
          statusText: err.response?.statusText,
        };
        console.error('Analytics fetch error:', err);
      } finally {
        this.loading = false;
      }
    },

  }
})
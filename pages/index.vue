<template>
  <div>
    <div class="flex items-center justify-between p-4 text-white">
      <!-- Search Bar -->
      <div class="relative w-96">
        <input 
          type="text" 
          placeholder="Search..." 
          class="w-full bg-customPrimary-500 text-white px-4 py-2 rounded-xl pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Icon name="heroicons:magnifying-glass" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
  
      <!-- Notifications and Profile -->
      <div class="flex items-center space-x-4">
        <!-- Notification Icon -->
        <div class="relative mr-4">
          <Icon name="heroicons:bell" class="text-2xl text-blue-500 hover:text-white cursor-pointer" />
          <span v-if="userStore.user && userStore.user.notifications" class="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {{ userStore.user.notifications.length }}
          </span>
        </div>
  
        <!-- Profile Section -->
        <div class="flex items-center" v-if="userStore.user">
          <img 
            src="../assets/image/prf.png" 
            alt="Profile" 
            class="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <div class="font-semibold">{{ userStore.user.name }}</div>
            <div class="text-xs text-gray-400">{{ userStore.user.role }}</div>
          </div>
          <Icon name="mynaui:chevron-down-solid" class="text-gray-300 ml-10" />
        </div>

        <!-- Loading state -->
        <div v-if="userStore.loading" class="text-gray-300">Loading...</div>
      </div>
    </div>
    <cards />
    <activity />
    <bottom />

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '../store/user'

const userStore = useUserStore()

async function fetchData() {
  await userStore.fetchUserData()
}

// Fetch data when component mounts
onMounted(() => {
  fetchData()
})
</script>

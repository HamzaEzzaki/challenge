<template>
  <!-- Mobile Burger Menu Button -->
  <button 
    @click="isOpen = !isOpen"
    class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-customPrimary-500 text-white"
  >
    <svg 
      v-if="!isOpen"
      xmlns="http://www.w3.org/2000/svg" 
      class="h-6 w-6" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    <svg 
      v-else
      xmlns="http://www.w3.org/2000/svg" 
      class="h-6 w-6" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Overlay for mobile -->
  <div 
    v-if="isOpen" 
    @click="isOpen = false"
    class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
  ></div>

  <!-- Sidebar -->
  <aside :class="[
      'w-52 h-screen bg-customPrimary-500 text-gray-400 fixed left-0 top-0 flex flex-col py-3 z-40 transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <!-- Logo -->
      <div class="p-4 flex justify-center gap-2">
         <img src="../assets/image/logo.svg" alt="Pondox Logo" class="object-contain" />
      </div>
  
      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-5">
        <div class="space-y-4">
        <NuxtLink 
          v-for="(item, index) in navigationItems" 
          :key="index"
          :to="item.path"
          :class="[
            'flex items-center gap-5 px-4 py-2 rounded-lg',
            $route.path === item.path 
              ? 'bg-[#307BF4]  text-white' 
              : 'hover:bg-gray-800'
          ]"
        >
            <svg v-if="item.icon === 'dashicon'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6.35865" cy="6.35865" r="3.52564" fill="currentColor"/>
                <circle cx="6.35865" cy="17.6409" r="2.82564" stroke="currentColor" stroke-width="1.4"/>
                <circle cx="17.6409" cy="6.35865" r="2.82564" stroke="currentColor" stroke-width="1.4"/>
                <path d="M17.5 14.5V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.75 17.75L14.25 17.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-if="item.icon === 'IconUser'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_15_3)">
                <path d="M12.12 13.53C12.1 13.53 12.07 13.53 12.05 13.53C12.02 13.53 11.98 13.53 11.95 13.53C9.67998 13.46 7.97998 11.69 7.97998 9.51001C7.97998 7.29001 9.78998 5.48001 12.01 5.48001C14.23 5.48001 16.04 7.29001 16.04 9.51001C16.03 11.7 14.32 13.46 12.15 13.53C12.13 13.53 12.13 13.53 12.12 13.53ZM12 6.97001C10.6 6.97001 9.46998 8.11001 9.46998 9.50001C9.46998 10.87 10.54 11.98 11.9 12.03C11.93 12.02 12.03 12.02 12.13 12.03C13.47 11.96 14.52 10.86 14.53 9.50001C14.53 8.11001 13.4 6.97001 12 6.97001Z" fill="currentColor"/>
                <path d="M12 22.75C9.31002 22.75 6.74002 21.75 4.75002 19.93C4.57002 19.77 4.49002 19.53 4.51002 19.3C4.64002 18.11 5.38002 17 6.61002 16.18C9.59002 14.2 14.42 14.2 17.39 16.18C18.62 17.01 19.36 18.11 19.49 19.3C19.52 19.54 19.43 19.77 19.25 19.93C17.26 21.75 14.69 22.75 12 22.75ZM6.08002 19.1C7.74002 20.49 9.83002 21.25 12 21.25C14.17 21.25 16.26 20.49 17.92 19.1C17.74 18.49 17.26 17.9 16.55 17.42C14.09 15.78 9.92002 15.78 7.44002 17.42C6.73002 17.9 6.26002 18.49 6.08002 19.1Z" fill="currentColor"/>
                <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="currentColor"/>
                </g>
                <defs>
                <clipPath id="clip0_15_3">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <svg v-if="item.icon === 'IconSchedule'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.9231" y="3.38461" width="16.6154" height="16.6154" rx="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.3927 7.50455L5.8429 7.50455" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.53845 4.76923V2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.9231 4.76923V2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <g opacity="0.5">
                <rect x="6.7309" y="10.8126" width="3.00001" height="3.00001" rx="1.5" fill="currentColor"/>
                <rect x="9.73077" y="13.8126" width="3.00001" height="3.00001" rx="1.5" fill="currentColor"/>
                <rect x="12.731" y="10.8126" width="3.00001" height="3.00001" rx="1.5" fill="currentColor"/>
                </g>
            </svg>
            <svg v-if="item.icon === 'IconIncome'" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3498 12.3949V5.90454C18.3498 4.79997 17.4543 3.90454 16.3498 3.90454H5.36914C4.26457 3.90454 3.36914 4.79997 3.36914 5.90454V16.8852C3.36914 17.9897 4.26457 18.8852 5.36914 18.8852H12.8595" stroke="currentColor" stroke-width="1.5"/>
                <path d="M18.192 8.35065L3.17914 8.35065" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="16.3857" cy="16.5576" r="4.25875" stroke="currentColor" stroke-width="1.5"/>
                <path d="M14.2891 16.6262L15.7156 18.113L18.4476 15.2509" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-if="item.icon === 'IconSaved'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_73)">
                <path d="M3.75 20.0476V20.0472V6.97165C3.75087 6.38265 3.98518 5.81804 4.40152 5.4016C4.81785 4.98516 5.38224 4.75087 5.97093 4.75H17.0291C17.6178 4.75087 18.1821 4.98516 18.5985 5.4016L19.1234 4.8768L18.5985 5.4016C19.0149 5.81815 19.2492 6.38292 19.25 6.97209V20.0472V20.0474C19.25 20.2729 19.1867 20.4939 19.0671 20.6851C18.9476 20.8763 18.7767 21.03 18.5741 21.1286L18.8657 21.7276L18.5741 21.1286C18.3714 21.2273 18.1451 21.267 17.921 21.2431C17.6969 21.2193 17.484 21.1329 17.3066 20.9937L17.3065 20.9936L11.9627 16.8043L11.5 16.4415L11.0373 16.8043L5.69295 20.9936L5.69268 20.9938C5.51536 21.133 5.30252 21.2194 5.07846 21.2432C4.8544 21.2671 4.62815 21.2274 4.42554 21.1288C4.22292 21.0301 4.05212 20.8764 3.93266 20.6853L3.30118 21.0798L3.93265 20.6853C3.81319 20.4941 3.74989 20.2731 3.75 20.0476Z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M7.5 8.5H16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_1_73">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <svg  v-if="item.icon === 'IconSettings'"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.76913 3.24746C10.8078 1.58418 13.2299 1.58418 14.2687 3.24746L14.9779 4.38314C15.4452 5.13147 16.2541 5.59845 17.1358 5.629L18.4739 5.67537C20.4337 5.74329 21.6448 7.84089 20.7237 9.57208L20.0948 10.7541C19.6804 11.533 19.6804 12.467 20.0948 13.2459L20.7237 14.4279C21.6448 16.1591 20.4337 18.2567 18.4739 18.3246L17.1358 18.371C16.254 18.4016 15.4452 18.8685 14.9779 19.6169L14.2687 20.7525C13.2299 22.4158 10.8078 22.4158 9.76913 20.7525L9.05989 19.6169C8.59256 18.8685 7.78373 18.4016 6.90199 18.371L5.56385 18.3246C3.60405 18.2567 2.393 16.1591 3.31408 14.4279L3.943 13.2459C4.3574 12.467 4.3574 11.533 3.943 10.7541L3.31408 9.57208C2.393 7.84089 3.60405 5.74329 5.56385 5.67537L6.90199 5.629C7.78373 5.59845 8.59256 5.13147 9.05989 4.38314L9.76913 3.24746Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          <span>{{ item.name }}</span>
        </NuxtLink>
        </div>
      </nav>
  
      <!-- Upgrade Pro Button -->
      <div class="p-4">
        <div class="bg-[#307BF4] text-center  rounded-2xl px-5 py-10 text-white">
          <h3 class="font-extrabold text-lg ">Upgrade Pro</h3>
          <p class="text-sm text-blue-100 mt-3">Upgrade now for get benefits more.</p>
          <button class="mt-3 bg-white text-[#0A043C] px-6 py-1 rounded-lg text-sm font-bold">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const navigationItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'dashicon'
  },
  {
    name: 'Users',
    path: '/users',
    icon: 'IconUser'
  },
  {
    name: 'Schedule',
    path: '/schedule',
    icon: 'IconSchedule'
  },
  {
    name: 'Income',
    path: '/income',
    icon: 'IconIncome'
  },
  {
    name: 'Saved',
    path: '/saved',
    icon: 'IconSaved'
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: 'IconSettings'
  }
]
</script>
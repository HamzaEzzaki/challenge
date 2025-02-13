// store/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchUserData() {
      this.loading = true
      try {
        const response = await $fetch(`https://cors-anywhere.herokuapp.com/https://jsonplaceholder.leadsbounty.com/account`, {
          headers: {
            'Content-Type': 'application/json',
          }
      });
        this.user = response
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    }
  }
})

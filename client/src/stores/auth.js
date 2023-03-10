import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    fullName: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (store) => {
      if (store.token === null) return false
      else return true
    },
    getToken: (store) => {
      return store.token;
    },
    getUser: (store) => {
      return store.fullName
    }
  },
  actions: {
    setUserInfo(fullName, token) {
      this.fullName = fullName
      this.token = token
    },
    logoutUser() {
      (this.fullName = null), (this.token = null);
    },
    validate() {
      return new Promise((resolve, reject) => {
        if (!this.token) resolve(false)
        axios.get("/api/validate", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          }).then((res) => {
            if (res.data.validation) resolve(true)
          }).catch((err) => {
            this.fullName = null
            this.token = null
            resolve(false)
          });
      })
    }
  },
  persist: true,
});

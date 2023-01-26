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
  },
  actions: {
    setUserInfo(fullName, token) { // FIXME: This doesn't need to return a promise
      return new Promise((resolve, reject) => {
        (this.fullName = fullName), (this.token = token);
        resolve(true)
      })
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

import { defineStore } from "pinia";


export const useClientStore = defineStore("clients", {
  state: () => ({
    clients: [],
    pageListLength: 25,
  }),
  getters: {
    getClients: (store) => {
        return store.clients      
    },
    getLength: (store) => {
        return store.clients.length
    },
    getPageCount: (store) => {
        return Math.ceil(store.clients.length / store.pageListLength)
    },
    getPageListLength: (store) => {
        return store.pageListLength
    }
  },
  actions: {
    setClients(clientsArray) {
      this.clients = clientsArray
    },
    setPageListLength(pageListLength) {
        this.pageListLength = pageListLength
    }
  },
  persist: true
});

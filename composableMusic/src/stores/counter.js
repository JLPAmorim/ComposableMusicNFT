import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  
  //'counter', () => {
  /*const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }*/

  //return { count, doubleCount, increment }

  id: 'counter',

  state: () => ({
    musicPrice1 : 0.05,
    
    musicPrice2 : 0.84,

    musicPrices: [0.05, 0.84],
  }),

  actions: {

  },

  getters:{
    /*musicPrice: (state, id) => {
      if(id === 1)
        return state.musicPrice1
      else
        return state.musicPrice2  
    }*/

    getMusicPrice: (state) =>{
      return (musicId) => state.musicPrices[musicId]
    }

  }
})

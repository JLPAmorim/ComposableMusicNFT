<template>
    <div class="d-flex justify-center align-baseline" style="gap: 1rem">
  
      <v-btn
        :loading="loading[2]"
        :disabled="loading[2]"
        color=#00E676
        prepend-icon="mdi-cart-minus"
        @click="load(2)"
      >
        Add to Cart
      </v-btn>

    </div>
</template>

<script>
    export default {
      data () {
        return {
          loading: [],
        }
      },
      methods: {
        load (i) {
          this.loading[i] = true
          setTimeout(() => (this.loading[i] = false), 3000)
        },
      },
    }
  </script>
  
  <style>
   /*.d-flex justify-center align-baseline{
    color: aqua;
   }*/
  </style>
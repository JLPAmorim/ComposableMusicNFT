<template>
    <div>
        <v-app-bar class="top_bar" style="backgroundColor: #1a2326 ;"> 

        <v-app-bar-title class="top_bar_title" :style="style_title">Composable Music NFTs </v-app-bar-title>
        <!--<v-column>
        <v-app-bar-title class="top_bar_title" :style="style_title">
            <v-row weight=0>Composable</v-row>
            <v-row> Music NFTs </v-row>
        </v-app-bar-title>
        </v-column>-->

        <v-spacer></v-spacer>
        <v-column>
            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-magnify</v-icon>
            </v-btn>
                
            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-credit-card-outline</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-bell</v-icon>
            </v-btn>

            <v-menu
                :close-on-content-click="false"
                :width=500 
                >
                <template v-slot:activator="{ props }">
                <v-btn v-bind="props">
                    <v-icon style="color: #FDFDFD">mdi-account</v-icon>
                </v-btn>
                </template>
                
                <v-list style=" backgroundColor: #242121">
                    <v-list-item>
                        <p class="font-weight-medium text-white bg-dark">Login/Sign up:</p>
                    </v-list-item>
                    <v-list-item>
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            color = "white"
                            label="E-mail"
                            required
                        ></v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            color = "white"
                            label="Password"
                            required
                        ></v-text-field>
                    </v-list-item>
                    <v-column>
                        <v-list-item class="d-flex justify-center align-baseline">
                            <v-btn 
                            color=#00E676>
                            <p> Login </p>
                            </v-btn>
                            
                            <v-btn 
                            color="#242121">
                            <p class="font-weight-medium text-white bg-dark"> Forgot your password? </p>
                            </v-btn>
                        </v-list-item>
                    </v-column>
                    <v-list-item>
                        <p class="font-weight-medium text-white bg-dark">Not Registered yet?:</p>
                    </v-list-item>
                    <v-list-item class="d-flex justify-center align-baseline">
                        <v-btn 
                        color=#00E676
                        :width=200>
                         <p> Sign Up </p>
                        </v-btn>
                    </v-list-item>

                </v-list>
            </v-menu>

            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-cart-minus</v-icon>
            </v-btn>
        </v-column>
        </v-app-bar>
    </div>
</template>

<script>
  export default {
    data: () => ({
    }),
  }
</script>

<!--
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
-->

<style scoped>
/*.top_bar{
    background-color: #212121;
}*/

.top_bar_title{
font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 62px;

color: rgba(2, 228, 148, 0.9);

text-shadow: 0px 2.76827px 2.76827px rgba(0, 0, 0, 0.25);
}

</style>
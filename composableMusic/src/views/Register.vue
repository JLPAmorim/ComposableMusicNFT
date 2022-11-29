<template >
  <div>
    <top-bar/>
   
    <v-row class="backgrounds">
      <v-col
      cols="6"
      md="4"
      >
      <h2 class="titulo">Sign in for free to start selling/buying music:</h2>
      <v-card class="broas">
      <v-container >
        <v-text-field
          v-model="first"
          label="First name"
          variant="underlined"
        ></v-text-field>
  
        <v-text-field
          v-model="last"
          label="Last name"
          variant="underlined"
        ></v-text-field>
  
        <v-text-field
          v-model="email"
          label="Email"
          variant="underlined"
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>
  
        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
    
        <v-row >

        <v-btn class="wallet">Add your Wallet
        </v-btn>

      </v-row>
     

      <v-row >
      <v-btn class="signin"  >
        Register
      </v-btn>
    </v-row>

      </v-container>
        </v-card>
      </v-col>     
       <v-container>
        <h2 class="titulodir">How to connect ur Wallet</h2>
        <v-img
        class="dir"
        
       
      ></v-img>




      </v-container>
    </v-row>
  <bottom-bar/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TopBar from '../components/TopBar.vue';
import BottomBar from '../components/BottomBar.vue';




export default defineComponent({
  name: 'HomeView',

  components: {
    TopBar,
    BottomBar,

  },


    data () {
      
      return {
        show1: true,
        show2: true,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },

    methods: {
      mint(){
        
      }
    }
  })
  </script>





<style>

.broas{
  
position: absolute;
width: 532px;
height: 567px;
left: 116px;
top: 205px;

background-color: #362A2A;
border-radius: 15px;
}
.email {background-color:rgb(255, 249, 240);}






.backgrounds{
  position: relative;
  width: 2000px;
  height: 845px;
  
  background: #1A2326;
  

}

.dir{
  top: 305px;
left: 1010px;
position: absolute;
width: 585px;
height: 317px;
border-radius: 17px;
background: url(https://cdn.vuetifyjs.com/images/parallax/material.jpg)
}
.titulodir{

  position: absolute;
 

  top: 255px;
  left: 1200px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  
  color: #FFFFFF;




}
.titulo{
  
position: absolute;
width: 492px;
height: 40px;
left: 101px;
top: 152px;

font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 30px;
text-align: center;

color: #FFFFFF;
}

.wallet{
position: absolute;
width: 269.4px;
height: 44.08px;
left: 105px;
top: 382.11px;
color: #FFFFFF;
background: rgba(2, 228, 148, 0.9);

}

.signin{
  position: absolute;
  width: 269.4px;
  height: 44.08px;
  left: 105px;
  top: 460.11px;
  color: #FFFFFF;
  background: #000000;
  }

</style>
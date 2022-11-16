<template>
  <div>
    <TopBar/>
    <!--------------------------------------------------------------->
    <div :style = "style_rows1">
      <v-container :style = "style_rows">
        <v-row
          align="start"
          no-gutters
          style="height: 760px; "
        >
        
        <v-card-text class="d-flex justify-center align-baseline">
          <p :style="style_description">
            Composable music NFTs is a new AI system that can create original, realistic musics from your music creations. It can combine ______, ______ and ______
          </p>
        </v-card-text>

        </v-row>
      </v-container>
    </div>  
  <!--------------------------------------------------------------->  

    <div :style = "style_rows2">
        <v-container>
          <v-row
            align="start"
            no-gutters
            style="height: 760px; "
          >
          <Style_MetaData/>
          
          <v-container class="d-flex justify-center align-baseline">
            <v-btn 
              color=#00E676
              :width=400
              :height=55>
              <p> Create Your Own </p>
            </v-btn>
          </v-container>  

          </v-row>
        </v-container>
    </div>
  <!--------------------------------------------------------------->    
    <div :style = "style_rows1">
        <v-container>
          <v-row
            align="start"
            no-gutters
            style="height: 760px; "
          >
          <v-card-text class="d-flex justify-center align-baseline">
            <p :style="style_description">
              Your NFT journey starts here
            </p>
          </v-card-text>
          </v-row>
        </v-container>
    </div>
  <!--------------------------------------------------------------->   
  <BottomBar/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TopBar from '../components/TopBar.vue';
import BottomBar from '../components/BottomBar.vue';
import Bt_AddCart from '../components/Bt_AddCart.vue';
import Style_MetaData from '../components/Style_MetaData.vue';

// Components
//import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    TopBar,
    BottomBar,
    Bt_AddCart,
    Style_MetaData
  },
  data: () => ({
        style_description:{
          color: "#67FFC9",
          fontFamily: 'Poppins',
          fontWeight: "800",
        },
        style_rows1:{
            backgroundColor: "#1A2326" 
        },
        style_rows2:{
            backgroundColor: "#232424" 
        }
  })
})
</script>

<style>
/*.first_row{
  background-color: black;
  color: black;
}*/

</style>

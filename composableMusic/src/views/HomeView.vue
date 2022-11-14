<template>
  <div v-bind:style="{ backgroundColor: '#1A2326'}">
    <TopBar/>
    
    <!--<v-card-text style="style_description">
      This is content
    </v-card-text>-->
    
    <v-card-text class="d-flex justify-center align-baseline">
      <p :style="style_description">
        Composable music NFTs is a new AI system that can create original, realistic musics from your music creations. It can combine ______, ______ and ______
      </p>
    </v-card-text>
    
    
    <Bt_AddCart/>
    <Style_MetaData/>
    <BottomBar/>
  </div>
  
  <!--<v-container fluid>
      <v-row class = "first_row" style="style_rows" rows="2.5">
        
      </v-row> 
  </v-container> -->  
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
        }
        /*style_rows:{
            backgroundColor: "#1A2326" 
        }*/
  })
})
</script>

<style>
/*.first_row{
  background-color: black;
  color: black;
}*/

</style>

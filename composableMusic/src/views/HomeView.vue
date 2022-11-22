<template>
  <div>
    <TopBar/>
    <!--------------------------------------------------------------->
    <div :style = "style_rows1">
      <v-container>
        <v-row
          align="start"
          no-gutters
          style="height: 650px; "
        >
        
        <v-card-text class="d-flex justify-center align-baseline">
          <p :style="style_description">
            Composable music NFTs is a new AI system that can create original, realistic musics from your music creations. It can combine ______, ______ and ______
          </p>
        </v-card-text>
        <!---------->
        <v-container>
          <p :style="style_latestSales">
            Latest Sales
          </p>
          <v-row>
            <v-col cols="2.5">
              <MusicPlayerHome/>
              <MusicPlayerHome/>
              <MusicPlayerHome/>
            </v-col>
            <v-col cols="2.5">
              <MusicPlayerHome/>
              <MusicPlayerHome/>
              <MusicPlayerHome/>
            </v-col>
          </v-row>  
        
        
        
        
        
        </v-container>
        </v-row>
      </v-container>
    </div>  
  <!--------------------------------------------------------------->  

    <div :style = "style_rows2">
        <v-container>
          <v-row
            align="start"
            no-gutters
            style="height: 650px; "
          >
          <Style_MetaData/>
          <!---------->
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
            style="height: 650px; "
          >
          <v-card-text class="d-flex justify-center align-baseline">
            <p :style="style_description">
              Your NFT journey starts here
            </p>  
          </v-card-text>

          <v-container>
            <p :style="style_latestSales">
            (Temporariamente aqui, vai ser usado no upload e create music:)
            </p>
            <MusicPlayer/>
          </v-container>
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
import MusicPlayer from '../components/MusicPlayer.vue';
import MusicPlayerHome from '../components/MusicPlayerHome.vue';

// Components
//import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    TopBar,
    BottomBar,
    Bt_AddCart,
    Style_MetaData,
    MusicPlayer,
    MusicPlayerHome
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
        },
        style_latestSales:{
          color: "#EEEBD9",
          fontFamily: 'Poppins',
          fontWeight: "800",
        },

        icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
      items: [
        {
          title: 'New Releases',
          text: `It's New Release Friday`,
          subtext: 'Newly released songs. Updated daily.',
          img: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
        },
        {
          title: 'Rock',
          text: 'Greatest Rock Hits',
          subtext: 'Lose yourself in rock tunes.',
          img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        },
        {
          title: 'Mellow Moods',
          text: 'Ambient Bass',
          subtext: 'Chill beats to mellow you out.',
          img: 'https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
        },
      ],
      transparent: 'rgba(255, 255, 255, 0)',
        
  })
})
</script>

<style>
/*.first_row{
  background-color: black;
  color: black;
}*/


.v-card {
    transition: opacity .4s ease-in-out;
  }

  .v-card:not(.on-hover) {
    opacity: 0.6;
  }

  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }

</style>

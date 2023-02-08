<template>
  <div>
    <TopBar ref="TopBar_Ref"/>
    <!--------------------------------------------------------------->
    <div style="backgroundColor: #1A2326" >
      <v-container>
        <v-row
          align="start"
          no-gutters
          :height = "pageHeight"
        >
        
        
        <v-card-text class="d-flex justify-center align-baseline">
          <p style="color: #67FFC9;
             fontFamily: Poppins;
             fontWeight: 800;">
            Composable music NFTs is a new AI assisted platform that can create original music from yours and other featured artists music creations.
          </p>
        </v-card-text>
        <!---------->
        <v-container>
          <p style="color: #EEEBD9;
              fontFamily: Poppins;
              fontWeight: 800;">
            Latest Sales:
          </p>
          <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6">
              <MusicPlayerHome playerid="audio-player1" priceParent=0.025  musicLink = "https://assets.mixkit.co/music/preview/mixkit-secret-garden-595.mp3"></MusicPlayerHome>
              <MusicPlayerHome playerid="audio-player2" priceParent=0.035  musicLink = "https:\/\/files.freemusicarchive.org\/storage-freemusicarchive-org\/tracks\/Jjo9UAzIZMO6ln67OwObKSAEFlp98yCdhK6XxYL0.mp3"></MusicPlayerHome>
              <MusicPlayerHome playerid="audio-player3" priceParent=0.045  musicLink = "https:\/\/files.freemusicarchive.org\/storage-freemusicarchive-org\/tracks\/4xfPGu79rqI17kEhcFz9cD04qgVIYgrR4FiaRXdr.mp3"></MusicPlayerHome>
            </v-col>
            <v-col 
                cols="12"
                sm="6">
              <MusicPlayerHome playerid="audio-player4" priceParent=0.027  musicLink = "https:\/\/files.freemusicarchive.org\/storage-freemusicarchive-org\/tracks\/giZC28nLjrxcCp2VJu3WWvsUOdlDUZ32HDUBio3b.mp3"></MusicPlayerHome>
              <MusicPlayerHome playerid="audio-player5" priceParent=0.017  musicLink = "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3"></MusicPlayerHome>
              <MusicPlayerHome playerid="audio-player6" priceParent=0.026  musicLink = "https://assets.mixkit.co/music/preview/mixkit-a-love-theme-542.mp3"></MusicPlayerHome>
            </v-col>
          </v-row>  
        </v-container>
        
        
        
        
        </v-container>
        </v-row>
      </v-container>
    </div>  
  <!--------------------------------------------------------------->  

    <div style="backgroundColor: #232424">
        <v-container >
          <v-row
            align="start"
            no-gutters
            :height = "pageHeight"
          >
          <!--<Style_MetaData/>-->
          <Style_MetaData ref="Style_MetaData_Ref" @event_SendStyle="getStyles"/>
          <!-----Botão Create Your Own:----->
          <v-container class="d-flex justify-center align-baseline">
            
                <v-btn 
                  color=#00E676
                  :width=400
                  :height=55
                  @click="$refs.Style_MetaData_Ref.sendStyle()" 
                  >
                  <p> Create Your Own </p>
                </v-btn>
          </v-container>  

          </v-row>
        </v-container>
    </div>
  <!--------------------------------------------------------------->    
    <div style="backgroundColor: #1A2326">
        <v-container >
          <v-row
            align="start"
            no-gutters
            :height = "pageHeight"
          >
          <v-card-text class="d-flex justify-center align-baseline">
            <p style="color: #EEEBD9; font-family: 'Poppins'; font-style: normal; font-weight: 700; font-size: 20px;">
              Your NFT journey starts here
            </p>  
          </v-card-text>

          <!----->
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <!--Botão Conect Wallet:--->
                <v-hover
                  v-slot="{ isHovering, props }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="isHovering ? 16 : 2"
                    :class="{ 'on-hover': isHovering }"
                    class="mx-auto"
                    height="350"
                    max-width="350"
                    v-bind="props"
                    color="#00E676"
                    @click="$refs.TopBar_Ref.showMenuWallet()" 
                  >
                    <v-card-text class="font-weight-medium mt-12 text-center text-h5 text-white">
                      Conect Your Wallet
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <!--Botão Sell your Music:--->
                <v-hover
                  v-slot="{ isHovering, props }"
                  close-delay="200"
                >
                <nav>
                  <RouterLink 
                    style="text-decoration: none; color: inherit;"
                    to="/UploadSample">
                      <v-card
                        :elevation="isHovering ? 16 : 2"
                        :class="{ 'on-hover': isHovering }"
                        class="mx-auto"
                        height="350"
                        max-width="350"
                        v-bind="props"
                        color="#00E676"
                      >
                        <v-card-text class="font-weight-medium mt-12 text-center text-h5 text-white">
                          Sell Your Music
                        </v-card-text>
                      </v-card>
                  </RouterLink>
                </nav>  
                </v-hover>
              </v-col>
            </v-row>
          </v-container>

          </v-row>
        </v-container>
    </div>
  
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
import axios from 'axios'
import { ref } from 'vue'

// Components

export default defineComponent({
  name: 'HomeView',

  components: {
    TopBar,
    BottomBar,
    Bt_AddCart,
    Style_MetaData,
    MusicPlayer,
    MusicPlayerHome,
  },

  data: () => ({        
        icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
        //music1Props: {priceParent:0.03, musicLink: "./music/doraemon.mp3"},
        transparent: 'rgba(255, 255, 255, 0)',
        isMobile: false,
        nftsList: []


        
  }),

  async created() {
    axios.get('http://localhost:8001/getHomepage')
      .then(res => {
        this.nftList = res.data.samples
        console.log(this.nftList)
    }) 
  },
  
  methods:{
    //recebe styles do filho:
    getStyles(value){
      console.log(value);
    },

  },
  
  setupPageHeight() {
      const { name } = useDisplay()

      const pageHeight = computed(() => {
        // name is reactive and
        // must use .value
        switch (name.value) {
          case 'xs': return 1250
          case 'sm': return 1000
          case 'md': return 800
          case 'lg': return 650
          case 'xl': return 500
          case 'xxl': return 450
        }

        return undefined
      })

      return { pageHeight }
    },

    computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 1250
          case 'sm': return 1000
          case 'md': return 800
          case 'lg': return 650
          case 'xl': return 1000
          case 'xxl': return 1000
        }
      },
      
    },
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
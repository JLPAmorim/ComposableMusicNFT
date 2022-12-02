<template>
  <div>
    <TopBar/>
    <!--------------------------------------------------------------->
    <div style="backgroundColor: #1A2326">
      <v-container>
        <v-row
          align="start"
          no-gutters
          style="height: pageHeight; "
        >
        
        <v-card-text class="d-flex justify-center align-baseline">
          <p style="color: #67FFC9;
             fontFamily: Poppins;
             fontWeight: 800;">
            Composable music NFTs is a new AI system that can create original, realistic musics from your music creations. It can combine ______, ______ and ______
          </p>
        </v-card-text>
        <!---------->
        <v-container>
          <p style="color: #EEEBD9;
              fontFamily: Poppins;
              fontWeight: 800;">
            Latest Sales
          </p>
          <v-container fluid>
          <v-row>
            <v-col 
                cols="12"
                sm="6">
              <MusicPlayerHome/>
              <MusicPlayerHome/>
              <MusicPlayerHome/>
            </v-col>
            <v-col 
                cols="12"
                sm="6">
              <MusicPlayerHome/>
              <MusicPlayerHome/>
              <MusicPlayerHome/>
            </v-col>
          </v-row>  
        </v-container>
        
        
        
        
        </v-container>
        </v-row>
      </v-container>
    </div>  
  <!--------------------------------------------------------------->  

    <div style="backgroundColor: #232424">
        <v-container>
          <v-row
            align="start"
            no-gutters
            style="height: pageHeight; "
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
    <div style="backgroundColor: #1A2326">
        <v-container>
          <v-row
            align="start"
            no-gutters
            style="height: pageHeight; "
          >
          <v-card-text class="d-flex justify-center align-baseline">
            <p :style="style_description">
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
                <v-hover
                  v-slot="{ isHovering, props }"
                  close-delay="200"
                >
                <nav>
                  <RouterLink 
                    style="text-decoration: none; color: inherit;"
                    to="/artistmint">
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
  <!--------------------------------------------------------------->   
  <div style="backgroundColor: #232424">
        <v-container>
          <v-row
            align="start"
            no-gutters
            style="height: pageHeight; "
          >
          <v-card-text class="d-flex justify-center align-baseline">
            <p :style="style_description">
              Your NFT journey starts here
            </p>  
          </v-card-text>

          <v-container>
            <p style="color: #EEEBD9;
              fontFamily: Poppins;
              fontWeight: 800;">
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
  }),
  
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
<template>
    <div>
      <TopBar ref="TopBar_Ref"/>
      <!--------------------------------------------------------------->
      <div style="backgroundColor: #1A2326" >
        <v-container  style="height: 880px">
          <v-row
            align="start"
            no-gutters
            
          >
        
          <!---------->
          <v-container>
            <v-container fluid>
            <v-row>
              <v-col   
                  cols="12"
                  sm="6">
                <v-row> 
                  <div class="ma-4">
     
                    <v-img
                      class="bg-white"
                      width="300"
                      :aspect-ratio="1"
                      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                      cover
                    ></v-img>
                  </div>
              </v-row>
              <v-row>
                <MusicPlayerHome playerid="audio-player1" priceParent=0.025  musicLink = "https://assets.mixkit.co/music/preview/mixkit-secret-garden-595.mp3"></MusicPlayerHome>

                <v-container fluid>  
                  <v-btn
                      class="botao"
                      color=#00E676
                      :width=450
                      :height=80
                    
                      @click="$refs.Style_MetaData_Ref.sendStyle()" 
                      >
                      <p class="texto"> Add to Cart </p>
                  </v-btn>
              </v-container>
              </v-row>
              </v-col>
              <v-col>
                <v-list style="backgroundColor: #1A2326">
                    <v-list-item>
                        <MusicPlayerHome playerid="audio-player1" priceParent=0.025  musicLink = "https://assets.mixkit.co/music/preview/mixkit-secret-garden-595.mp3"></MusicPlayerHome>
                    </v-list-item>
                    <v-list-item>
                        <MusicPlayerHome playerid="audio-player1" priceParent=0.025  musicLink = "https://assets.mixkit.co/music/preview/mixkit-secret-garden-595.mp3"></MusicPlayerHome>
                    </v-list-item>
                    <v-list-item>
                        <MusicPlayerHome playerid="audio-player1" priceParent=0.025  musicLink = "https://assets.mixkit.co/music/preview/mixkit-secret-garden-595.mp3"></MusicPlayerHome>
                    </v-list-item>
                  </v-list>
                  <v-btn
                  class="botao"
                  color=#D9D9D9
                  :width=450
                  :height=80
                
                  @click="$refs.Style_MetaData_Ref.sendStyle()" 
                  >
                  <p class="texto"> Generate </p>
              </v-btn>
              </v-col>
            </v-row>  
          </v-container>
        

          
          
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
  import MusicPlayer from '../components/MusicPlayer.vue';
  import MusicPlayerHome from '../components/MusicPlayerHome.vue';
  
  import { ref } from 'vue'
  
  // Components
  
  export default defineComponent({
    name: 'HomeView',
  
    components: {
      TopBar,
      BottomBar,
      MusicPlayer,
      MusicPlayerHome,
    },
  
    data: () => ({        
          icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
          //music1Props: {priceParent:0.03, musicLink: "./music/doraemon.mp3"},
          transparent: 'rgba(255, 255, 255, 0)',
  
           isMobile: false,
          
         

     
         
  
          
    }),
    
    methods:{
      //recebe styles do filho:
      getStyles(value){
        console.log(value);
      },

      removeItem(index){
        this.items.splice(index,1)
      }
  
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
    .botao{
     
      top:10px;
      
      
      
      }
    
  </style>
<template>
  <v-container fluid >

          <v-card :width="widthMP" height="100" color="#232424">

          <audio :id="playerid" style="display:none" ref="player">
              <source :src="musicLink" type="audio/mpeg" >
              Your browser does not support the audio element.
          </audio>
          <v-row justify="space-around" >
              <!--<v-container style="padding-left: 7.5%; padding-top: 7.5%;"></v-container>-->
              <v-container style="padding-left: 7.5%; padding-top: 7.5%;"> 
                  <!--botão play:-->
                  <v-hover
                  v-slot="{ isHovering, props }"
                  open-delay="200"
                  >
                      <v-btn 
                          id="bt_play"
                          @click="toggleAudio(); 
                          isDisabled = !isDisabled" 
                          :color="isDisabled ? '#00E676' : '#a3d6ab'"  
                          :elevation="isHovering ? 16 : 2"
                          :class="{ 'on-hover': isHovering }"
                          v-bind="props"
                          > 
                          {{ isDisabled ? 'Play' : 'Pause' }} 
                      </v-btn>
                  </v-hover>
                  
                  <!--progresso de play da música:-->
                  <div id="progress-bar" style="display: inline-block; width: 220px; padding-left: 10px;">
                      <v-slider 
                          type="range"
                          min= "0"
                          :max= "audioDuration"
                          id = "volume-slider"
                          v-model="playbackTime"
                          @input="updateTime"
                          @mouseup="setTime()"
                          color='#00E676'  
                          thumb-color = '#FAFAFA'  
                          >
                      </v-slider>
                  </div>

                  <!--preço da música-->
                  <div class="font-weight-medium text-white bg-dark " style="display:inline">
                      Price: {{priceParent}} ETH
                  </div>
          </v-container>
          </v-row>       
  </v-card>
  </v-container>
</template>

<script>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useCounterStore } from '../stores/counter'
export default {
  //preço e link da música vindos da HomeView:
  props: [ "playerid", "priceParent", "musicLink"],
  data (){
      
      return {
          isDisabled: true,
          playerVolume: 0.5,
          musicPrice: 0.03,      
          audioDuration: 100,
          isPlaying: false,
          playbackTime: 0,
          audioLoaded: false,
          
          //musicPrice: useCounterStore().musicPrice1,  //funciona (v1), mas não dá para ter preço para cada musica
      }
  },
  /*setup(){        //funciona (v2) para usar o Pinia, mas acho que não quero isto
      const store = useCounterStore()
      return { getMusicPrice: store.getMusicPrice}
  },*/ 
  methods:{
      //Set the range slider max value equal to audio duration
      initSlider() {
          var audio = this.$refs.player;
          if (audio) {
              this.audioDuration = Math.round(audio.duration);
          }
      },
      //Playback listener function runs every 100ms while audio is playing
      playbackListener(e) {
          var audio = this.$refs.player;
          //Sync local 'playbackTime' var to audio.currentTime and update global state
          this.playbackTime = audio.currentTime;
          
          //console.log("update: " + audio.currentTime);
          //Add listeners for audio pause and audio end events
          audio.addEventListener("ended", this.endListener);
          audio.addEventListener("pause", this.pauseListener);
      },
      //Function to run when audio is paused by user
      pauseListener() {
          this.isPlaying = false;
          this.listenerActive = false;
          this.cleanupListeners();
      },
      //Function to run when audio play reaches the end of file
      endListener() {
          this.isPlaying = false;
          this.listenerActive = false;
          this.playbackTime = 0;
          this.isDisabled = true;  //dar reset ao botão
          this.cleanupListeners();
      },
      //Remove listeners after audio play stops
      cleanupListeners() {
          var audio = this.document.getElementById("audio-player");
          audio.removeEventListener("timeupdate", this.playbackListener);
          audio.removeEventListener("ended", this.endListener);
          audio.removeEventListener("pause", this.pauseListener);
          //console.log("All cleaned up!");
      },
      //Método chamado quando o botão de play é pressionado:
      toggleAudio() {
          //var audio = document.getElementById("audio-player");
          //audio.addEventListener('timeupdate', this.timeupdate, false);
          var audio = this.$refs.player;
          if (audio.paused) {
              audio.play();
              this.duration = audio.duration;
              this.isPlaying = true;
          } else {
              audio.pause();
              this.isPlaying = false;
          }
      },
  },
  mounted: function() {
    // nextTick code will run only after the entire view has been rendered
    this.$nextTick(function() {
      
      var audio=this.$refs.player;
      //Wait for audio to load, then run initSlider() to get audio duration and set the max value of our slider 
      // "loademetadata" Event https://www.w3schools.com/tags/av_event_loadedmetadata.asp
      audio.addEventListener(
        "loadedmetadata",
        function(e) {
          this.initSlider();
        }.bind(this)
      );
      // "canplay" HTML Event lets us know audio is ready for play https://www.w3schools.com/tags/av_event_canplay.asp
      audio.addEventListener(
        "canplay",
        function(e) {
          this.audioLoaded=true;
        }.bind(this)
      );
      //Wait for audio to begin play, then start playback listener function
      this.$watch("isPlaying",function() {
        if(this.isPlaying) {
          var audio=this.$refs.player;
          this.initSlider();
          //console.log("Audio playback started.");
          //prevent starting multiple listeners at the same time
          if(!this.listenerActive) {
            this.listenerActive=true;
            //for a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
            audio.addEventListener("timeupdate",this.playbackListener);
          }
        }
      });
      //Update current audio position when user drags progress slider
      this.$watch("playbackTime",function() {
          var audio=this.$refs.player;
      var diff=Math.abs(this.playbackTime-this.$refs.player.currentTime);
      
        //Throttle synchronization to prevent infinite loop between playback listener and this watcher
        if(diff>0.01) {
          this.$refs.player.currentTime=this.playbackTime;
        }
      });
    });
  },
  //ajustar width:
  setupMPWidth () {
    const { name } = useDisplay()
    const widthMP = computed(() => {
      // name is reactive and
      // must use .value
      switch (name.value) {
        case 'xs': return 25
        case 'sm': return 75
        case 'md': return 150
        case 'lg': return 450
        case 'xl': return 550
        case 'xxl': return 650
      }
      return undefined
    })
    return { widthMP }
  },
  //ajustar width:
  setupBarWidth () {
    const { name } = useDisplay()
    const widthBar = computed(() => {
      // name is reactive and
      // must use .value
      switch (name.value) {
        case 'xs': return 80
        case 'sm': return 150
        case 'md': return 185
        case 'lg': return 230
        case 'xl': return 250
        case 'xxl': return 275
      }
      return undefined
    })
    return { widthBar }
  },
      
  }
</script>

<style>
  .slider-wrapper {
      display: inline-block;
      height: 50px;
      padding: 20px;
      /*width: 230px;*/
  }
  input[type="range"]::-moz-range-progress {
  background-color: #00E676; 
  }
  input[type="range"]::-moz-range-track {  
  background-color: #534646;
  }
</style>
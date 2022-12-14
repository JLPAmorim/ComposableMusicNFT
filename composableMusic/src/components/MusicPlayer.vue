<template>
    <v-container fluid >

            <v-card width="400" height="115" color="#232424"  >

            <!--<audio :id="playerid" style="display:none" ref="player">
                <source src="https://www.mboxdrive.com/Tinatic%20en%20flauta%20FAIL%20-%20Desgracias%20de%20la%20vida.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>-->
            <audio :id="playerid" v-if="musicLink!=''" style="display:none" ref="player">  <!--v-if novo!!!-->
                <source :src="musicLink" type="audio/mpeg" >
                Your browser does not support the audio element.
            </audio>
            <v-row justify="space-around" >
                <v-container style="padding-left: 5%; padding-top: 6%;">
                    <!--botão play:-->
                    <v-btn 
                        id="bt_play" 
                        @click="toggleAudio(); 
                        isDisabled = !isDisabled" 
                        :color="isDisabled ? '#00E676' : '#a3d6ab'"
                        > 
                        {{ isDisabled ? 'Play' : 'Pause' }} 
                    </v-btn>

                    <!--barra de progresso da música:-->
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

                    <!--tempo atual da música:-->
                    <div class="font-weight-medium text-white bg-dark " style="display:inline">
                        {{ timeLabel }}
                    </div>
            </v-container>
            </v-row>

        <!--ajustar volume:-->
        <v-row >
            <v-slider 
            track-color='#40cf89'
            id = "volume-slider"
            v-model="playerVolume"
            prepend-icon="mdi-volume-high"
            @mouseup="setPosition()"
            max="1" 
            step="0.01" 
            min="0"
            class="mx-10"
            >
            </v-slider>
        </v-row>
    </v-card>
    </v-container>
</template>

<script>
 export default {
    props: [ "playerid", "musicLink"],

    data (){
        return {
            isDisabled: true,
            playerVolume: 0.5,
            audioDuration: 100,
            isPlaying: false, 
            playbackTime: 0,
            audioLoaded: false,
            timeLabel: '00:00:00',
        }
    },
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
            const hr = Math.floor(this.playbackTime / 3600);
            const min = Math.floor((this.playbackTime - (hr * 3600)) / 60);
            const sec = Math.floor(this.playbackTime - (hr * 3600) - (min * 60));
            this.timeLabel = `${hr.toString()
                .padStart(2, '0')}:${min.toString()
                .padStart(2, '0')}:${sec.toString()
                .padStart(2, '0')}`;
            
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
            this.isDisabled = true;  //dar reset ao botão de play
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
        //alterar volume da musica:
        setPosition(){
            var audio = this.$refs.player;
            audio.volume = this.playerVolume
        
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
        
    }
}
</script>

<style>
    .slider-wrapper {
        display: inline-block;
    }
    input[type="range"]::-moz-range-progress {
    background-color: #00E676; 
    }
    input[type="range"]::-moz-range-track {  
    background-color: #534646;
    }
</style>
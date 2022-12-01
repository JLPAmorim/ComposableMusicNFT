<template>
    <v-container fluid >

            <v-card :width="widthMP" height="100" color="#232424">

            <audio id="audio-player">
                <source src="https://www.mboxdrive.com/Tinatic%20en%20flauta%20FAIL%20-%20Desgracias%20de%20la%20vida.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <v-row justify="space-around">
                <v-container>
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
                    <div style="display: inline-block; width: 220px; padding-left: 10px;">
                        <v-slider 
                            type="range"
                            min= "0"
                            :max= "duration"
                            id = "volume-slider"
                            v-model="currentTime"
                            @input="updateTime"
                            @mouseup="setTime()"
                            color='#00E676'  
                            thumb-color = '#FAFAFA'  
                            >
                        </v-slider>
                    </div>

                    <!--preço da música-->
                    <div class="font-weight-medium text-white bg-dark " style="display:inline">
                        Price: {{ musicPrice }} ETH
                    </div>
            </v-container>
            </v-row>
            
    </v-card>
    </v-container>
</template>

<script>
 import { computed } from 'vue'
 import { useDisplay } from 'vuetify'

 export default {
    data (){
        
        return {
            isDisabled: true,
            playerVolume: 0.5,
            timeLabel: '00:00:00',
            currentTime: 0,
            musicPrice: '0.05',
        }
    },
    methods:{
        toggleAudio() {
            var audio = document.getElementById("audio-player");
            audio.addEventListener('timeupdate', this.timeupdate, false);
            if (audio.paused) {
                audio.play();
                this.duration = audio.duration;
            } else {
                audio.pause();
            }
        },
        updateTime() {
            var audio = document.getElementById("audio-player");
            audio.currentTime = this.currentTime;
        },
        timeupdate() {
        var audio = document.getElementById("audio-player");
        this.currentTime = audio.currentTime;
        const hr = Math.floor(this.currentTime / 3600);
        const min = Math.floor((this.currentTime - (hr * 3600)) / 60);
        const sec = Math.floor(this.currentTime - (hr * 3600) - (min * 60));
        this.timeLabel = `${hr.toString()
            .padStart(2, '0')}:${min.toString()
            .padStart(2, '0')}:${sec.toString()
            .padStart(2, '0')}`;
        
        //dar reset no final da música:
        if(audio.ended || audio.timeLabel === '00:00:00'){
            this.currentTime = 0;
            this.timeLabel= '00:00:00';
            this.isDisabled = true;
        }
        },
        setPosition(){
            var audio = document.getElementById("audio-player");
            audio.volume = this.playerVolume
        
        },
        //alterar tempo atual da música:
        setTime(){
            var audio = document.getElementById("audio-player");
            audio.currentTime = this.currentTime 
        }
    },
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
    }
        
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
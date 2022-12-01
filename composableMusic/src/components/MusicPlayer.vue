<template>
    <v-container fluid >

            <v-card width="400" height="100" color="#232424"  >

            <audio id="audio-player">
                <source src="https://www.mboxdrive.com/Tinatic%20en%20flauta%20FAIL%20-%20Desgracias%20de%20la%20vida.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <v-row justify="space-around" >
                <!--botão play:-->
                <v-container >
                    <v-btn 
                        id="bt_play" 
                        @click="toggleAudio(); 
                        isDisabled = !isDisabled" 
                        :color="isDisabled ? '#00E676' : '#a3d6ab'"
                        > 
                        {{ isDisabled ? 'Play' : 'Pause' }} 
                    </v-btn>

                    <!--progresso de play da música:-->
                    <!--<div class="slider-wrapper">
                    <input
                        type="range"
                        :min="0"
                        :max="duration"
                        v-model="currentTime"
                        @input="updateTime"
                        color='#00E676'
                    >
                    </div>-->
                    <div style="display: inline-block; width: 220px; padding-left: 5px;">
                        <v-slider 
                            type="range"
                            min= "0"
                            :max= "duration"
                            id = "volume-slider"
                            v-model="currentTime"
                            @input="updateTime"
                            @mouseup="setTime()"
                            color='#00E676'    
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
    data (){
        
        return {
            isDisabled: true,
            playerVolume: 0.5,
            timeLabel: '00:00:00',
            currentTime: 0,
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
        //alterar volume da musica:
        setPosition(){
            var audio = document.getElementById("audio-player");
            audio.volume = this.playerVolume
        
        },
        //alterar tempo atual da música:
        setTime(){
            var audio = document.getElementById("audio-player");
            audio.currentTime = this.currentTime 
        }
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
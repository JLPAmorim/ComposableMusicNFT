<template>
    <!--<audio controls>
        <source src="https://www.mboxdrive.com/Tinatic%20en%20flauta%20FAIL%20-%20Desgracias%20de%20la%20vida.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>-->

    <audio id="audio-player">
        <source src="https://www.mboxdrive.com/Tinatic%20en%20flauta%20FAIL%20-%20Desgracias%20de%20la%20vida.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    <v-btn 
        id="bt_play" 
        @click="toggleAudio(); 
        isDisabled = !isDisabled" 
        :color="isDisabled ? '#00E676' : '#a3d6ab'
        "> 
        {{ isDisabled ? 'Play' : 'Pause' }} 
    </v-btn>

    <!--<div class="text-caption">Media volume</div>-->

    <v-slider
      id = "volume-slider"
      v-model="playerVolume"
      prepend-icon="mdi-volume-high"
      @mouseup="setPosition()"
      max="1" 
      step="0.01" 
      min="0"
      :class="style_slider"
    >
    </v-slider>

    
    <p class="font-weight-medium text-white bg-dark">{{ timeLabel }}</p>



    <div class="slider-wrapper">
      <input
        type="range"
        :min="0"
        :max="duration"
        v-model="currentTime"
        @input="updateTime"
        color='#00E676'
      >
    </div>

    <!--butão volume +:-->
    <!--<v-btn @click="plusAudio()"> Increase Volume </v-btn>-->

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
        if(audio.ended){
            this.currentTime = 0;
            this.timeLabel= '00:00:00';
            this.isDisabled = !this.isDisabled;
        }
        },

        setPosition(){
            var audio = document.getElementById("audio-player");
            //audio.volume = media;
            audio.volume = this.playerVolume
        
        },
        
        //butão volume +:
        /*plusAudio(){
            var audio = document.getElementById("audio-player");
            audio.volume -= 0.05;
        }*/
        
        /*_handlePlayingUI: function (e) {
                this.audio.volume = this.playerVolume
        }*/ 
    }
        
    }
</script>

<style>
    .style_slider{
        width: 5%;
    }



    .style_timeLabel{
        color: aliceblue;
    }

    .style_range{
        background: firebrick;
        cursor: pointer;
    }

    .slider-wrapper {
        display: inline-block;
        width: 20px;
        height: 80px;
        padding: 0;
        /*appearance: none;*/
    }

    input[type="range"]::-moz-range-progress {
    background-color: #00E676; 
    }
    input[type="range"]::-moz-range-track {  
    background-color: #534646;
    }
</style>
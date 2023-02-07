<template>
    <v-card class="mx-auto" max-width="300px" color="#232424" style="opacity: 1; color: rgba(250, 251, 245, 0.9); padding-top: 1%;">
        
        <!--Carregar aúdio do NFT:-->
        <audio :id="playerid" style="display:none" ref="player">
            <source :src="musicUrl" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        
        <!--Imagem do NFT:-->
        <v-img class="nft-image" :src="imageUrl" height="320px" 
            :style="{ 'object-fit': 'contain' }"  @mouseenter="hovering = true" @mouseleave="hovering = false">
            <!--Botão play e pause na imagem:-->
            <v-row justify="space-around">
                <v-container style="padding-left: 5%; padding-top: 6%;">
                    <v-btn 
                        v-if="musicUrl && hovering" 
                        variant="outlined" 
                        size="large" 
                        icon color="#FAFAFA"
                        id="bt_play"
                        class="button1"
                        @click="toggleAudio(); 
                        isDisabled = !isDisabled"  >
                        <v-icon v-if="isDisabled" style="color:#FAFAFA;">
                            mdi-play
                        </v-icon>
                        <v-icon v-else style="color:#FAFAFA;">
                            mdi-pause
                        </v-icon>
                    </v-btn>
                    <!--Botão Download Música na imagem:-->
                    <v-btn v-if="musicUrl && hovering" 
                        variant="outlined" 
                        size="large"
                        class="button2" 
                        icon color="#FAFAFA" 
                        id="bt_download"
                        @click="download();">
                        <v-icon style="color:#FAFAFA;">
                            mdi-download
                        </v-icon>
                    </v-btn> 
                </v-container>
            </v-row>

        </v-img>

        <!--Nome da música:-->
        
        <v-card-title class="text-left" 
            style="font-family: 'Poppins'; text-color:'#FAFAFA'; padding-top: 10%;">
            <v-row v-if="collection" class="collection">
                <v-col v-if="name.length<17">
                    {{ collection }} 
                </v-col>
                <v-col v-else>
                    {{ collection.substring(0,17)+"..."}} 
                </v-col>
            </v-row>
            <v-row v-else class="collection">
                <v-col v-if="name.length<17">
                    By {{ artist }} 
                </v-col>
                <v-col v-else>
                    {{ artist.substring(0,17)+"..."}} 
                </v-col>
            </v-row>
            <v-row> 
                <v-col v-if="name.length<17">
                    {{ name}} 
                </v-col>
                <v-col v-else>
                    {{ name.substring(0,17)+"..."}} 
                </v-col>
                
            </v-row>
            
            
            
        </v-card-title>

        <!--Preço da música:-->
        <v-card-subtitle  v-if="price" style="font-family: 'Poppins'; padding-bottom: 1.5%;">
            <v-row>
                <v-col cols="8">
                    {{ price }} ETH
                </v-col>
            </v-row>            
        </v-card-subtitle>

        <v-card-subtitle  v-if="permalink" style="font-family: 'Poppins'; padding-bottom: 1.5%;">
            <v-row>
                <v-col cols="8">
                    Not Listed
                </v-col>
                <v-col cols="4">
                    <v-btn class="" color="#2081e2" :href="permalink">
                        <v-icon color="white">mdi-sail-boat</v-icon>
                    </v-btn>
                </v-col>
            </v-row>            
        </v-card-subtitle>


    </v-card>
</template>

<script>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

export default {
    //O que recebemos da userPage (nome, urlImagem, preço, urlMusica):
    props: {
        artist: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: ''
        },
        musicUrl:{
            type: String,
            required: true
        },
        permalink:{
            type: String,
            required: true
        },
        collection:{
            type: String,
            required: true
        }

    },

    data() {
        return {
            hovering: false,
            isDisabled: true,
            isPlaying: false,
            playbackTime: 0,
            audioDuration: 100,
        }
    },

    methods: {
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
        //Método que faz download para o dispositivo do utilizador à música/sample:
        download() {
            // start the download process here
            const link = document.createElement('a')
            link.href = this.musicUrl
            link.setAttribute('download', this.name + '.mp3')
            link.dispatchEvent(new MouseEvent('click'))
        },
    },
    mounted: function () {
        // nextTick code will run only after the entire view has been rendered
        this.$nextTick(function () {

            var audio = this.$refs.player;
            //Wait for audio to load, then run initSlider() to get audio duration and set the max value of our slider 
            // "loademetadata" Event https://www.w3schools.com/tags/av_event_loadedmetadata.asp
            audio.addEventListener(
                "loadedmetadata",
                function (e) {
                    this.initSlider();
                }.bind(this)
            );
            // "canplay" HTML Event lets us know audio is ready for play https://www.w3schools.com/tags/av_event_canplay.asp
            audio.addEventListener(
                "canplay",
                function (e) {
                    this.audioLoaded = true;
                }.bind(this)
            );
            //Wait for audio to begin play, then start playback listener function
            this.$watch("isPlaying", function () {
                if (this.isPlaying) {
                    var audio = this.$refs.player;
                    this.initSlider();
                    //console.log("Audio playback started.");
                    //prevent starting multiple listeners at the same time
                    if (!this.listenerActive) {
                        this.listenerActive = true;
                        //for a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
                        audio.addEventListener("timeupdate", this.playbackListener);
                    }
                }
            });
            //Update current audio position when user drags progress slider
            this.$watch("playbackTime", function () {
                var audio = this.$refs.player;
                var diff = Math.abs(this.playbackTime - this.$refs.player.currentTime);

                //Throttle synchronization to prevent infinite loop between playback listener and this watcher
                if (diff > 0.01) {
                    this.$refs.player.currentTime = this.playbackTime;
                }
            });
        });
    }
}
</script>

<style>
.nft-image {
        padding-top: 67%;
    }
        
    .nft-image:hover {
        transform: scale(1.1);
    }

    .nft-image .v-btn {
        opacity: 0;
        transition: all 0.5s ease;
    }
    
    .nft-image:hover .v-btn {
        opacity: 1;
    }

    .button1{
        position: absolute;
        top: 50%;
        left: 35%;
        transform: translate(-50%, -50%);
    }

    .button2 {
        position: absolute;
        top: 50%;
        left: 65%;
        transform: translate(-50%, -50%);
    }

    .collection {
        font-size: 0.8em;
    }
</style>
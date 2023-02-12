<template>
  <div>
    <TopBar />

    <div style="backgroundColor: #222b2e; height: 85vh;" >
      <v-card-text class="d-flex justify-center align-baseline">
        <p :style="style_description" class="title">
          Composable music NFTs is a new AI assisted platform that can create original music from yours and other featured artists music creations.
        </p>
      </v-card-text>
        
          <v-container fluid>
            <v-row dense="6">
              <v-col cols="6">
                <v-form v-model="valid" ref="form">
                  <v-row>
                    <!-------------- Music Genre: ----------------->
                    <v-col cols="6" class="mt-16">
                      <p class="title ml-6">Choose your music genre:</p>
                      <v-select
                        v-model="genre"
                        label="Music Genre"
                        :items="genreList"
                        :rules="validateGenres"
                        density="comfortable"
                        class="ml-6 mt-10"
                      />
                    </v-col>
                    <!-------------- Music Mood: ----------------->
                    <v-col cols="6" class="mt-16">
                      <p class="title ml-6">Choose your music mood:</p>
                      <v-select
                        v-model="mood"
                        label="Music Mood"
                        :items="moodList"
                        :rules="validateMoods"
                        density="comfortable"
                        class="ml-6 mt-10"
                      />
                    </v-col>
                  </v-row>
                  <!-------------- Music Instruments: ----------------->
                  <v-row>
                    <p class="title mt-10 ml-9">Instruments included:</p>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-checkbox
                        class="style_boxs mt-7 ml-16"
                        v-model="instruments"
                        label="Electric Guitar"
                        value="Electric Guitar"
                        :rules="validateInstruments"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="4">
                      <v-checkbox
                        class="style_boxs mt-7 ml-16"
                        v-model="instruments"
                        label="Classical Guitar"
                        value="Classical Guitar"
                        :rules="validateInstruments"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="4">
                      <v-checkbox
                        class="style_boxs mt-7 ml-16"
                        v-model="instruments"
                        label="Violin"
                        value="Violin"
                        :rules="validateInstruments"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-checkbox
                        class="style_boxs ml-16"
                        v-model="instruments"
                        label="Piano"
                        value="Piano"
                        :rules="validateInstruments"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="4">
                      <v-checkbox
                        class="style_boxs ml-16"
                        v-model="instruments"
                        label="Drums"
                        value="Drums"
                        :rules="validateInstruments"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="4">
                      <v-checkbox
                        class="style_boxs ml-16"
                        v-model="instruments"
                        label="Bass"
                        value="Bass"
                        :rules="validateInstruments"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-form>
                <v-row>
                  <v-col cols="3"/>
                    <!--Generated button, if wallet connected:-->
                    <v-btn v-if="this.connected" :width="450" :height="55" color=#00E676 class="mt-10 white--text"
                      @click="generate()">
                      Generate
                      <div style="padding-left: 10%;">
                        <v-progress-circular v-if="this.generating" indeterminate color="white"></v-progress-circular>
                      </div>
                    </v-btn>
                    <!--Conect wallet button, if not connected yet:-->
                    <v-btn v-else :width="450" :height="55" color=#00E676 class="mb-6 ml-16 white--text" @click="connectWalletPressed()">
                      Connect Wallet
                    </v-btn>     
                </v-row>
              </v-col>
              <v-col cols="6">
                <!-------------------------------------------------->
                <!-------------------Help Tab:------------------------------->
                <v-row style="padding-top:15%"></v-row>
                <v-expansion-panels v-model="search">
                  <v-expansion-panel    
                    style="background-color: #232424;
                    fontFamily: Poppins;
                    fontWeight: 800; 
                    maxWidth: 600px">
                    <!--Title:-->
                    <v-expansion-panel-title>
                        <v-row no-gutters>
                          <v-col cols="12" class="d-flex justify-center" style="color: #FAFAFA">
                            Let us help you create the music you are looking for!
                          </v-col>
                          <v-col
                            cols="8"
                            class="text-grey"
                          >
                          </v-col>
                        </v-row>
                    </v-expansion-panel-title>
                    <!--Text:-->
                    <v-expansion-panel-text>
                      <v-row no-gutters>
                          <v-col cols="12" class="d-flex justify-left" style="color: #FAFAFA">
                            <v-row no-gutters>
                              1) Make sure you have your <span style="color: #00E676; padding-left: 5px; padding-right: 5px;">Metamask Wallet</span>connected; 
                              
                              <!--Dialog Help Metamask:-->
                              <v-dialog v-model="dialogHelp">
                                <template v-slot:activator="{ props}">
                              
                                  <v-button v-bind="props">
                                <v-icon style="color: #00E676" block @click="dialogHelp = false">mdi-help-circle-outline</v-icon>
                              </v-button>
                              </template>
                              

                              <v-card style="opacity: 1.0">
                                  <v-card-text>
                                    <a style="color=#0b0f0e; fontFamily: Poppins; fontWeight: 800; background-color: transparent; " target="_blank"
                                      href="https://metamask.io/download/">Install Metamask for your browser </a>
                                    <p align="center">
                                      <iframe width="560" height="315" src="https://www.youtube.com/embed/YVgfHZMFFFQ" title="YouTube video player"
                                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                                    </p>
                                
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-btn color="#0b0f0e" block @click="dialogHelp = false">Close Dialog</v-btn>
                                  </v-card-actions>
                                  </v-card>
                                  </v-dialog>
                                <!---end dialog help----->
                            </v-row>
                          </v-col>
                      </v-row>
                      <v-row style="padding-top:10%"></v-row>
                      <v-row no-gutters>
                          <v-col cols="12" class="d-flex justify-left" style="color: #FAFAFA">
                            <v-row no-gutters>
                              <nobr>2) Select the desired <span style="color: #00E676; padding-left: 1px; padding-right: 1px">genre, mood and instruments</span> to be included </nobr>in the music;
                            </v-row>
                          </v-col>
                      </v-row>
                      <v-row style="padding-top:10%"></v-row>
                      <v-row no-gutters>
                          <v-col cols="12" class="d-flex justify-left" style="color: #FAFAFA">
                            <v-row no-gutters>
                              <nobr>3) Just ask us to <span style="color: #00E676; padding-left: 1px; padding-right: 1px;">generate</span> it, and in
                                a few seconds, it will be ready </nobr>for a preview;

                            </v-row>
                          </v-col>
                      </v-row>
                      <v-row style="padding-top:10%"></v-row>
                      <v-row no-gutters>
                          <v-col cols="12" class="d-flex justify-left" style="color: #FAFAFA">
                            <v-row no-gutters>
                              <nobr>4) If we were able to create the music you wanted, just <span style="color: #00E676; padding-left: 1px; padding-right: 1px;">mint</span> it and </nobr>you are ready to enjoy it;
                            </v-row>
                          </v-col>
                      </v-row>
                      <v-row style="padding-top:10%"></v-row>
                      <v-row no-gutters>
                          <v-col cols="12" class="d-flex justify-left" style="color: #FAFAFA">
                            <v-row no-gutters>
                              <nobr>5) Were you looking for different music? Just ask us to generate </nobr> another music for you!
                            </v-row>
                          </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>

          <!--Linha generate, preview e mint-->

          <v-row style="padding-top:8.25%"> 
            <!--<v-col cols="1"></v-col>
            <v-col cols="5">
              <div style="padding-left:10%">
                <MusicPlayer v-if="sampleUrl!=''" :musicLink="sampleUrl"/>
              </div>
            </v-col>-->
          </v-row>

          <!-- Dialog Window/Mint Window -->
          <v-form v-model="valid" ref="form2">
            <div class="text-center">
              <!--Dialog menu Preview e Mint:-->
              <v-dialog v-model="dialogMint" persistent>
                <div style="max-width: 1250px">
                  <v-card style="opacity: 1; background-color: #232424;" >
                    <v-card-text >
                      <v-row dense="4">
                        <v-col cols="6" class="ml-0" style="padding-top: 30px;">
                          <v-text-field v-model="metadata.name" label="Sample Name" type="text"
                          :rules=[...rules.required,...rules.length45] color=#00E676 class="custom-label-color" required />
                        
                          <v-text-field v-model="artist" label="What's your Artist Name?" :rules=[...rules.required,...rules.length30]
                            color="#00E676" class="custom-label-color" type="text" />
                        
                          <v-text-field v-model="value" label="Sample Value" :rules=[...rules.required,...rules.length7,...rules.value,...rules.zeroLimit] type="text" color=#00E676
                            class="custom-label-color" />
                        
                          <v-textarea v-model="metadata.description" auto-grow variant="filled" :rules=[...rules.required,...rules.length150]
                            label="Write a short description about your Sample" rows="2" color=#00E676 class="custom-label-color"
                            counter></v-textarea>
                        </v-col>

                        <v-col cols="4" class="ml-0" style="padding-top: 50px;">
                          <div style="padding-left:10%">
                            <MusicPlayer :musicLink="sampleUrl" />
                          </div>

                          <v-row style="padding-top:25%"></v-row>
                          <!--Botão Mint-->
                          <v-btn v-bind="props" v-if="this.connected" :width="450" :height="55" color=#00E676 class="mb-6 ml-16 white--text"
                            @click="mintGeneratedPressed()">
                            Mint
                          </v-btn>

                        </v-col>
                      </v-row>
              
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="white" block @click="dialogMint = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </v-dialog>
            </div>
          </v-form>
          
        </v-container>
    </div>
    <BottomBar />
  </div>
</template>
  
<script>

import TopBar from "../components/TopBar.vue";
import BottomBar from "../components/BottomBar.vue";
import UploadSample from "../components/UploadSample.vue";
import MusicPlayer from '../components/MusicPlayer.vue';
import MusicPlayerHome from '../components/MusicPlayerHome.vue';
import {connectWallet, getCurrentWalletConnected, mintArtist, mintGenerated} from "../utils/metamask.js"
import axios from 'axios'
import {pinFileToIPFS} from '../utils/pinata.js'

  
export default {

  components: {
    TopBar,
    UploadSample,
    BottomBar,
    MusicPlayer,
    MusicPlayerHome,
  },  

  data(){
    return{
      style_description: {
        color: "#FFFAF0",
        fontFamily: "Poppins",
        fontWeight: "800",
      },

      rules: {
        required: [ v => !!v || 'This field is required!' ],
        length7: [v => (v && v.length <= 7) || "Field must be less or equal than 7 characters!"],
        zeroLimit: [v => ( v && v > 0 ) || "Sample Value must be HIGHER than 0",],
        length30: [v => (v && v.length <= 30) || "Field must be less or equal than 30 characters!"],
        length30: [v => (v && v.length <= 30) || "Field must be less or equal than 30 characters!"],
        length45: [v => (v && v.length <= 45) || "Field must be less or equal than 45 characters!"],
        length150: [v => (v && v.length <= 150) || "Field must be less or equal than 45 characters!"],
        value: [v => /^(0|[1-9]\d*)(\.\d+)?$/.test(v) || "Value isn\'t valid!"],
      },
      props: false,

      //Template variables
      dialogMint: false,
      dialogHelp: false,
      generating: false,
      search:0,
      
      //Wallet variables
      connected: false,
      status: "",
      walletAddress: "",

      //Metadata Variables
      artist: "",
      value: "",
      duration: "",
      metadata: {
        description: "",
        image: "https://gateway.pinata.cloud/ipfs/QmUmXJLWKhxSHtPdQvy8aYnMkGRXbgbkqFJmtQAMoq8Ukr",
        name: "",
        animation_url: "https://gateway.pinata.cloud/ipfs/QmdfaYNiYc5iTYpsnZJd1LjMdFPixmrCkWHEjdNT63VKTr",
        attributes: [
            {
                trait_type: "Artist",
                value: ""
            },
            {
                trait_type: "Duration",
                value: ""
            },
            {
                trait_type: "Genre",
                value: ""
            },
            {
                trait_type: "Mood",
                value: ""
            }
        ],
    },

      //Generate variables
      genreList: ["Rock","Pop","Classic"],
      moodList: ["Sad", "Happy", "Love", "Epic"],
      instruments: [],
      genre: "",
      mood: "",
      audio: undefined,
      sampleUrl:"",
      audioDuration:"",
      audioUploaded:false,
      mintable: false,
      newID: 0,
      generateData: {
          genre: "",
          mood: "",
          instruments: []
      },

      //Sample Data sent to DB
      sampleData:{
        walletOwner: "",
        countMinted: "0",
        description: "",
        image: "https://gateway.pinata.cloud/ipfs/QmUmXJLWKhxSHtPdQvy8aYnMkGRXbgbkqFJmtQAMoq8Ukr",
        name: "",
        animation_url: "",
        attributes: [],
        value: "",
        samplesUsed: ["1","2","3","4"]
      }
    }
  },

  async created() {
    const {address, status} = await getCurrentWalletConnected()
    this.walletAddress = address
    this.status = status
    if(this.walletAddress!="")
        this.connected=true
    console.log("Is connected? ",this.connected)
    console.log("Wallet connected: ", this.walletAddress)

    axios.get('http://localhost:8001/getSupply')
        .then(res => {
          this.newID = res.data.samples + 1
          console.log(this.newID)
      }) 
  },
  
  methods:{

    async connectWalletPressed(){
        const walletResponse = await connectWallet()
        this.status = walletResponse.status
        this.walletAddress = walletResponse.address
        if(this.walletAddress!="")
            this.connected=true
    },

    async generate(){
      const {valid} = await this.$refs.form.validate()
      if(valid){
        console.log("Validated: " + this.$refs.form.validate())
        
        this.generating = true
        // Adicionar Genre/Mood/Instruments ao objeto a mandar para o Backend
        this.generateData.genre = 'Blues'
        this.generateData.mood = this.mood
        this.generateData.instruments = this.instruments
        
        
        let ids,audioBin
        //Send POST request to generate Music and handle reply
        console.log("Generate data: ", this.generateData)
        axios.post(`http://localhost:8001/generate`, this.generateData)
            .then(response => {    
              //Handle reply  
              //vou receber o audio e os ids 

              audioBin = new Uint8Array(response.data.audio.data)
              ids = response.data.ids
              const audio = new Audio()
              console.log(ids)
              const fileObject = new File([audioBin],  { type: 'audio/wav' })
              this.sampleUrl = URL.createObjectURL(fileObject)
              this.audio = fileObject
              
              audio.src = this.sampleUrl
              this.audioDuration = audio.duration
              this.musicUploaded=true 

              console.log("----Music Generated----")
              
            },(error) =>{
                console.log(error)
            })
          
            // Abrir a caixa de mint da música depois do POST feito e resposta recebida
            this.dialogMint = true
            this.mintable = true
            
        }
    },

    async mintGeneratedPressed() {

      const {valid} = await this.$refs.form2.validate()

      if(valid && this.mintable == true){
        console.log(this.audio)

        //Upload audio file to Pinata
        const pinataAudio = await pinFileToIPFS(this.audio);
        if (!pinataAudio.success) {
            return {
                success: false,
                status: "😢 Something went wrong while uploading your tokenURI.",
            }
        }else{
          this.metadata.animation_url = pinataAudio.pinataUrl;
          this.sampleData.animation_url = pinataAudio.pinataUrl
        }

        // Metadata to be sent to Mint Function
        this.metadata.attributes[0].value = this.artist
        this.metadata.attributes[1].value = this.duration
        this.metadata.attributes[2].value = this.genre
        this.metadata.attributes[3].value = this.mood
        let i
        for(i=0; i<this.instruments.length; i++){
          const newTrait = {
            trait_type: "Instrument",
            value: ""
          }
          newTrait.value = this.instruments[i]
          this.metadata.attributes[i+4] = newTrait
        }

        // Sample Data to be sent to DB
        this.sampleData.walletOwner = this.walletAddress
        this.sampleData.description = this.metadata.description
        this.sampleData.name = this.metadata.name
        this.sampleData.attributes = this.metadata.attributes
        this.sampleData.value = this.value

        // Call metamask mint function
        const { success, status } = await mintGenerated(this.value, this.metadata)

        if(success){
            const data = {objects: [this.sampleData, this.newID]};
            axios.post(`http://localhost:8001/mintSample`, data)
                .then(function(response){
                    console.log(response)
                },(error) =>{
                    console.log(error);
            });
          }
        
      }else{
        console.log("Invalid Fields")
      }
    }
  },

  computed: {

    validateGenres () {
      return [
        this.genre!= "" || "Select a Genre"
      ]
    },

    validateMoods () {
      return [
        this.mood!="" || "Select a Mood"
      ]
    },

    validateInstruments () {
      return [
        this.instruments.length > 0 || "Select at least one Instrument"
      ]
    }
  },
}
</script>
  

<style>
  .botao{
    left:10px;
    top:20px;
  }

  .title{
    color: #00E676;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
   font-size: 20px;
   }

  .style_boxs{
    color: #ffffff;
  }

  .searchbar{    
    position: relative;
    width: 500px;
    height: 150px; 
    background-color: #d9d9d9a8;
    border-radius: 10px;
  }

  .texto{ 
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    color: #000000;  
  } 

  .v-select{
      box-shadow: none;
      max-height: 46px;
      background-color: #eee;
      color: black
    }
      
</style>
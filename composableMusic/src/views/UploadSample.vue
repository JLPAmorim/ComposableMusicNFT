<template>
  <div>
    <TopBar />

    <div style="backgroundColor: #222b2e; height: 100vh;" >
      <!--Top description:-->
      <v-card-text class="d-flex justify-center align-baseline">
        <p :style="style_description" class="title">
          Composable music NFTs is a new AI assisted platform that can create original music from yours and other featured artists music creations.
        </p>
      </v-card-text>
      
        <v-form v-model="valid" ref="form" >
          <v-container fluid>
            <v-row dense="6">
              <v-col cols="6">
                <v-row>
                  <!-------------- Music Genre ----------------->
                  <v-col cols="5" class="mt-16">
                    <p class="title ml-6">Choose your music genre:</p>
                    <v-select
                      v-model="genre"
                      label="Music Genre"
                      :items="genreList"
                      :rules="rules.required"
                      required
                      density="comfortable"
                      class="ml-6 mt-10"
                    />
                  </v-col>
                  <!-------------- Music Mood ----------------->
                  <v-col cols="5" class="mt-16">
                    <p class="title ml-6">Choose your music mood:</p>
                    <v-select
                      v-model="mood"
                      label="Music Mood"
                      :items="moodList"
                      :rules="rules.select"
                      required
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
              </v-col>
              <!--Sample Name, artist, value and description:-->
              <v-col cols="4" class="mt-16 ml-10">
                <v-text-field
                  v-model="metadata.name"
                  :rules=[...rules.required,...rules.length45]
                  label="Sample Name"
                  type="text"
                  color=#00E676
                  class="custom-label-color"
                  required
                />

                <v-text-field
                  v-model="artist"
                  :rules=[...rules.required,...rules.length30]
                  label="What's your Artist Name?"
                  color=#00E676
                  class="custom-label-color"
                  type="text"
                />
                <v-text-field
                  v-model="value"
                  :rules=[...rules.required,...rules.length7,...rules.value,...rules.zeroLimit]
                  label="Sample Value"
                  type="text"
                  color=#00E676
                  class="custom-label-color"
                  counter
                />
                <v-textarea
                  v-model="metadata.description"
                  :rules=[...rules.required,...rules.length150]
                  auto-grow
                  variant="filled"
                  label="Write a short description about your Sample"
                  rows="2"
                  color=#00E676
                  class="custom-label-color"
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          <!--Linha upload sample, botão mint e preview-->
          <v-row>
            <p class="title mt-10 ml-9">Upload Sample</p>
          </v-row>
          <v-row style="padding-top:1.45%">
            <v-col cols="5" style="padding-left:4.45%" >
              <v-file-input
                v-model="sampleFile"
                ref="sampleInput"
                label="Upload Sample"
                accept="audio/*"
                prepend-icon="mdi-cloud-upload"
                show-size
                color=#00E676
                style="padding-right:10%"
                class="custom-label-color ml-1"
                @change="uploadAudio()"
                @drop.prevent="dragover = false"
                @dragover.prevent="dragover = false"
                @dragenter.prevent="dragover = false"
                @dragleave.prevent="dragover = false"
              ></v-file-input>       
            </v-col>
            
            <v-col cols="1"></v-col>
            <v-col cols="4" style="padding-left:2%">
              <!--Botão de mint, caso wallet conectada-->
                <v-btn v-if="this.connected" :width="500" :height="55" color=#00E676
                  class="white--text ml-16" @click="mintArtistPressed()" >
                    Mint
                  </v-btn>
                  <!--Botão conect Wallet, caso não esteja conectada:-->
                  <v-btn 
                    v-else :width="550" 
                    :height="55" 
                    color=#00E676
                    class="mb-6 ml-16 white--text" 
                    @click="connectWalletPressed()">
                    Connect Wallet
                  </v-btn>
            </v-col>
          </v-row>
          <!--Music Player (only showed if already uploaded):-->
          <v-row v-if="!musicUploaded" style="padding-top:4%"/>
          <v-row >
                <v-col cols="6" style="padding-left:5.45%">
                  <MusicPlayer v-if="sampleUrl!=''" :musicLink="sampleUrl"/>
                </v-col>
          </v-row>
        </v-container>
      </v-form>
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
import {connectWallet, getCurrentWalletConnected, mintArtist} from "../utils/metamask.js"
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
      /*Rules to ensure the fields were correctly filled*/
      rules: {
        required: [ v => !!v || "This field is required!" ],
        select: [v => !!v || 'This is required'] ,
        length7: [v => (v && v.length <= 7) || "Field must be less or equal than 7 characters!"],
        zeroLimit: [v => ( v && v > 0 ) || "Sample Value must be HIGHER than 0",],
        length30: [v => (v && v.length <= 30) || "Field must be less or equal than 30 characters!"],
        length45: [v => (v && v.length <= 45) || "Field must be less or equal than 45 characters!"],
        length150: [v => (v && v.length <= 150) || "Field must be less or equal than 45 characters!"],
        value: [v => /^(0|[1-9]\d*)(\.\d+)?$/.test(v) || "Value isn\'t valid!"],
      },
      mintable: true,
      connected: false, 
      status: "",
      walletAddress: "",
      validForm: false,
      
      artist: "",
      duration: "3:34",
      genreList: ["Rock","Pop","Classic"],  /*Genres offered */
      moodList: ["Sad", "Happy", "Love", "Epic"], /*Moods offered */
      genre: "",
      mood: "",
      instruments: [],
      sampleFile: "",
      sampleUrl: "",
      value: "",
      audio: [],
      musicUploaded:false,
      newID: 0,
      //Metadata Object sent to IPFS
      metadata: {
          description: "",
          image: "https://gateway.pinata.cloud/ipfs/QmUmXJLWKhxSHtPdQvy8aYnMkGRXbgbkqFJmtQAMoq8Ukr",
          name: "",
          animation_url: "",
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
        samplesUsed: [],
        audio: []
      }
    }
  },
  /*Ensure wallet is connected: */
  async created() {
      const {address, status} = await getCurrentWalletConnected()
      this.walletAddress = address
      this.status = status
      if(this.walletAddress!="")
          this.connected=true
      axios.get('http://localhost:8001/getSupply')
        .then(res => {
          this.newID = res.data.samples + 1
          console.log(this.newID)
      }) 
  },
  methods:{
    // Type of variable help
    type(value) {
      var regex = /^[object (S+?)]$/;
      var matches = Object.prototype.toString.call(value).match(regex) || [];
  
      return (matches[1] || 'undefined').toLowerCase();
    },
      // Cria um novo audio element
    uploadAudio() {
      const audio = new Audio()
      const file = this.$refs.sampleInput.files[0]
      const fileObject = new File([file], file.name)
      this.sampleUrl = URL.createObjectURL(fileObject)
      // Set the source of the audio file to the selected file
      audio.src = this.sampleUrl
      // Listen for the "loadedmetadata" event, which is triggered when
      // the duration of the audio file is available
      audio.addEventListener("loadedmetadata", () => {
        // Output the duration of the audio file
        this.duration = audio.duration
        console.log(this.duration)
      })
      this.musicUploaded=true
      this.audio = file
    },
    /*When button connect wallet pressed:*/
    async connectWalletPressed(){
        const walletResponse = await connectWallet()
        this.status = walletResponse.status
        this.walletAddress = walletResponse.address
        if(this.walletAddress!="")
            this.connected=true
    },
    /*When button mint artist pressed:*/
    async mintArtistPressed() {
      const {valid} = await this.$refs.form.validate()
      if(valid && this.musicUploaded){
        console.log("im in")
        const audio = this.$refs.sampleInput.files[0]
        const pinataAudio = await pinFileToIPFS(audio);
        if (!pinataAudio.success) {
            return {
                success: false,
                status: "😢 Something went wrong while uploading your tokenURI.",
            }
        }else{
          this.metadata.animation_url = pinataAudio.pinataUrl
          this.sampleData.animation_url = pinataAudio.pinataUrl
        }              
        
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
        this.sampleData.walletOwner = this.walletAddress
        this.sampleData.description = this.metadata.description
        this.sampleData.name = this.metadata.name
        this.sampleData.attributes = this.metadata.attributes
        this.sampleData.value = this.value
    
        const { success, status } = await mintArtist(this.value, this.metadata)
        if(success){
            /*
            O objetivo é agora que temos o newID, com o id que vamos usar no nome, quando fizermos o post em /mintSample usando o this.sampleData, enviamos 
            também o newID e do lado do backend é usado para nome. 
            É também enviado o audio. Temos o audio dentro do objeto sampleData e do lado do backend guardamos a música no Path dele
           
            */
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(this.audio)
            fileReader.onload = (event) => {
              //this.sampleData.audio = new Uint8Array(event.target.result)
                  if (event.target.readyState == FileReader.DONE){
                    const arrayBuffer = event.target.result
                    let array = new Uint8Array(arrayBuffer)
                    for (const element of array) {
                        this.sampleData.audio.push(element);
                      }
            
                      const data = {objects: [this.sampleData, this.newID]};
                      axios.post(`http://localhost:8001/mintSample`, data)
                          .then(function(response){
                              console.log(response)
                          },(error) =>{
                              console.log(error);
                      });
                  }
            }   
        }
      }else{
        console.log("Invalid Fields")
      }
    },
  },
  
  computed: {
    validateGenres () {
      return [
        this.genre!="" || "Select a Genre"
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
  .custom-label-color {
    color: #FAFAFA;
  } 

</style>
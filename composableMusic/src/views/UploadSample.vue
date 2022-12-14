<template>
  <div v-bind:style="{ backgroundColor: '#1A2326' }">
    <TopBar />

      <v-card-text class="d-flex justify-center align-baseline">
        <p :style="style_description">
          Composable music NFTs is a new AI system that can create original,
          realistic musics from your music creations. It can combine ______,
          ______ and ______
        </p>
      </v-card-text>
      
        <v-form v-model="valid" ref="form">
          <v-container fluid>
            <v-row dense="6">
            <v-col cols="2" class="ml-5">
              <p class="title">Choose your music genre:</p>
              <v-checkbox
                class="style_boxs"
                v-model="genre"
                label="Rock"
                value="Rock"
                :rules="validateGenres"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="genre"
                label="Pop"
                value="Pop"
                :rules="validateGenres"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="genre"
                label="Classic"
                value="Classic"
                :rules="validateGenres"
              ></v-checkbox>
               
            </v-col>
            <!-------------------------------------------------->
            <v-col cols="2">
              <p class="title">Choose your music mood:</p>
              <v-checkbox
                class="style_boxs"
                v-model="mood"
                label="Sad"
                value="Sad"
                :rules="validateMoods"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="mood"
                label="Happy"
                value="Happy"
                :rules="validateMoods"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="mood"
                label="Love"
                value="Love"
                :rules="validateMoods"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="mood"
                label="Epic"
                value="Epic"
                :rules="validateMoods"
              ></v-checkbox>
            </v-col>
            <!-------------------------------------------------->
            <v-col cols="2">
              <p class="title">Instruments included:</p>
                <v-checkbox
                  class="style_boxs"
                  v-model="instruments"
                  label="Piano"
                  value="Piano"
                  :rules="validateInstruments"
                ></v-checkbox>
                <v-checkbox
                  class="style_boxs"
                  v-model="instruments"
                  label="Drums"
                  value="Drums"
                  :rules="validateInstruments"
                ></v-checkbox>
                <v-checkbox
                  class="style_boxs"
                  v-model="instruments"
                  label="Electric Guitar"
                  value="Electric Guitar"
                  :rules="validateInstruments"
                ></v-checkbox>
                <v-checkbox
                  class="style_boxs"
                  v-model="instruments"
                  label="Bass"
                  value="Bass"
                  :rules="validateInstruments"
                ></v-checkbox>
                <v-checkbox
                  class="style_boxs"
                  v-model="instruments"
                  label="Classical Guitar"
                  value="Classical Guitar"
                  :rules="validateInstruments"
                ></v-checkbox>
                <v-checkbox
                  class="style_boxs"
                  v-model="instruments"
                  label="Violin"
                  value="Violin"
                  :rules="validateInstruments"
                ></v-checkbox>
            </v-col>

            <!------------Espaçamento-->
            <v-col cols="1">
              <div class="ma-4"></div>
            </v-col>
            <!-------------------------------------------------->
            <!-------------------Vídeo:------------------------------->
            <v-col cols="4">
              <div>
                <v-img
                  width="500"
                  :aspect-ratio="1"
                  src="https://i.imgur.com/L7h7hKd.png"
                ></v-img>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5" class="ml-16">
              <v-text-field
              v-model="metadata.name"
              :rules=[...rules.required,...rules.length45]
              label="Sample Name"
              type="text"
              required
            />
            </v-col>

            <v-col cols="1"></v-col>

            <v-col cols="4" >
              <v-file-input
                v-model="sampleFile"
                ref="sampleInput"
                label="Upload Sample"
                accept="audio/*"
                prepend-icon="mdi-cloud-upload"
                show-size
                @change="uploadAudio()"
              ></v-file-input>
            </v-col>
            
            
          </v-row>
          <v-row>
            <v-col cols="5" class="ml-16">
              <v-text-field
              v-model="artist"
              :rules=[...rules.required,...rules.length30]
              label="What's your Artist Name?"
              type="text"
            />
            </v-col>
            <v-col cols="1"></v-col>
            
            <v-col cols="4">
            <MusicPlayerHome v-if="sampleUrl!=''" :priceParent="value" :musicLink="sampleUrl"/>
            
                  

            </v-col>
            
          </v-row>

          <v-row>
            <v-col cols="5" class="ml-16">
              <v-text-field
              v-model="value"
              :rules="rules.value"
              label="Sample Value"
              type="text"
              class="text--white"
            />
            </v-col>
          </v-row>
          
          <v-row>
            <v-col cols="5" class="ml-16">
              <v-textarea
                v-model="metadata.description"
                :rules=[...rules.required,...rules.length150]
                auto-grow
                variant="filled"
                label="Write a short description about your Sample"
                rows="2"
                counter
              ></v-textarea>
            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="5">
              <v-btn v-if="this.connected" :width="450" :height="55" color="green" 
                class="mb-6 ml-16 white--text" @click="mintArtistPressed()">
                  Mint
                </v-btn>
                <v-btn v-else :width="450" :height="55" color="green" class="mb-6 ml-16 white--text" @click="connectWalletPressed()">
                  Connect Wallet
                </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
        
      
      <BottomBar />
  
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import BottomBar from "../components/BottomBar.vue";
import UploadSample from "../components/UploadSample.vue";
import MusicPlayer from '../components/MusicPlayerHome.vue';
import MusicPlayerHome from '../components/MusicPlayerHome.vue';
import {connectWallet, getCurrentWalletConnected, mintArtist} from "../utils/metamask.js"
import axios from 'axios'

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
        color: "#67FFC9",
        fontFamily: "Poppins",
        fontWeight: "800",
      },

      rules: {
        required: [ v => !!v || 'This field is required!' ],
        length30: [v => (v && v.length <= 30) || "Field must be less or equal than 30 characters!"],
        length45: [v => (v && v.length <= 45) || "Field must be less or equal than 45 characters!"],
        length150: [v => (v && v.length <= 150) || "Field must be less or equal than 45 characters!"],
        value: [v => /^[0-9]\d*(\.\d+)?$/.test(v) || 'Value isn\'t valid!'],
      },
      
      mintable: true,
      connected: false,
      status: "",
      walletAddress: "",
      

      artist: "",
      // Arranjar maneira de ir buscar a duração da sample
      duration: "3:34",
      genre: "",
      mood: "",
      instruments: [],
      sampleFile: "",
      sampleUrl: "",

      value: "",

      metadata: {
          description: "",
          image: "https://gateway.pinata.cloud/ipfs/QmUmXJLWKhxSHtPdQvy8aYnMkGRXbgbkqFJmtQAMoq8Ukr",
          name: "",
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
      sampleData:{
        walletOwner: "",
        countMinted: "0",
        description: "",
        image: "https://gateway.pinata.cloud/ipfs/QmUmXJLWKhxSHtPdQvy8aYnMkGRXbgbkqFJmtQAMoq8Ukr",
        name: "",
        attributes: [],
        value: "",
        soundFile: undefined
      }
    }
  },

  async created() {
        const {address, status} = await getCurrentWalletConnected()
        this.walletAddress = address
        this.status = status
        if(this.walletAddress!="")
            this.connected=true
    },

    /*watch: {
        accounts: {
            handler: function(val, oldVal){
                this.addWalletListener()
            },
            deep: true
        }
    },*/

    methods:{

        uploadAudio() {
          // Create a new audio element
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
        },
      
        validateForms () {
          this.$refs.form.validate()
        },

        async connectWalletPressed(){
            const walletResponse = await connectWallet()
            this.status = walletResponse.status
            this.walletAddress = walletResponse.address
            if(this.walletAddress!="")
                this.connected=true
        },

        

        async mintArtistPressed() {
            
            //Try CATCH verificar mintNFT com sucesso
            if(this.$refs.form.validate()){
              this.metadata.attributes[0].value = this.artist
              this.metadata.attributes[1].value = this.duration
              this.metadata.attributes[2].value = this.genre
              this.metadata.attributes[3].value = this.mood

              this.sampleData.walletOwner = this.walletAddress
              this.sampleData.description = this.metadata.description
              this.sampleData.name = this.metadata.name
              this.sampleData.attributes = this.metadata.attributes
              this.sampleData.value = this.value
              //this.sampleData.soundFile

              let i
              for(i=0; i<this.instruments.length; i++){
                const newTrait = {
                  trait_type: "Instrument",
                  value: ""
                }
                newTrait.value = this.instruments[i]
                this.metadata.attributes[i+4] = newTrait
              }

              console.log("Value: " + this.value)
              console.log(this.metadata)
              
              const { success, status } = await mintArtist(this.value, this.metadata)
              console.log(status)
              console.log("--------------------")
              console.log(this.sampleData)

              
              if(success){
                axios.post(`http://localhost:8001/mintSample`, this.sampleData)
                    .then(function(response){
                        console.log(response)
                    },(error) =>{
                        console.log(error);
                });
              }
            }else{
              console.log("Invalid Fields")
            }

            
        },

        log(){
           console.log("Connected: " + this.connected + " Mintable: " + this.mintable)
        }

        /*addWalletListener() {
            if (window.ethereum) {
                window.ethereum.on("accountsChanged", (accounts) =>{
                if (accounts.length > 0) {
                    console.log("Foo")
                    this.walletAddress = accounts[0] 
                    this.status = "👆🏽 Write a message in the text-field above."
                } else {
                    this.walletAddress = ""
                    this.status = "🦊 Connect to Metamask using the top right button."
                }
                });
            } else {
                this.status = "You must install Metamask, a virtual Ethereum wallet, in your browser."
            }
        },*/

        /*async mintGeneratedPressed() {
            //Try CATCH verificar mintNFT com sucesso
            
            const { status } = await mintGenerated(this.value, this.metadata)
                    
            //TODO Mandar pra BD
            this.status = status
        }*/
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


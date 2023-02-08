<template>

    <TopBar ref="TopBar_Ref"/>
    <div style="backgroundColor: #1A2326; min-height: 82.7vh;" >
    <v-container class="container">
        <div >
        <v-tabs
            v-model="tab"
            color="#00E676"
        >
            <v-tab value="option-1">
            <v-icon start>
                mdi-view-list
            </v-icon>
            ALL NFT'S ({{allCount}})
            </v-tab>
            <v-tab value="option-2">
            <v-icon start>
                mdi-account-music
            </v-icon>
            Uploaded Samples ({{sampleCount}})
            </v-tab>
            <v-tab value="option-3">
            <v-icon start>
                mdi-music
            </v-icon>
            Generated Musics ({{generatedCount}})
            </v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item value="option-1">
                <v-container>
                    <v-card-text v-if="this.connected">
                        <v-row v-for="row in rowsAll" :key="row">
                            <v-col v-for="nft in row" :key="nft" cols="2" sm="2" xs="6">
                                <NFTDisplay :name="nft.name" :imageUrl="nft.image_url" :musicUrl="nft.animation_url" :price="nft.value" :permalink="nft.permalink" :collection="nft.collection.name"/>
                            </v-col>
                        </v-row>
                        
                        <v-row>
                            <h1>Wallet Not Connected</h1>
                        </v-row>
                    </v-card-text>
                    <v-card-text v-else>                        
                        <v-row>
                            <v-col cols="5"/>
                            <h1 justify-center>Wallet Not Connected</h1>
                        </v-row>
                        <v-row class="">
                            <v-col cols="5"/>
                            <v-btn 
                                :width="290" 
                                :height="55" 
                                color=#00E676
                                class="mt-16 mr- white--text" 
                                @click="connectWalletPressed()">
                                Connect Wallet
                            </v-btn>
                        </v-row>
                    </v-card-text>
                </v-container>
            </v-window-item>
            <v-window-item value="option-2">
                <v-container>
                    <v-card-text v-if="this.connected">
                        <v-row v-for="row in rowsSample" :key="row">
                            <v-col v-for="nft in row" :key="nft" cols="2" sm="2" xs="6">
                                <NFTDisplay :artist="nft.attributes[0].value" :name="nft.name" :imageUrl="nft.image" :musicUrl="nft.animation_url" :price="nft.value"/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text v-else>                        
                        <v-row>
                            <v-col cols="5"/>
                            <h1 justify-center>Wallet Not Connected</h1>
                        </v-row>
                        <v-row class="">
                            <v-col cols="5"/>
                            <v-btn 
                                :width="290" 
                                :height="55" 
                                color=#00E676
                                class="mt-16 mr- white--text" 
                                @click="connectWalletPressed()">
                                Connect Wallet
                            </v-btn>
                        </v-row>
                    </v-card-text>
                </v-container>
            </v-window-item>
            <v-window-item value="option-3">
                <v-container>
                    <v-card-text v-if="this.connected">
                        <v-row v-for="row in rowsGenerated" :key="row">
                            <v-col v-for="nft in row" :key="nft" cols="2" sm="2" xs="6">
                                <NFTDisplay :artist="nft.attributes[0].value" :name="nft.name" :imageUrl="nft.image" :musicUrl="nft.animation_url" :price="nft.value" />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text v-else>                        
                        <v-row>
                            <v-col cols="5"/>
                            <h1 justify-center>Wallet Not Connected</h1>
                        </v-row>
                        <v-row class="">
                            <v-col cols="5"/>
                            <v-btn 
                                :width="290" 
                                :height="55" 
                                color=#00E676
                                class="mt-16 mr- white--text" 
                                @click="connectWalletPressed()">
                                Connect Wallet
                            </v-btn>
                        </v-row>
                    </v-card-text>
                </v-container>
            </v-window-item>
        </v-window>
        </div>
    </v-container>
    </div>
    <BottomBar />
</template>

  
<script>

import TopBar from "../components/TopBar.vue";
import BottomBar from "../components/BottomBar.vue";
import NFTDisplay from "../components/NFTDisplay.vue";
import {connectWallet, getCurrentWalletConnected} from "../utils/metamask.js"
import axios from 'axios'

export default {

    components: {
        TopBar,
        BottomBar,
        NFTDisplay,
    },

    data() {
        return {
            //Wallet variables
            tab: 'option-1',
            connected: false,
            status: "",
            walletAddress: "",
            allNFTS: [],
            allCount: 0,
            sampleNFTS: [],
            sampleCount: 0,
            rowsSample: 0,
            generatedNFTS: [],
            generatedCount: 0,
            image: "https://i.seadn.io/gcs/files/b59d885a2723a66df5f1d2330e4c8a17.png?w=500&auto=format"
        }
    },

    //verificar se wallet connected:
    async created() {
        const { address, status } = await getCurrentWalletConnected()
        this.walletAddress = address
        this.status = status

        if (this.walletAddress != ""){
            this.connected = true
        }

        axios.get(`https://api.opensea.io/api/v1/assets?owner=0xD9c00b9cDB1d45CF265d1925eb1d004ee04D9f69`)
            .then(res => {
                this.allNFTS = res.data.assets
                this.allCount = this.allNFTS.length
                console.log(this.allNFTS)
            })

        axios.get('http://localhost:8001/samplesByWallet', {headers: {wallet: this.walletAddress}})
            .then(res => {
                for(let i = 0; i<res.data.samples.length;i++){
                    if(res.data.samples[i].samplesUsed.length==0){
                        this.sampleNFTS[this.sampleCount] = res.data.samples[i]
                        this.sampleCount++
                    }
                    if(res.data.samples[i].samplesUsed.length!=0){
                        this.generatedNFTS[this.generatedCount] = res.data.samples[i]
                        this.generatedCount++
                    }
                }
        })    
    },

    methods: {
        /*When button connect wallet pressed:*/
        async connectWalletPressed(){
            const walletResponse = await connectWallet()
            location.reload()
        },
    },

    computed: {
        /*Compute the number of nfts:*/
        rowsAll() {
            let rows = [];
            for (let i = 0; i < this.allNFTS.length; i += 6) {
                rows.push(this.allNFTS.slice(i, i + 6));
            }
            return rows;
        },
        /*Compute the number of uploaded samples:*/
        rowsSample() {
            let rows = [];
            for (let i = 0; i < this.sampleNFTS.length; i += 6) {
                rows.push(this.sampleNFTS.slice(i, i + 6));
            }
            return rows;
        },
        /*Compute the number of generated musics:*/
        rowsGenerated() {
            let rows = [];
            for (let i = 0; i < this.generatedNFTS.length; i += 6) {
                rows.push(this.generatedNFTS.slice(i, i + 6));
            }
            return rows;
        }
  }

    
}
</script>
  

<style>
.botao {
    left: 10px;
    top: 20px;
}

.title {
    color: #00E676;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
}

.notConectedMessage {
    color: #FAFAFA;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
}

.style_boxs {
    color: #ffffff;
}

.searchbar {
    position: relative;
    width: 500px;
    height: 150px;
    background-color: #d9d9d9a8;
    border-radius: 10px;
}

.texto {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    color: #000000;
}

.v-select {
    box-shadow: none;
    max-height: 46px;
    background-color: #eee;
}

.v-container{
    color: #ffffff;
}

</style>
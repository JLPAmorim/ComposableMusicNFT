<template>
    <div>
        <TopBar ref="TopBar_Ref"/>

        <div style="backgroundColor: #1A2326;">

            <!--Últimas músicas compradas pelo utilizador:-->
            <v-container fluid>
                <p style="color: #EEEBD9;
                        fontFamily: Poppins;
                        fontWeight: 800;
                        fontSize: 20px;">
                    Your Latest Purchases:
                </p>

                <!--Mensagem se wallet não conectada:-->
                <v-card-text v-if="!this.connected" class="d-flex justify-center align-baseline">
                    <p class="notConectedMessage">
                        We would love to show you your lastest purchases, but
                        <button class="connect-button" v-bind="props" @click="$refs.TopBar_Ref.showMenuWallet()">
                            <span style="color: #00E676; padding-left: 5px; padding-right: 5px;">
                                you need to connect your wallet first!
                            </span>
                        </button>
                    </p>
                </v-card-text>

                <!--NFTs:-->
                <v-row >
                    <v-col v-for="gennft in generatedNFTS" :key="gennft._id" cols="4" sm="3" xs="6">
                        <!--Se a wallet conectada:-->
                        <NFTDisplay v-if="this.connected" :name="gennft.name" :imageUrl="gennft.image" :musicUrl="gennft.animation_url" :price="gennft.value"/>
                        <!--Se a wallet não conectada:-->
                        <NFTDisplay v-else>name="" imageUrl="" musicUrl="" price=""</NFTDisplay>
                    </v-col>
                </v-row>
            </v-container>

            <!----------------------------------------->

            <!--Últimas samples adicionadas pelo utilizador:-->
            <v-container fluid>
                <p style="color: #EEEBD9;
                fontFamily: Poppins;
                fontWeight: 800;
                fontSize: 20px;">
                    The Latest Samples You Uploaded:
                </p>

                <!--Mensagem se wallet não conectada:-->
                <v-card-text v-if="!this.connected" class="d-flex justify-center align-baseline" >
                    <p class="notConectedMessage">
                        We would love to show you your lastest purchases, but
                        <button class="connect-button" v-bind="props" @click="$refs.TopBar_Ref.showMenuWallet()">
                            <span style="color: #00E676; padding-left: 5px; padding-right: 5px;">
                                you need to connect your wallet first!
                            </span>
                        </button>
                    </p>
                </v-card-text>

                <!--NFTs:-->
                <v-row >
                    <v-col v-for="samplenft in sampleNFTS" :key="samplenft._id" cols="4" sm="3" xs="6">
                        <!--Se a wallet conectada:-->
                        <NFTDisplay v-if="this.connected" :name="samplenft.name" :imageUrl="samplenft.image" :musicUrl="samplenft.animation_url" :price="samplenft.value"/>
                        <!--Se a wallet não conectada:-->
                        <NFTDisplay v-else>name="" imageUrl="" musicUrl="" price=""</NFTDisplay>
                    </v-col>
                </v-row>
            </v-container>


        </div>
        <BottomBar />
    </div>
</template>

  
<script>

import TopBar from "../components/TopBar.vue";
import BottomBar from "../components/BottomBar.vue";
import NFTDisplay from "../components/NFTDisplay.vue";
import {getCurrentWalletConnected} from "../utils/metamask.js"
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
            connected: false,
            status: "",
            walletAddress: "",
            sampleNFTS: [],
            
            generatedNFTS: [],
            generatedCount: 0
           
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

        axios.get('http://localhost:8001/samplesByWallet', {headers: {wallet: this.walletAddress}})
            .then(res => {
                var sampleCount = 0
                var generatedCount = 0
                for(let i = 0; i<res.data.samples.length && (sampleCount<=4 || generatedCount<=4);i++){
                    if(res.data.samples[i].samplesUsed.length==0){
                        this.sampleNFTS[sampleCount] = res.data.samples[i]
                        sampleCount++
                    }else{
                        this.generatedNFTS[generatedCount] = res.data.samples[i]
                        generatedCount++
                    }
                }
                
                console.log(res)
        })    
    },

    methods: {
        clickme(){
            console.log("Samples: " + this.sampleNFTS)
        console.log("Generated: " + this.generatedNFTS)
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
</style>
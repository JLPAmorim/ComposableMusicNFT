<template >
    <v-app>
        <v-container fill-height fluid>
            <v-card>
                <!----<v-card-text class="text-prop mt-10" style="font-size: 3vh">
                    <v-row align="center" justify="center">
                        <p>Connect Metamask</p>
                    </v-row>
                </v-card-text>
                <v-row class="pt-10 pb-10" align="center" justify="center">
                    <v-btn v-if="!connected" @click="connect()">Connect Metamask</v-btn>
                    <v-btn v-else @click="mint()">Mint NFT</v-btn>
                </v-row>-->

                <div className="Minter">
                    <v-btn v-if="walletAddress==''" id="walletButton" @click="connectWalletPressed()">
                        
                        <span>Connect Wallet</span>
                    </v-btn>
                    <v-btn v-else id="walletButton" @click="connectWalletPressed()">
                        
                        <span>Connected: {{this.walletAddress}}</span>
                        <v-btn @click="onMintPressed()">Mint</v-btn>
                    </v-btn>

                    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
                    <p>
                        Simply add your asset's link, name, and description, then press "Mint."
                    </p>

                    <p>
                        {{this.status}}
                    </p>
                    <v-btn @click="clicamos()">
                        CLICK
                    </v-btn>
                </div>
            </v-card>
            
            
        </v-container>
    </v-app>
</template>

<script>
import {connectWallet, getCurrentWalletConnected, mintNFT} from "../utils/metamask.js"
import dotenv from 'dotenv'
export default {
     data(){
        return{
            description: "",
            name: "",
            status: "",
            url: "",
            walletAddress: "",
            value: "0.02ETH",
            nameSample: "Sample Music: Jazz Music",
            metadata: {
                loudness: "",
            },
            env: ""
        }
    },

    //Utilizador Novo conecta -> this.walletAddress "" -> HTTP POST do Endereço
    //Utilizador Antigo conecta -> this.walletAddress " -> HTTP GET dos dados para aquele endereço
    // POST para dados de carteira
    
    async created() {
        const {address, status} = await getCurrentWalletConnected()
        this.walletAddress = address
        this.status = status
        console.log("Address: " + this.walletAddress + " Status: " + this.status)
        this.env = process.env.APP_ALCHEMY_KEY

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

        clicamos(){
            console.log(this.env)
        },
        
        async connectWalletPressed(){
            const walletResponse = await connectWallet();
            this.status = walletResponse.status
            this.walletAddress = walletResponse.address
            console.log("Status:" + this.status)
            console.log("Wallet: " + this.walletAddress)
            const key = dotenv.APP_PINATA_KEY;
            const secret = dotenv.APP_PINATA_SECRET;
            console.log("Key: " + key)
            console.log("Secret: " + secret)
        },
        
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
        
            async onMintPressed() {
                //Try CATCH verificar mintNFT com sucesso
                const { status } = await mintNFT(this.value, this.nameSample, this.metadata);
                //TODO Mandar pra BD
                setStatus(status);
            }
        
        
    }
}
</script>
  
  
  
  
  
<style>
  
</style>
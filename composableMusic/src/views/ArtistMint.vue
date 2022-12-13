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
                        <v-btn @click="mintArtistPressed()">Mint</v-btn>

                        <v-btn @click="mintGeneratedPressed()">Mint</v-btn>
                    </v-btn>

                    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
                    <p>
                        Simply add your asset's link, name, and description, then press "Mint."
                    </p>

                    <p>
                        {{this.status}}
                    </p>
                </div>
            </v-card>
            
            
        </v-container>
    </v-app>
</template>

<script>
import {connectWallet, getCurrentWalletConnected, mintArtist} from "../utils/metamask.js"
export default {
     data(){
        return{
            status: "",
            walletAddress: "",
            value: "0.2",

            artist: "Quim Barreiros",
            duration: "3:34",
            genre: "Jazz",
            mood: "Happy",
            instrument: "Piano",

            metadata: {
                description: "",
                image: "https://gateway.pinata.cloud/ipfs/QmUmXJLWKhxSHtPdQvy8aYnMkGRXbgbkqFJmtQAMoq8Ukr",
                name: "Cabritinha",
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
                    },
                    {
                        trait_type: "Instrument",
                        value: ""
                    }
                ],
            },

        }
    },

    //Utilizador Novo conecta -> this.walletAddress "" -> HTTP POST do Endereço
    //Utilizador Antigo conecta -> this.walletAddress " -> HTTP GET dos dados para aquele endereço
    // POST para dados de carteira
    
    async created() {
        const {address, status} = await getCurrentWalletConnected()
        this.walletAddress = address
        this.status = status
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

        async connectWalletPressed(){
            const walletResponse = await connectWallet();
            this.status = walletResponse.status
            this.walletAddress = walletResponse.address
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
        
            async mintArtistPressed() {
                //Try CATCH verificar mintNFT com sucesso

                this.metadata.attributes[0].value = this.artist
                this.metadata.attributes[1].value = this.duration
                this.metadata.attributes[2].value = this.genre
                this.metadata.attributes[3].value = this.mood
                this.metadata.attributes[4].value = this.instrument
                
                const { status } = await mintArtist(this.value, this.metadata)
                        
                //TODO Mandar pra BD
                this.status = status
            },

            /*async mintGeneratedPressed() {
                //Try CATCH verificar mintNFT com sucesso
                
                const { status } = await mintGenerated(this.value, this.metadata)
                        
                //TODO Mandar pra BD
                this.status = status
            }*/
        
        
    }
}
</script>
  
  
  
  
  
<style>
  
</style>


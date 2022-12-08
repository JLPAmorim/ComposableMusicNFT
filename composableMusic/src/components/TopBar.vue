<template>
    <div>
        <v-app-bar class="top_bar" style="backgroundColor: #1a2326 ;"> 

        <v-app-bar-title class="top_bar_title" :style="style_title">Composable Music NFTs </v-app-bar-title>
        <!--<v-column>
        <v-app-bar-title class="top_bar_title" :style="style_title">
            <v-row weight=0>Composable</v-row>
            <v-row> Music NFTs </v-row>
        </v-app-bar-title>
        </v-column>-->

        <v-spacer></v-spacer>
        <v-column style="padding-right: 2.5%;">
            <!--Icone search-->
            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-magnify</v-icon>
            </v-btn>
            
            <!--Icone e menu wallet-->
            <!--<v-menu
                :close-on-content-click="false"
                v-model="showMenu"
            >-->
            <v-menu
                :close-on-content-click="false"
                v-model="showMenu"
            >
                <template v-slot:activator="{ props }">
                <v-btn 
                    v-bind="props"
                    >
                    <v-icon style="color: #FDFDFD">mdi-wallet-outline</v-icon>
                </v-btn>
                </template>
                
                <v-list style=" backgroundColor: #242121">
                    <!--Titulo menu:-->
                    <v-list-item>
                        <p v-if="walletAddress==''" class="font-weight-medium text-white bg-dark">Connect Wallet:</p>
                        <p v-else id="walletButton" class="font-weight-medium text-white bg-dark">Wallet Connected:</p>
                    </v-list-item>

                    <!--Connect Wallet:-->
                    <v-list-item>
                        <v-container fill-height fluid>
                            
                                <!----<v-card-text class="text-prop mt-10" style="font-size: 3vh">
                                    <v-row align="center" justify="center">
                                        <p>Connect Metamask</p>
                                    </v-row>
                                </v-card-text>
                                <v-row class="pt-10 pb-10" align="center" justify="center">
                                    <v-btn v-if="!connected" @click="connect()">Connect Metamask</v-btn>
                                    <v-btn v-else @click="mint()">Mint NFT</v-btn>
                                </v-row>-->

                                <div className="Minter" >
                                    <!--botão para conectar carteira:-->
                                    <div v-if="walletAddress==''" >
                                            <v-list
                                            
                                            v-if="walletAddress==''" 
                                            style=" backgroundColor: #242121"
                                            >
                                            <v-list-item>
                                                <v-btn 
                                                    color=#00E676
                                                    :width=200
                                                    id="walletButton" 
                                                    @click="connectWalletPressed()">
                                                    
                                                    <span>Connect Wallet</span>
                                                </v-btn>
                                            </v-list-item>
                                            
                                            <v-list-item>
                                                <v-btn 
                                                    color=#EEEBD9
                                                    :width=200>
                                                    
                                                    <span>Help </span>   <!--ToDo: Dialog component com video!!!-->
                                                </v-btn>
                                            </v-list-item>
                                            </v-list>
                                    </div>
                                    <!--botão carteira já conectada:-->
                                    <v-btn 
                                        color=#00E676
                                        v-else id="walletButton" 
                                        @click="connectWalletPressed()">
                                        
                                        <span>Connected: {{this.walletAddress}}</span>
                                    </v-btn>

                                    <p>
                                        {{this.status}}
                                    </p>
                                </div>   
                        </v-container>
                    </v-list-item>


                </v-list>
            </v-menu>

            <!--Icone notificacoes:-->
            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-bell-outline</v-icon>
            </v-btn>

            <!--Icone e menu login:-->
            <v-menu
                :close-on-content-click="false"
                :width=500 
                >
                <template v-slot:activator="{ props }">
                <v-btn v-bind="props">
                    <v-icon style="color: #FDFDFD">mdi-account-outline</v-icon>
                </v-btn>
                </template>
                
                <v-list style=" backgroundColor: #242121">
                    <v-list-item>
                        <p class="font-weight-medium text-white bg-dark">Login/Sign up:</p>
                    </v-list-item>
                    <v-list-item>
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            color = "white"
                            label="E-mail"
                            required
                        ></v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            color = "white"
                            label="Password"
                            required
                        ></v-text-field>
                    </v-list-item>
                    <v-column>
                        <v-list-item class="d-flex justify-center align-baseline">
                            <v-btn 
                            color=#00E676>
                            <p> Login </p>
                            </v-btn>
                            
                            <v-btn 
                            color="#242121">
                            <p class="font-weight-medium text-white bg-dark"> Forgot your password? </p>
                            </v-btn>
                        </v-list-item>
                    </v-column>
                    <v-list-item>
                        <p class="font-weight-medium text-white bg-dark">Not Registered yet?:</p>
                    </v-list-item>
                    <v-list-item class="d-flex justify-center align-baseline">
                        <v-btn 
                        color=#00E676
                        :width=200>
                         <p> Sign Up </p>
                        </v-btn>
                    </v-list-item>

                </v-list>
            </v-menu>

            <!--Icone Carrinho:-->
            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-cart-minus</v-icon>
            </v-btn>
        </v-column>
        </v-app-bar>
    </div>
</template>

<script>
  import {connectWallet, getCurrentWalletConnected, mintNFT} from "../utils/metamask.js"

  export default {
    data(){
        return{
            description: "",
            name: "",
            status: "",
            url: "",
            walletAddress: "",
            /*value: "0.02ETH",
            nameSample: "Sample Music: Jazz Music",
            metadata: {
                loudness: "",
            },*/
            showMenu : false,
        }
    },

    //Utilizador Novo conecta -> this.walletAddress "" -> HTTP POST do Endereço
    //Utilizador Antigo conecta -> this.walletAddress " -> HTTP GET dos dados para aquele endereço
    // POST para dados de carteira
    
    async created() {
        const {address, status} = await getCurrentWalletConnected()
        this.walletAddress = address
        //this.status = status
    },

    methods:{
        async connectWalletPressed(){
            const walletResponse = await connectWallet();
            //this.status = walletResponse.status
            this.walletAddress = walletResponse.address
        },

        //acionado evento no top bar, para conectar wallet:
        showMenuWallet(){
            //this.showMenu = true;
            
            if(!this.showMenu ){
                this.showMenu = true;
            }
            else {
                this.showMenu = false;
            }
        }

    }
}
</script>

<style scoped>
.top_bar_title{
font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 62px;

color: rgba(2, 228, 148, 0.9);

text-shadow: 0px 2.76827px 2.76827px rgba(0, 0, 0, 0.25);
}

</style>
<template>
    <div>
        <v-app-bar class="top_bar" style="backgroundColor: #1a2326 ;"> 
        
        <!--Logo:---------------------------->
        <nav>
            <RouterLink 
                style="text-decoration: none; color: inherit;"
                to="/">      
                <v-app-bar-title class="top_bar_title" :style="style_title">Composable Music NFTs </v-app-bar-title>
            </RouterLink>
        </nav>

        <v-spacer></v-spacer>
        <v-column style="padding-right: 2.5%;">
            
            <!--Resources:--------------------->
            <v-menu
                :close-on-content-click="false"
                :width=350
                >
                <template v-slot:activator="{ props }">
                <v-btn  v-bind="props">
                    <p class="style_resources">Explore</p>
                </v-btn>
                </template>
                
                <v-list style=" backgroundColor: #242121">
                   
                    <v-list-item>
                        <v-container fill-height fluid>
                                <div class="text-center"  >
                                    <div>
                                            <v-list
                                            style=" backgroundColor: #242121"
                                            >
                                            <!--botão create your own Music:-->
                                            <v-list-item
                                                style=" padding-bottom: 15px">
                                                <nav>
                                                    <RouterLink 
                                                        style="text-decoration: none; color: inherit;"
                                                        to="/generate">   
                                                        <v-btn 
                                                            color=#EEEBD9
                                                            :width=250
                                                            class="noUpperCaseButton"
                                                            >                                        
                                                            <span class="style_buttons">Create your own Music</span>
                                                        </v-btn>
                                                    </RouterLink>
                                                </nav>

                                            </v-list-item>
                                            
                                            <!--Botão Upload Sample:-->
                                            <v-list-item
                                                style=" padding-bottom: 15px">
                                                <nav>
                                                    <RouterLink 
                                                        style="text-decoration: none; color: inherit;"
                                                        to="/uploadsample/">   
                                                        <v-btn 
                                                            color=#EEEBD9
                                                            :width=250
                                                            class="noUpperCaseButton">                                        
                                                            <span class="style_buttons">Upload Your Sample</span>
                                                        </v-btn>
                                                    </RouterLink>
                                                </nav>

                                            </v-list-item>

                                            <!--botão user Page:-->
                                            <v-list-item style=" padding-bottom: 15px">
                                                <nav>
                                                    <RouterLink style="text-decoration: none; color: inherit;" to="/userPage">
                                                        <v-btn color=#EEEBD9 :width=250 class="noUpperCaseButton">
                                                            <span class="style_buttons">Your catalog of NFTs</span>
                                                        </v-btn>
                                                    </RouterLink>
                                                </nav>
                                            
                                            </v-list-item>
                                        </v-list>
                                    </div>
                                </div>
                        </v-container>
                    </v-list-item>


                </v-list>
            </v-menu>



            <!--Icone search---------------------------->
            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-magnify</v-icon>
            </v-btn>
            
            <!--Icone e menu wallet--------------------->
            <v-menu
                :close-on-content-click="false"
                v-model="showMenu"
            >
                <template v-slot:activator="{ props }">
                <v-btn 
                    v-bind="props"
                    v-if="walletAddress==''"
                    >
                    <v-icon style="color: #FDFDFD">mdi-wallet-outline</v-icon>
                </v-btn>
                <v-btn 
                    v-bind="props"
                    v-else id="walletButton" 
                    >
                    <v-icon style="color: #00E676">mdi-wallet-outline</v-icon>
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
                                            
                                            <!--Botão Help:-->
                                            <v-list-item>
                                                
                                                <div class="text-center" >
                                                    <v-dialog
                                                    v-model="dialogHelp"
                                                    
                                                    >
                                                    <template v-slot:activator="{ props}">
                                                    
                                                        <v-btn 
                                                            v-bind="props"
                                                            color=#EEEBD9
                                                            :width=200
                                                            >
                                                            <span>Help </span> 
                                                        </v-btn>
                                                    </template>
                                                    
                                                    <!--Dialog menu Help Metamask:-->
                                                    <v-card style="opacity: 1.0">
                                                        <v-card-text>
                                                            <a style="color=#0b0f0e; fontFamily: Poppins; fontWeight: 800; background-color: transparent; "
                                                                target="_blank" 
                                                                href="https://metamask.io/download/">Install Metamask for your browser </a>
                                                            <p align="center" >
                                                                <iframe width="560" height="315" src="https://www.youtube.com/embed/YVgfHZMFFFQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                            </p>

                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-btn color="#0b0f0e" block @click="dialogHelp = false">Close Dialog</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                    </v-dialog>
                                                </div>
                                                
                                            
                                            
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

            <!--Icone notificacoes:---------------------->
            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-bell-outline</v-icon>
            </v-btn>

            <!--Icone e menu login (for future usage):---------------------->
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

            <!--Icone Carrinho:--------------------->
            <v-btn icon>
                <v-icon style="color: #FDFDFD">mdi-cart-minus</v-icon>
            </v-btn>
        </v-column>
        </v-app-bar>
    </div>
</template>

<script>
  import {connectWallet, getCurrentWalletConnected} from "../utils/metamask.js"
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
            dialogHelp: false,
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
        },
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
    padding-left: 15px;
}
.style_resources{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 900;
    font-size: 15px;
    color: rgba(256, 256, 256, 0.9);
}
.style_buttons{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
}
.noUpperCaseButton{
    text-transform: unset !important;
}
</style>
<template>
    <div>
        <TopBar ref="TopBar_Ref" />

        <div style="backgroundColor: #222b2e; min-height: 100vh">


            <v-container class="mx-auto" style="max-width: 1000px">

                <!--Why musicians should use CMN:-->
                <v-card style="background-color: #232424;
                                    fontFamily: Poppins;
                                    fontWeight: 800; 
                                    maxWidth: 800px;
                                    opacity:1">
                    <!--Title:-->
                    <v-card-title>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="color: #FAFAFA">
                                I'm a musician/producer, why should I be using <span
                                    style="color: #00E676; padding-left: 5px; padding-right: 5px;">Composable Music
                                    NFTs</span>?
                            </v-col>
                            <v-col cols="8" class="text-grey">
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    Do you have any unfinished pieces of music lying around from your creative process?
                                    You can upload those tracks to our platform and help us produce new songs using your
                                    and other artists' works.
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="padding-top:5%"></v-row>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    Using those small tracks, we usually call samples, we will train our AI models.
                                    Later, those models will be capable of creating new songs on demand.
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="padding-top:5%"></v-row>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    However, unlike many other platforms that use previous creations to train AI models,
                                    we want to compensate the artists for their artwork, especially, as their creations
                                    played a crucial role in our success.

                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="padding-top:5%"></v-row>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    Therefore, whenever you upload a sample to our platform, you will mint it and an NFT
                                    will be created as a digital proof
                                    of your ownership.
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="padding-top:5%"></v-row>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    With that NFT, whenever a music is created by our AI algorithm using a model trained
                                    with your sample, a small percentage of the revenue generated will be distributed to
                                    you.
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <v-col cols="1"></v-col>
                <!---------------------------------------------------------------------->
                <!---------------------------------------------------------------------->
                <!---------------------------------------------------------------------->

                <!--Why content creators should use CMN:-->
                <v-card style="background-color: #232424;
                                                        fontFamily: Poppins;
                                                        fontWeight: 800; 
                                                        maxWidth: 800px;
                                                        opacity:1">
                    <!--Title:-->
                    <v-card-title>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="color: #FAFAFA">
                                I'm a content creator, why should I be using <span
                                    style="color: #00E676; padding-left: 5px; padding-right: 5px;">Composable Music
                                    NFTs</span>?
                            </v-col>
                            <v-col cols="8" class="text-grey">
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    Are you tired of spending countless hours searching for the perfect music for your
                                    videos, advertising, movies, or TikToks?
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="padding-top:5%"></v-row>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    Do you ever feel like you've found the perfect music, but it's been used by
                                    countless other creators?
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="padding-top:5%"></v-row>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    Do you ever come across the music that fits your video, but hesitate to use it for
                                    fear of copyright infringement?

                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="padding-top:5%"></v-row>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    Look no further! With our platform, you can easily create original music on demand
                                    that meets your specific criteria and can be used
                                    without worrying about copyright infringement.
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="padding-top:5%"></v-row>
                        <v-row no-gutters>
                            <v-col cols="12" class="d-flex justify-left" style="font-size: larger;color: #FAFAFA">
                                <v-row no-gutters>
                                    Plus, owning an NFT associated with the music you've just purchased gives you the
                                    added benefit of being able to resell
                                    it in the future.
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

            </v-container>


        </div>
        <BottomBar />
    </div>
</template>

  
<script>
import TopBar from "../components/TopBar.vue";
import BottomBar from "../components/BottomBar.vue";
import NFTDisplay from "../components/NFTDisplay.vue";
import { connectWallet, getCurrentWalletConnected, mintArtist } from "../utils/metamask.js"
import axios from 'axios'
import { pinFileToIPFS } from '../utils/pinata.js'
export default {
    components: {
        TopBar,
        BottomBar,
        NFTDisplay,
    },
    data() {
        return {
            //Wallet variables
        }
    },
}
</script>
  

<style>
.title {
    color: #00E676;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
}
.texto {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    color: #000000;
}
</style>
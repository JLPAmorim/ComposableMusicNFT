<template>
    <div>
        <v-app-bar class="top_bar" :style="style_header">

        <v-app-bar-title class="top_bar_title" :style="style_title">Composable Music NFTs </v-app-bar-title>
        <!--<v-column>
        <v-app-bar-title class="top_bar_title" :style="style_title">
            <v-row weight=0>Composable</v-row>
            <v-row> Music NFTs </v-row>
        </v-app-bar-title>
        </v-column>-->

        <v-spacer></v-spacer>
        <v-column>
            <v-btn icon>
                <v-icon :style="style_icons">mdi-magnify</v-icon>
            </v-btn>
                
            <v-btn icon>
                <v-icon :style="style_icons">mdi-credit-card-outline</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon :style="style_icons">mdi-bell</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon :style="style_icons">mdi-account</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon :style="style_icons">mdi-cart-minus</v-icon>
            </v-btn>
        </v-column>
        </v-app-bar>
    </div>
</template>


<script>
  export default {
    data: () => ({
        style_header:{
            backgroundColor: "#1A2326" 
        },
        style_icons:{
            color: "#FDFDFD"
        },
        /*style_title:{
            fontFamily: 'Poppins',
            fontStyle: normal,
            fontWeight: 700,
            fontSize: 30,

            color: rgba(2, 228, 148, 0.9);
        }*/
    }),
  }
</script>

<style scoped>
/*.top_bar{
    background-color: #212121;
}*/

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
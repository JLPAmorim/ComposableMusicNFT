<template>
    <div>
        <v-app-bar class="top_bar">

        <v-app-bar-title class="top_bar_title">Composable Music NFTs </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
            
        <v-btn icon>
            <v-icon>mdi-credit-card-outline</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-cart-minus</v-icon>
        </v-btn>

        </v-app-bar>
    </div>
</template>


<style scoped>

.top_bar{
    background-color: rgb(26, 35, 38);  /*não está a funcionar!!!*/
}

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
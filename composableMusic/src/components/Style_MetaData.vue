<template>
    <v-container fluid>
      <v-row>
        <v-col cols="2.5">
        <p class="title"> Choose your music style:</p>
        <v-checkbox class="style_boxs"
          v-model="selected_styles"
          label="Jazz"
          value="Jazz"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected_styles"
          label="Rock"
          value="Rock"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected_styles"
          label="Ambient"
          value="Ambient"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected_styles"
          label="Classic"
          value="Classic"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected_styles"
          label="R&B"
          value="R&B"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected_styles"
          label="Rap"
          value="Rap"
        ></v-checkbox>
      </v-col>
      <!-------------------------------------------------->
      <v-col cols="2.5">
        <p class="title"> Choose your music mood:</p>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Chill"
          value="Chill"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Love"
          value="Love"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Sad"
          value="Sad"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Epic"
          value="Epic"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Tense"
          value="Tense"
        ></v-checkbox>
      </v-col>
      <!-------------------------------------------------->
      <v-col cols="2.5">

        <p class="title"> Instruments included:</p>
        <v-responsive
          class="overflow-y-auto"
        max-height="450"
        >
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Piano"
          value="Piano"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Drums"
          value="Drums"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Electric Guitar"
          value="Electric Guitar"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Bass"
          value="Bass"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Classical Guitar"
          value="Classical Guitar"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Violin"
          value="Violin"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Trumpet"
          value="Trumpet"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Saxophone"
          value="Saxophone"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Harmonica"
          value="Harmonica"
        ></v-checkbox>
        <v-checkbox class="style_boxs"
          v-model="selected"
          label="Trombone"
          value="Trombone"
        ></v-checkbox>
      </v-responsive>
      </v-col>
      <!-------------------------------------------------->
      <!-------------------Vídeo:------------------------------->
      <v-col cols="2.5">
       
        <div class="ma-4">
          <v-img
            width="350"
            :aspect-ratio="1"
            src="https://i.imgur.com/L7h7hKd.png" 
          ></v-img>
        </div>
      </v-col>
      </v-row>
      <!-------------------------------------------------->
      <v-row>
        <!--<div class="d-flex justify-center align-baseline" style="gap: 1rem">
          <v-btn
            :loading="loading[2]"
            :disabled="loading[2]"
            color=#00E676
            prepend-icon="mdi-cart-minus"
            @click="load(2)"
            >
          Add to Cart
          </v-btn>
        </div>-->

      </v-row>

    </v-container>
</template>
  

<script>
    export default {
      data () {
        return {
          //selected: ['John'],
          /*selected_style_jazz: [],
          selected_style_rock: [],
          selected_style_ambient: [],
          selected_style_classic: [],
          selected_style_rb: [],
          selected_style_rap: [],*/
          selected_styles: [],
        }
      },
      methods: {

        sendStyle(){
          this.$emit('event_SendStyle', this.selected_styles)
          //console.log(this.selected_styles)
          console.log("testeStyle")
        }

      }
    }
</script>

  
<style>
.title{
 color: #00E676;
 font-family: 'Poppins';
 font-style: normal;
 font-weight: 700;
font-size: 20px;
}

.style_boxs{
  color: #E2DFD2;
}
</style>

<!--/* Choose the genre: */

position: absolute;
width: 186px;
height: 30px;
left: 70px;
top: 188px;

font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 30px;
/* identical to box height */
text-align: center;

color: #02E494;-->


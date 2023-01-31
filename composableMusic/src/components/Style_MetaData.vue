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
        v-model="selected_moods"
        label="Chill"
        value="Chill"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_moods"
        label="Love"
        value="Love"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_moods"
        label="Sad"
        value="Sad"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_moods"
        label="Epic"
        value="Epic"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_moods"
        label="Tense"
        value="Tense"
      ></v-checkbox>
    </v-col>
    <!-------------------------------------------------->
    <v-col cols="2.5">

      <p class="title" style="padding-bottom: 20px"> Instruments included:</p>
      <v-responsive
        class="overflow-y-auto"
        max-height="450"
      >
      <v-checkbox class="style_boxs"
        v-model="selected_instruments"
        label="Piano"
        value="Piano"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_instruments"
        label="Drums"
        value="Drums"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_instruments"
        label="Electric Guitar"
        value="Electric Guitar"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_instruments"
        label="Bass"
        value="Bass"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_instruments"
        label="Classical Guitar"
        value="Classical Guitar"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_instruments"
        label="Violin"
        value="Violin"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_instruments"
        label="Trumpet"
        value="Trumpet"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_instruments"
        label="Saxophone"
        value="Saxophone"
      ></v-checkbox>
      <v-checkbox class="style_boxs"
        v-model="selected_instruments"
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
    <v-col cols="1.5">
     
      <div class="ma-4 left-align">
        <p class="title_artists" style="padding-bottom: 20px"> Featured artists on CMN:</p>
        <v-carousel ref="carousel" :show-arrows="false" interval="2000" hide-delimiters :cycle=carouselCycle :slides-per-view="4"
          height="100%" width="100%"  @mouseover="stopCarousel" @mouseout="startCarousel" >
          <div class="carousel-container">
            <v-carousel-item v-for="item in items" :key="item.src">
              <img :src="item.src" :alt="item.alt" style="width: 300px; height: 300px;" class="image-zoom">
              <div class="image-title" style="width: 300px; height: 20px;">{{item.title}}</div>
            </v-carousel-item>
          </div>
        </v-carousel>
      </div>
    </v-col>
    </v-row>
    <!-------------------------------------------------->

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
        selected_moods: [],
        selected_instruments: [],

        carouselCycle: true,

        items: [
          { src: 'https://i.imgur.com/JqBZUgZ.png', title: 'Jay Som' },
          { src: 'https://i.seadn.io/gae/3WHDS2eMHAsgFKVsFqHs4_RtV2sNpPPqZdI8QSMjaUMTFYyZzu4IGN1d1nOQbpmQT_Z_FWL1cnt-DcvYnBjCLz2zdQnMspmX0CyP?auto=format&w=384', title: '' },
          { src: 'https://scontent.fopo5-2.fna.fbcdn.net/v/t39.30808-6/273934507_4368643439902885_4051852629877148302_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=itPrZhP5fP4AX_xYCE4&_nc_ht=scontent.fopo5-2.fna&oh=00_AfDxbkb2l5HUzOXgSMQnLEteL4vda1lEUFG09U7ji_Us2g&oe=63D874B2', title: 'Jepards' },
          { src: 'https://i.imgur.com/JqBZUgZ.png', title: 'Image 4' },
        ],
      }
    },
    methods: {

      sendStyle(){
        this.$emit('event_SendStyle', this.selected_styles)
        //console.log(this.selected_styles)
        console.log("testeStyle")
      },

      stopCarousel() {
        this.carouselCycle = false;
      },
      startCarousel() {
        this.carouselCycle = true;
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

.title_artists {
  color: #FAFAFA;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
}

.style_boxs{
  color: #E2DFD2;
}

.v-carousel {
  width: 100%;
}

.v-carousel-item {
  width: 100%;
}

.image-title {
  position: absolute;
  font-family: 'Poppins';
  bottom: 5%;
  left: 0;
  width:25%;
  background: rgba(0, 0, 0, 0.5);
  /* or any other color */
  color: white;
  /* or any other color */
  padding: 5px;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-container {
  margin-left: 0px;
}

.left-align {
  position: relative;
  left: 80px;
  top: 30px;
}

.v-carousel {
  width: 100%;
}
                  
.v-carousel-item {
  width: 100%;
}
                  
.image-title {
  position: absolute;
  font-family: 'Poppins';
  bottom: 5%;
  left: 0;
  width: 25%;
  background: rgba(0, 0, 0, 0.0);
  /* or any other color */
  color: white;
  /* or any other color */
  padding: 5px;
  font-weight: 700;
  text-align: center;
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


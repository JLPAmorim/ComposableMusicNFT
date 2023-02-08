<template>
  <v-container fluid>
    <v-row>
      <!--Columns style, mood and instruments:-->
      <!--Column Style-->
      <v-col cols="2.5">
        <p class="title"> Choose your music style:</p>
        <v-checkbox class="style_boxs" v-model="selected_styles" label="Jazz" value="Jazz"></v-checkbox>
        <v-checkbox class="style_boxs" v-model="selected_styles" label="Rock" value="Rock"></v-checkbox>
        <v-checkbox class="style_boxs" v-model="selected_styles" label="Ambient" value="Ambient"></v-checkbox>
        <v-checkbox class="style_boxs" v-model="selected_styles" label="Classic" value="Classic"></v-checkbox>
        <v-checkbox class="style_boxs" v-model="selected_styles" label="R&B" value="R&B"></v-checkbox>
        <v-checkbox class="style_boxs" v-model="selected_styles" label="Rap" value="Rap"></v-checkbox>
      </v-col>
      <!-------------------------------------------------->
      <!--Column Mood-->
      <v-col cols="2.5">
        <p class="title"> Choose your music mood:</p>
        <v-checkbox class="style_boxs" v-model="selected_moods" label="Chill" value="Chill"></v-checkbox>
        <v-checkbox class="style_boxs" v-model="selected_moods" label="Love" value="Love"></v-checkbox>
        <v-checkbox class="style_boxs" v-model="selected_moods" label="Sad" value="Sad"></v-checkbox>
        <v-checkbox class="style_boxs" v-model="selected_moods" label="Epic" value="Epic"></v-checkbox>
        <v-checkbox class="style_boxs" v-model="selected_moods" label="Tense" value="Tense"></v-checkbox>
      </v-col>
      <!-------------------------------------------------->
      <!--Column Instruments-->
      <v-col cols="2.5">

        <p class="title" style="padding-bottom: 20px"> Instruments included:</p>
        <v-responsive class="overflow-y-auto" max-height="450">
          <v-checkbox class="style_boxs" v-model="selected_instruments" label="Piano" value="Piano"></v-checkbox>
          <v-checkbox class="style_boxs" v-model="selected_instruments" label="Drums" value="Drums"></v-checkbox>
          <v-checkbox class="style_boxs" v-model="selected_instruments" label="Electric Guitar"
            value="Electric Guitar"></v-checkbox>
          <v-checkbox class="style_boxs" v-model="selected_instruments" label="Bass" value="Bass"></v-checkbox>
          <v-checkbox class="style_boxs" v-model="selected_instruments" label="Classical Guitar"
            value="Classical Guitar"></v-checkbox>
          <v-checkbox class="style_boxs" v-model="selected_instruments" label="Violin" value="Violin"></v-checkbox>
          <v-checkbox class="style_boxs" v-model="selected_instruments" label="Trumpet" value="Trumpet"></v-checkbox>
          <v-checkbox class="style_boxs" v-model="selected_instruments" label="Saxophone"
            value="Saxophone"></v-checkbox>
          <v-checkbox class="style_boxs" v-model="selected_instruments" label="Harmonica"
            value="Harmonica"></v-checkbox>
          <v-checkbox class="style_boxs" v-model="selected" label="Trombone" value="Trombone"></v-checkbox>
        </v-responsive>
      </v-col>
      <!-------------------------------------------------->
      <!-------------------Featured artists::------------------------------->
      <v-col cols="1.5">
        <div class="ma-4 left-align">
          <!--Title:-->
          <p class="title_artists" style="padding-bottom: 20px"> Featured artists on CMN:</p>
          <!--Carousel (stops rotating when the mouse is over it):-->
          <v-carousel ref="carousel" :show-arrows="false" interval="2000" hide-delimiters :cycle=carouselCycle
            :slides-per-view="4" height="100%" width="100%" @mouseover="stopCarousel" @mouseout="startCarousel">
            <div class="carousel-container">
              <v-carousel-item v-for="item in items" :key="item.src">
                <img :src="item.src" :alt="item.alt" style="width: 300px; height: 300px;" class="image-zoom">
                <div class="image-title" style="width: 300px; height: 20px;">{{ item.title }}</div>
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
  data() {
    return {
      selected_styles: [],
      selected_moods: [],
      selected_instruments: [],
      carouselCycle: true,
      /*Feature artists images and titles:*/
      items: [
        { src: 'https://i.imgur.com/JqBZUgZ.png', title: 'Jay Som' },
        { src: 'https://i.seadn.io/gae/3WHDS2eMHAsgFKVsFqHs4_RtV2sNpPPqZdI8QSMjaUMTFYyZzu4IGN1d1nOQbpmQT_Z_FWL1cnt-DcvYnBjCLz2zdQnMspmX0CyP?auto=format&w=384', title: '' },
        { src: 'https://bolimg.blob.core.windows.net/producao/imagens/espectaculos/cartaz99277_grande.jpg', title: 'Jepards' },
        { src: 'https://i1.sndcdn.com/avatars-000624943866-900afx-t500x500.jpg', title: 'Jimmy' },
      ],
    }
  },
  methods: {
    /*For future use (sending the selected boxs to other component):*/
    sendStyle() {
      this.$emit('event_SendStyle', this.selected_styles)
      console.log("testeStyle")
    },
    /*Allows to stop the carousel when the mouse is place over it:*/
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
.title {
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
.style_boxs {
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
  width: 25%;
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

<template>
  <div v-bind:style="{ backgroundColor: '#1A2326' }">
    <TopBar />
    <v-row align="start" no-gutters style="height: 880px">
      <!--<v-card-text style="style_description">
        This is content
      </v-card-text>-->

      <v-card-text class="d-flex justify-center align-baseline">
        <p :style="style_description">
          Composable music NFTs is a new AI system that can create original,
          realistic musics from your music creations. It can combine ______,
          ______ and ______
        </p>
      </v-card-text>
      <Bt_AddCart />
      <UploadChoose />
      <v-container fluid>
        <v-row dense="6">
          <v-col cols="2">
            <p class="title">Choose your music style:</p>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Jazz"
              value="Jazz"
            ></v-checkbox>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Rock"
              value="Rock"
            ></v-checkbox>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Ambient"
              value="Ambient"
            ></v-checkbox>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Classic"
              value="Classic"
            ></v-checkbox>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="R&B"
              value="R&B"
            ></v-checkbox>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Rap"
              value="Rap"
            ></v-checkbox>
          </v-col>
          <!-------------------------------------------------->
          <v-col cols="5.0">
            <p class="title">Choose your music mood:</p>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Chill"
              value="Chill"
            ></v-checkbox>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Love"
              value="Love"
            ></v-checkbox>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Sad"
              value="Sad"
            ></v-checkbox>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Epic"
              value="Epic"
            ></v-checkbox>
            <v-checkbox
              class="style_boxs"
              v-model="selected"
              label="Tense"
              value="Tense"
            ></v-checkbox>
          </v-col>
          <!-------------------------------------------------->
          <v-col cols="6.0">
            <p class="title">Instruments included:</p>
            <v-responsive class="overflow-y-auto" max-height="450">
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Piano"
                value="Piano"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Drums"
                value="Drums"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Electric Guitar"
                value="Electric Guitar"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Bass"
                value="Bass"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Classical Guitar"
                value="Classical Guitar"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Violin"
                value="Violin"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Trumpet"
                value="Trumpet"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Saxophone"
                value="Saxophone"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Harmonica"
                value="Harmonica"
              ></v-checkbox>
              <v-checkbox
                class="style_boxs"
                v-model="selected"
                label="Trombone"
                value="Trombone"
              ></v-checkbox>
            </v-responsive>
          </v-col>

          <!------------Espaçamento-->
          <v-col cols="4">
            <div class="ma-4"></div>
          </v-col>
          <!-------------------------------------------------->
          <!-------------------Vídeo:------------------------------->
          <v-col cols="3">
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
      </v-container>
      <UploadSample />
      <BottomBar />
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TopBar from "../components/TopBar.vue";
import BottomBar from "../components/BottomBar.vue";
import UploadSample from "../components/UploadSample.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    TopBar,
    UploadSample,
    BottomBar,
  },
  data: () => ({
    style_description: {
      color: "#67FFC9",
      fontFamily: "Poppins",
      fontWeight: "800",
    },
  }),
});
</script>

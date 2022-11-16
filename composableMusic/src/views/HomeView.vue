<template>
  <div v-bind:style="{ backgroundColor: '#1A2326'}">
    <!--<v-navigation-drawer
        v-model="drawer"
        temporary
      >
      <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          title="John Leider"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
    </v-navigation-drawer>-->
    <TopBar/>
    
    <v-card-text class="d-flex justify-center align-baseline">
      <p :style="style_description">
        Composable music NFTs is a new AI system that can create original, realistic musics from your music creations. It can combine ______, ______ and ______
      </p>
    </v-card-text>
    
    
    
    <Style_MetaData/>
    <Bt_AddCart/>
    <BottomBar/>
  </div>
  
  <!--<v-container fluid>
      <v-row class = "first_row" style="style_rows" rows="2.5">
        
      </v-row> 
  </v-container> -->  
</template>

<script>
import { defineComponent } from 'vue';
import TopBar from '../components/TopBar.vue';
import BottomBar from '../components/BottomBar.vue';
import Bt_AddCart from '../components/Bt_AddCart.vue';
import Style_MetaData from '../components/Style_MetaData.vue';

// Components
//import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    TopBar,
    BottomBar,
    Bt_AddCart,
    Style_MetaData
  },
  data: () => ({
        style_description:{
          color: "#67FFC9",
          fontFamily: 'Poppins',
          fontWeight: "800",
        }
        /*style_rows:{
            backgroundColor: "#1A2326" 
        }*/
  })
})
</script>

<style>
/*.first_row{
  background-color: black;
  color: black;
}*/

</style>

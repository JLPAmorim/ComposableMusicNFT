<template>
    <div v-bind:style="{ backgroundColor: '#1A2326' }">
     
    <TopBar/>
    <v-container>
        <v-row
        align="start"
        no-gutters
        
        style="height: 880px"
        >
            <v-container>
                <v-row>
                  <v-col cols="2.5">
                  <p class="title"> Choose the genre:</p>
                  <v-checkbox class="style_boxs"
                    v-model="selected_styles"
                    label="Ambient"
                    value="Ambient"
                  ></v-checkbox>
                  <v-checkbox class="style_boxs"
                    v-model="selected_styles"
                    label="Indie"
                    value="Hip Hop"
                  ></v-checkbox>
                  <v-checkbox class="style_boxs"
                    v-model="selected_styles"
                    label="R&B"
                    value="R&B"
                  ></v-checkbox>
                  <v-checkbox class="style_boxs"
                    v-model="selected_styles"
                    label="Classic"
                    value="Classic"
                  ></v-checkbox>
                  
                </v-col>
                <!-------------------------------------------------->
                <v-col cols="2.5">
                  <p class="title"> Choose the mood:</p>
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
                <v-col cols="2.5">
          
                    <p class="title" style="padding-bottom: 20px"> Choose the lenght of it:</p>
                    <v-responsive
                      class="overflow-y-auto"
                      max-height="450"
                    >
                    <v-checkbox class="style_boxs"
                      v-model="selected_duration"
                      label="0s-30s"
                      value="0s-30s"
                    ></v-checkbox>
                    <v-checkbox class="style_boxs"
                      v-model="selected_duration"
                      label="31s-1:30min"
                      value="31s-1:30min"
                    ></v-checkbox>
                    <v-checkbox class="style_boxs"
                      v-model="selected_duration"
                      label="1:30min-3:00min"
                      value="Electric Guitar"
                    ></v-checkbox>
                    <v-checkbox class="style_boxs"
                      v-model="selected_duration"
                      label="3:00min-5:00min"
                      value="3:00min-5:00min"
                    ></v-checkbox>
                    <v-checkbox class="style_boxs"
                      v-model="selected_duration"
                      label="+5:00min"
                      value="+5:00min"
                    ></v-checkbox>
                  </v-responsive>
                  </v-col>
                  <v-col cols="2.5">
          
                    <p class="title" style="padding-bottom: 20px"> Choose your Budget:</p>
                    <v-responsive
                      class="overflow-y-auto"
                      max-height="450"
                    >
                    <v-checkbox class="style_boxs"
                      v-model="selected_budget"
                      label="3€"
                      value="3€"
                    ></v-checkbox>
                    <v-checkbox class="style_boxs"
                      v-model="selected_budget"
                      label="5€"
                      value="5€"
                    ></v-checkbox>
                    <v-checkbox class="style_boxs"
                      v-model="selected_budget"
                      label="10€"
                      value="10€"
                    ></v-checkbox>
                    <v-checkbox class="style_boxs"
                      v-model="selected_budget"
                      label="20€"
                      value="20€"
                    ></v-checkbox>
                    <v-checkbox class="style_boxs"
                      v-model="selected_budget"
                      label="25€"
                      value="25€"
                    ></v-checkbox>
                  </v-responsive>
                  </v-col>
                </v-row>
               
        
       <v-row>
       
        <v-col>
            <v-responsive>
             <v-container fluid>  
            <v-btn
                class="botao"
                color=#00E676
                :width=450
                :height=80
              
                @click="$refs.Style_MetaData_Ref.sendStyle()" 
                >
                <p class="texto"> Generate </p>
            </v-btn>
        </v-container> 
        </v-responsive> 
        </v-col> 
        <v-col > 
            <v-responsive>
           <v-container  class="searchbar">
            <h1 class="texto">Insert some other keywords here</h1>
            <v-text-field 
            label="Ex:French,Vintage..."
            ></v-text-field>
        </v-container>
    </v-responsive> 
        </v-col>
        
    </v-row>
  </v-container>
</v-row>
    </v-container> 
      <bottom-bar/>
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import TopBar from "../components/TopBar.vue";
  import BottomBar from "../components/BottomBar.vue";
  import Style_MetaData from '../components/Style_MetaData.vue';

  export default defineComponent({
    name: "HomeView",
  
    components: {
    TopBar,
    BottomBar,
    Style_MetaData
   
},



    data: () => ({
 
    }),
    
  methods:{
    //recebe styles do filho:
    getStyles(value){
      console.log(value);
    },

  },
  
  setupPageHeight() {
      const { name } = useDisplay()

      const pageHeight = computed(() => {
        // name is reactive and
        // must use .value
        switch (name.value) {
          case 'xs': return 1250
          case 'sm': return 1000
          case 'md': return 800
          case 'lg': return 650
          case 'xl': return 500
          case 'xxl': return 450
        }

        return undefined
      })

      return { pageHeight }
    },

    computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 1250
          case 'sm': return 1000
          case 'md': return 800
          case 'lg': return 650
          case 'xl': return 1000
          case 'xxl': return 1000
        }
      },
    },
})

  </script>
  

  <style>

.botao{
left:10px;
top:20px;



}
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



.searchbar{    
    
position: relative;
width: 500px;
height: 150px; 


background-color: #d9d9d9a8;
border-radius: 10px;
   
   
   


  }
 .texto{
    
font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 28px;

text-align: center;

color: #000000;
    

 } 
</style>
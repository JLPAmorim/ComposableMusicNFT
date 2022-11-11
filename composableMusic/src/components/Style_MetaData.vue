<template>
    <v-container fluid>
      <p> Choose your music style:</p>
      <v-checkbox
        v-model="selected"
        label="Jazz"
        value="Jazz"
      ></v-checkbox>
      <v-checkbox
        v-model="selected"
        label="Rock"
        value="Rock"
      ></v-checkbox>
      <v-checkbox
        v-model="selected"
        label="Ambient"
        value="Ambient"
      ></v-checkbox>
      <v-checkbox
        v-model="selected"
        label="Classic"
        value="Classic"
      ></v-checkbox>
      <v-checkbox
        v-model="selected"
        label="R&B"
        value="R&B"
      ></v-checkbox>
      <v-checkbox
        v-model="selected"
        label="Rap"
        value="Rap"
      ></v-checkbox>
    </v-container>
</template>
  
  
<script>
    export default {
      data () {
        return {
          selected: ['John'],
        }
      },
    }
</script>
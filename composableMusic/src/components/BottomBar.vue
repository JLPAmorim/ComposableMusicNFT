<template >
  
  <!--<v-footer class="bg-grey-darken-4" >-->
  <v-footer style="background-color: #232424;">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Invisible Lab</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Contact Us',
    ],
  }),
}
</script>


<style>
.ft_style{
  background-color: #232424;
}
</style>
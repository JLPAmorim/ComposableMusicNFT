<template>
  <v-footer style="background-color: #232424;" height="100%" absolute class="footerr">
    <v-row justify="center" no-gutters>
      <v-btn :key="home" color="white" variant="text" class="mx-2" rounded="xl"
        v-on:click="redirectToHome">
        {{ home }}
      </v-btn>
      <v-btn :key="aboutUs" color="white" variant="text" class="mx-2" rounded="xl"
        v-on:click="redirectToAboutUs">
        {{ aboutUs }}
      </v-btn>
      <v-btn :key="team" color="white" variant="text" class="mx-2" rounded="xl">
        {{ team }}
      </v-btn>
      <v-btn :key="contactUs" color="white" variant="text" class="mx-2" rounded="xl">
        {{ contactUs }}
      </v-btn>
      <!--Logo InvisibleLab rediricting to their web page:-->
      <v-col class="text-center mt-4" cols="12">
        <a href="https://www.invisiblelab.dev/" style="text-decoration: none;" target="_blank">
          <img src="https://uploads-ssl.webflow.com/60057003af6cfb7362bab247/6005a8ba64602c1ef34c244f_brand.svg"
            alt="Invisible Lab logo" style="width: 100px; height:auto;">
        </a>
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
    home: 'Home',
    aboutUs: 'About Us', 
    team: 'Team',
    contactUs: 'Contact Us'
  }),
  methods: {
    redirectToHome() {
      window.location.href = '/';
    },
    redirectToAboutUs() {
      window.location.href = '/aboutus';
    },
  },
}
</script>

<style>
.ft_style {
  background-color: #232424;
}
</style>

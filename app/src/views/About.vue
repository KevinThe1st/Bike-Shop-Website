<template>
  <div id="about">
    <!-- This is the code for the about page. One can view info about the store
         and a manager should be able to update it from the manage pages tab -->

    <!-- Background image that will stay locked -->
    <img id = "backgroundImgAbout" alt="Vue logo" src="../assets/AboutUsBackground.png" width = 100%>

    <!-- Container for text that can scroll up and down the page -->

    <div class = "container">
      <div class = "row">
        <div class = "col-sm-1"></div>
        <!-- Div for the contact box that appears at the top -->
        <div class = "col-sm-3" id = "contactBox">
          <p id = "location" style="white-space: pre-wrap;">{{location}}</p>
        </div>
        <div class = "col-sm-8">
        </div>
      </div>
    </div>
    <!-- Line breaks to separate the contact box from the bottom text -->
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <!-- Main body content of the page is contained here -->
    <div id = "infoBoxAbout">
      <div class = "container infoBoxContainerAbout">
        <div class = "row">
          <div class = "col-sm-6">
            <p id = "aboutText" style="white-space: pre-wrap;">{{aboutUs}}</p>
          </div>
          <div class = "col-sm-1">
          </div>
          <div class = "col-sm-5">
            <img src = "../assets/AboutUsShop2.png" id = "aboutImage">
          </div>
        </div>
      </div>

      <div class = "container">
        <img src= "../assets/AboutUsBanner3.png" id = "aboutImageBanner">
      </div>

      <br>

      <!-- Brands we carry section of the page -->

      <div class = "container">
        <h3 id = "BrandsText">Brands we carry</h3>
      </div>

      <br>

      <!-- Logos for brands contained below -->

      <div class = "container">
          <div class = "row">
            <div class = "col-sm-1">
            </div>
            <div class = "col-sm-2">
              <img alt="Vue logo" src="../assets/giantLogo.png" class = "logoClass">
            </div>
            <div class = "col-sm-2">
              <img alt="Vue logo" src="../assets/trekLogo.png" class = "logoClass">
            </div>
            <div class = "col-sm-2">
              <img alt="Vue logo" src="../assets/specializedLogo.png" class = "logoClass">
            </div>
            <div class = "col-sm-2">
              <img alt="Vue logo" src="../assets/marinLogo.png" class = "logoClass">
            </div>
            <div class = "col-sm-2">
              <img alt="Vue logo" src="../assets/electraLogo.png" class = "logoClass">
            </div>
            <div class = "col-sm-1">
            </div>
          </div>
        </div>

        <!-- Address is also displayed here -->

        <p id = "bottomTxt" style="white-space: pre-wrap;">{{bottomTxt}}</p>

    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';

@Component({
  components: {
  }

})

export default class About extends Vue {

  aboutUs: string = "I am a placeholder, look at me!\nI am a placeholder, look at me!\n";
  location: string = "Very\nNice\nPlaceholder";
  bottomTxt = "Placeholder";

  mounted(){
    axios
      .get('/api/textbox/location')
      .then((res) => {
        this.location = res.data.text.text;
        this.bottomTxt = res.data.text.text;
      })
    axios
      .get('/api/textbox/about')
      .then((res) => {
        this.aboutUs = res.data.text.text;
      })
  }
}
</script>

<style lang="scss">

.logoClass {
  padding: 5px;
  margin: 5px;
  width: 100%;
}

#about {
  padding: 0px 0px;

}

#BrandsText {
  text-align: center;
}

#textBrand {
  color: black;
}

#aboutImage {
  width: 100%;
}

#backgroundImgAbout {
  position: fixed;

}

#aboutImageBanner {
  width: 100%;
  display: block;
  text-align: center;
}

#infoBoxAbout {
  width: 100%;
  background-color: white;
  height: 1400px;
  position: absolute;
  top: 850px;
  margin: auto 30;
  padding: 50px;
}

#contactBox
{
  top: 400px;
  position: absolute;
  background-color: white;


}

#infoBoxContainerAbout
{
  margin: 50px;
  padding: 50px;
}


#aboutpageText {
  color: #FFFF00;
  font-family: "Courier New", "Times New Roman", serif;
  font-style: italic;
  font-weight: bold;
  position: absolute;
  text-align: center;
  padding: 0px;
  margin: auto 0px;

  font-size: 70px;


}

#bottomTxt {
  padding: 30px;
  text-align: center;
}
</style>

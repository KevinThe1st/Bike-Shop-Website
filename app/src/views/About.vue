<template>
  <div id="about">

    <img id = "backgroundImgAbout" alt="Vue logo" src="../assets/AboutUsBackground.png" width = 100%>


    <div class = "container">
      <div class = "row">
        <div class = "col-sm-1"></div>
        <div class = "col-sm-3" id = "contactBox">
          <p id = "location" style="white-space: pre;">{{location}}</p>
        </div>
        <div class = "col-sm-8">
        </div>
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div id = "infoBoxAbout">
      <div class = "container infoBoxContainerAbout">
        <div class = "row">
          <div class = "col-sm-6">
            <p id = "aboutText" style="white-space: pre;">{{aboutUs}}</p>
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

      <div class = "container">
        <h3 id = "BrandsText">Brands we carry</h3>
      </div>

      <br>

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

  data(){
    return {
      location: this.location,
      aboutUs: this.aboutUs
    }
  }
  mounted(){
    axios
      .get('/api/textbox/location')
      .then((res) => {
        this.location = res.data.item.text;
      })
    axios
      .get('/api/textbox/about')
      .then((res) => {
        this.aboutUs = res.data.item.text;
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
</style>

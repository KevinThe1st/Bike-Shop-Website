<template>
  <div id="about">

    <img id = "backgroundImg" alt="Vue logo" src="../assets/AboutUsBackground.png" width = 100%>


    <div class = "container">
      <div class = "row">
        <div class = "col-sm-1"></div>
        <div class = "col-sm-3" id = "contactBox">
          <div>
            <p>Foxcycle Cyclery</p>
            <p>(805)492-4821</p>
            <p>5934 Grand Ave</p>
            <p>San Luis Obispo, CA 93410</p>
          </div>
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
    <div id = "infoBox">
      <div class = "container infoBoxContainer">
        <div class = "row">
          <div class = "col-sm-6">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie. Luctus venenatis lectus magna fringilla urna. Mattis enim ut tellus elementum sagittis vitae et leo duis. Quis commodo odio aenean sed. Cras sed felis eget velit aliquet. Aliquam sem et tortor consequat id porta nibh venenatis. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Euismod lacinia at quis risus. Facilisis leo vel fringilla est. Neque viverra justo nec ultrices dui sapien eget mi proin.</p>
            <br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie. Luctus venenatis lectus magna fringilla urna.</p>
            <br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie. Luctus venenatis lectus magna fringilla urna. Mattis enim ut tellus elementum sagittis vitae et leo duis. Quis commodo odio aenean sed. Cras sed felis eget velit aliquet. Aliquam sem et tortor consequat id porta nibh venenatis.</p>
            <br>
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

@Component({
  components: {
  }

})
export default class About extends Vue {}
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

#backgroundImg {
  position: fixed;

}

#aboutImageBanner {
  width: 100%;
  display: block;
  text-align: center;
}

#infoBox {
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

#infoBoxContainer
{
  margin: 50px;
  padding: 50px;
}


#homepageText {
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

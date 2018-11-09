<template>
  <div id="about">

    <img id = "backgroundImg" alt="Vue logo" src="../assets/AboutUsBackground.png" width = 100%>


    <div class = "container">
        <div class = "row">
          <div class = "col-sm-1">
          </div>
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie. Luctus venenatis lectus magna fringilla urna. Mattis enim ut tellus elementum sagittis vitae et leo duis. Quis commodo odio aenean sed. Cras sed felis eget velit aliquet. Aliquam sem et tortor consequat id porta nibh venenatis. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Euismod lacinia at quis risus. Facilisis leo vel fringilla est. Neque viverra justo nec ultrices dui sapien eget mi proin. Ullamcorper malesuada proin libero nunc consequat. Pulvinar pellentesque habitant morbi tristique. Enim ut tellus elementum sagittis vitae. Porta nibh venenatis cras sed. Viverra nam libero justo laoreet.
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
#about {
  padding: 50px 0px;

}

#backgroundImg {
  position: fixed;
}

#infoBox {
  width: 100%;
  background-color: white;
  height: 2000px;
  position: absolute;
  top: 1000px;
}

#contactBox
{
  top: 400px;
  position: absolute;
  background-color: white;


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

<template>
  <div id="services">

    <img id = "backgroundImg" alt="Vue logo" src="../assets/BikeRepair.png" width = 100%>


    <div id = "infoBox">
      <div class = "container infoBoxContainer">
        <div class = "row">
          <div class = "col-sm-6">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie. Luctus venenatis lectus magna fringilla urna. Mattis enim ut tellus elementum sagittis vitae et leo duis. Quis commodo odio aenean sed. Cras sed felis eget velit aliquet. Aliquam sem et tortor consequat id porta nibh venenatis. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Euismod lacinia at quis risus. Facilisis leo vel fringilla est. Neque viverra justo nec ultrices dui sapien eget mi proin.</p>
            <br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie. Luctus venenatis lectus magna fringilla urna.</p>
            <br>
          </div>
          <div class = "col-sm-1">
          </div>
          <div class = "col-sm-5">
            <img src = "../assets/servicesMan.png" id = "aboutImage" width = 100%>
          </div>
        </div>
        <br>
        <div class = "row">
          <div class = "col-sm-6">
            <img src = "../assets/servicesAngles.png" width = 100%>
          </div>

          <div class = "col-sm-6">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie. Luctus venenatis lectus magna fringilla urna. Mattis enim ut tellus elementum sagittis vitae et leo duis. Quis commodo odio aenean sed. Cras sed felis eget velit aliquet. Aliquam sem et tortor consequat id porta nibh venenatis. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Euismod lacinia at quis risus. Facilisis leo vel fringilla est. Neque viverra justo nec ultrices dui sapien eget mi proin.</p>
            <br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie. Luctus venenatis lectus magna fringilla urna.</p>
            <br>
          </div>
        </div>

        <br>

        <div class = "row">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu lobortis elementum nibh tellus molestie. Luctus venenatis lectus magna fringilla urna. Mattis enim ut tellus elementum sagittis vitae et leo duis. Quis commodo odio aenean sed. Cras sed felis eget velit aliquet. Aliquam sem et tortor consequat id porta nibh venenatis. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Euismod lacinia at quis risus. Facilisis leo vel fringilla est. Neque viverra justo nec ultrices dui sapien eget mi proin.</p>
          <br>
        </div>

        <div class = "row">
          <div class = "col-sm-12">
            <img src = "../assets/tools.png" width = 100% height = "500px">
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
export default class Services extends Vue {}
</script>

<style lang="scss">

.logoClass {
  padding: 5px;
  margin: 5px;
  width: 100%;
}

#services {
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
  padding: 0px;
  margin: 0px;

}

#aboutImageBanner {
  width: 100%;
  display: block;
  text-align: center;
}

#infoBox {
  width: 100%;
  background-color: white;
  height: 1600px;
  position: absolute;
  top: 550px;
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



</style>

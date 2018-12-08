<template>
  <div id="services">

    <!-- Page that displays the services of foxycle cyclery -->

    <!-- Static image to be fixed as the background -->
    <img id = "backgroundImg" alt="Vue logo" src="../assets/BikeRepair.png" width = 100%>

    <!-- Div that holds the majority of the page content -->
    <div id = "infoBox">
      <div class = "container infoBoxContainer">

        <div class = "row" v-for="item in services">
          <div class = "col-sm-6">
            <img v-bind:src="item.picName" width = 100%>
            <br>
            <br>
          </div>
          <div class = "col-sm-6">
            <p>{{item.name}}</p>
            <br>
            <p>{{item.desc}}</p>
            <br>
          </div>
        </div>

        <br>

        <!-- Bottom text box to display services info and can be updated by manager to update this page -->

        <div class = "row">
          <p id="serviceTxt">{{serviceTxt}}</p>
        </div>

        <div class = "row">
          <div class = "col-sm-12">
            <img src = "../assets/tools.png" width = 100% height = "500px">
            <br>
            <br>
            <p id = "bottomTxt" style="white-space: pre-wrap;">{{bottomTxt}}</p>
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
export default class Services extends Vue {
  bottomTxt = "Placeholder";
  serviceTxt = "IM A PLACEHOLDER YES A VERY VERY NICE PLACEHOLDER"

  services: any[] = [{
    name: "Placeholder",
    desc: "Placeholder Desc",
    picName: "../assets/servicesMan.png"
  }];

  mounted(){
    axios
      .get('/api/services/')
      .then((res) => {
        this.services = res.data.items;
      })
    axios
      .get('/api/textbox/location')
      .then((res) => {
        this.bottomTxt = res.data.text.text;
      })
    axios
      .get('/api/textbox/service1')
      .then((res) => {
        this.serviceTxt = res.data.text.text;
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

#bottomTxt {
  text-align: center;
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

<template>
  <div id="account">
    <p id = "accountText">Foxycle Cyclery
    </p>
    <carousel id="carousel1" perPage=1 autoplay autoplayTimeout=3500 loop>
        <slide>
          <img alt="Vue logo" src="../assets/homepagenew1.png" width = 100%>
        </slide>
        <slide>
          <img alt="Vue logo" src="../assets/homepagenew5.png" width = 100%>
        </slide>
        <slide>
          <img alt="Vue logo" src="../assets/homepagenew6.png" width = 100%>
        </slide>
        <slide>
          <img alt="Vue logo" src="../assets/homepagenew4.png" width = 100%>
        </slide>
    </carousel>

    <div class = "container">
        <div class = "row">
          <div class = "col-sm-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Urna et pharetra pharetra massa massa. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit.
          </div>
          <div class = "col-sm-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Urna et pharetra pharetra massa massa. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Quisque non tellus orci ac. Purus faucibus ornare suspendisse sed nisi lacus sed.
          </div>
          <div class = "col-sm-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Urna et pharetra pharetra massa massa. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit.
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
    Carousel,
    Slide,
  }

})
export default class Account extends Vue {}
</script>

<style lang="scss">
#account {
  padding: 0px 0px;
  text-align: center;
}

#carousel1 {
  padding: 0px;
  margin: 0px;
  z-index: -1;
}

#accountText {
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

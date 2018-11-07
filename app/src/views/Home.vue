<template>
  <div id="home">
    <p id = "homepageText">Foxycle Cyclery
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';

@Component({
  components: {
    Carousel,
    Slide,
  }

})
export default class Home extends Vue {}
</script>

<style lang="scss">
#home {
  padding: 50px 0px;
  text-align: center;
}

#carousel1 {
  padding: 0px;
  margin: 0px;
  z-index: -1;
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

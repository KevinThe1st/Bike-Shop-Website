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

    <div class = "container">
        <div class = "row">
          <div class = "col-sm-4">
          {{home1}}
          </div>
          <div class = "col-sm-4">
          {{home2}}
          </div>
          <div class = "col-sm-4">
          {{home3}}
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
    Carousel,
    Slide,
  }

})
export default class Home extends Vue {
  home1: string = "I am a placeholder, look at me!\nI am a placeholder, look at me!\n";
  home2: string = "Very\nNice\nPlaceholder";
  home3: string = "Hi";

  data(){
    return {
      home1: this.home1,
      home2: this.home2,
      home3: this.home3
    }
  }
  mounted(){
    axios
      .get('/api/textbox/home1')
      .then((res) => {
        this.home1 = res.data.item.text;
      })
    axios
      .get('/api/textbox/home2')
      .then((res) => {
        this.home2 = res.data.item.text;
      })
    axios
      .get('/api/textbox/home3')
      .then((res) => {
        this.home3 = res.data.item.text;
      })
  }
}
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

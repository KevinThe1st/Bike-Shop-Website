<template>
  <div id="home">

  <!--<img src = "../assets/FoxcycleLogoNew.png" id = "logoImage" width = 100% position=absolute top = 0>-->





    <p id = "homepageText">Foxycle Cyclery
    </p>
    <div>
        <b-carousel id="carousel1"
                    style="text-shadow: 1px 1px 2px #333;"
                    controls
                    indicators
                    background="#ababab"
                    :interval="4000"
                    img-width="1024"
                    img-height="480"
                    v-model="slide"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
        >


        <b-carousel-slide img-src="../assets/homepagebootstrap1.png">
          <h1>&quotThe best service on the central coast&quot<br>-Cycler Monthly</h1>
        </b-carousel-slide>
          <!-- Text slides with image -->
          <b-carousel-slide caption="In business since 1980"
                            text="We sport a wide variety of road, mountain, and cross bikes"
                            img-src="../assets/homepagebootstrap2.png"
          ></b-carousel-slide>

          <!-- Slides with custom text -->


          <!-- Slides with image only -->
          <b-carousel-slide img-src="../assets/homepagebootstrap3.png">
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide img-src="../assets/homepagenew6.png">
          </b-carousel-slide>



        </b-carousel>

      </div>
      <br>
      <br>







    <!--<carousel id="carousel1" perPage=1 autoplay autoplayTimeout=3500 loop paginationEnabled = false>
        <slide>
          <img alt="Vue logo" src="../assets/homepagebootstrap1.png" width = 100%>
        </slide>
        <slide>
          <img alt="Vue logo" src="../assets/homepagebootstrap2.png" width = 100%>
        </slide>
        <slide>
          <img alt="Vue logo" src="../assets/homepagebootstrap3.png" width = 100%>
        </slide>
        <slide>
          <img alt="Vue logo" src="../assets/homepagenew6.png" width = 100%>
        </slide>
    </carousel> -->

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
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';

@Component({
  components: {
  }

})
export default class Home extends Vue {
  home1: string = "I am a placeholder, look at me!\nI am a placeholder, look at me!\n";
  home2: string = "Very\nNice\nPlaceholder";
  home3: string = "Hi";
  slide: number = 0;
  sliding: boolean = false;

  onSlideStart (slide) {
      this.sliding = true
  }

  onSlideEnd (slide) {
      this.sliding = false
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
  padding: 0px 0px;
  text-align: center;
  margin-top: 30px;
}

#carousel1 {
  padding: 0px;
  margin: 0px;
  z-index: 0;
}

#homepageText {
  color: #FFD700;
  font-family: "Cambria", "Courier New", "Times New Roman", serif;
  font-style: italic;
  position: absolute;
  text-align: center;
  padding: 0px;
  margin: auto 0px;
  z-index: 1;
  font-size: 100px;


}
</style>

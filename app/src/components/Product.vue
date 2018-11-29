<template>
  <div id="product">
    <div id = "productStyle">
      <p id = "boldText">
        {{name}}
      </p>
      <div class = "container">
          <div class = "row">
            <div class = "col-sm-6">
              <img v-bind:src="picName" width = 200px>
            </div>
            <div class = "col-sm-6">
              <br>
              <br>
              <p>
                Price: ${{price}}
              </p>
              <p class ="inlineBlock">Quantity: </p>
              <input class="form-control form-control-sm inlineBlock" id = "inputTextbox" type="text" placeholder="0">
              <br>
              <button class="btn btn-success" id = "buttonClass">Add to Cart</button>
            </div>
          </div>
      </div>

    </div>


  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
    id: Number,
    price: Number,
    stock: Number,
    name: String,
    descShort: String,
    descLong: String,
    picName: String,
  }
})
export default class Product extends Vue {

}
</script>

<style lang="scss">
    .item {
        width: 350px;
        height:350px;
        color: black;
    }
    .item:hover {
        color: #f79927;
        background-color: grey;
        border: solid 2px black;
    }


    #productStyle {
      background-color: #EDEDED;
      width: 100%;
      margin-top: 3px;
      padding: 5px;
    }

    #productStyle:hover {
      background-color: #DCDCDC;
    }

    #boldText {
      font-weight: bold;
      font-size: 20px;
    }

    #inputTextbox {
      width: 40px;
    }

    .inlineBlock {
      display: inline;
    }

    #buttonClass {
      margin-top: 10px;
    }
</style>

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
              <p>
                Stock: {{stock}}
              </p>
              <p class ="inlineBlock">Quantity: </p>
              <input class="form-control form-control-sm inlineBlock" id = "inputTextbox" type="text" v-model="qty" placeholder="1">
              <br>
              <button class="btn btn-success" id = "buttonClass" v-on:click="addToCart()">Add to Cart</button>
            </div>
          </div>
      </div>

    </div>


  </div>
</template>

<script lang="ts">
import axios from 'axios';
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
  qty = 1
  addToCart(){
    axios.put('/api/orderItems/cart', {
      userId: this.$store.getters.getLoginStatus,
      itemId: this.$props.id,
      quantity: this.qty,
    }).then((res) => {
      console.log("Item(s) added:" + res.data.updated);
    })
  }
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

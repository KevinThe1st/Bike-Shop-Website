<template>
  <div id="product">
    <div id = "productStyle">
      <p id = "boldText">
        {{name}}
      </p>
      <p>
        {{price}}
      </p>
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
    descLong: String
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
      background-color: white;
      width: 100%;
      border: 1px black solid;
      margin-top: 3px;
      padding: 5px;
    }

    #productStyle:hover {
      background-color: #EDEDED;
    }

    #boldText {
      font-weight: bold;
    }
</style>

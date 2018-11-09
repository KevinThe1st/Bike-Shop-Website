<template>
  <div id="product">
    <h1>bike</h1>
    <h4>price</h4>
    <div>desc</div>
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
</style>

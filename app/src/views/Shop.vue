<template>
  <div id="shop">
    <div id="category-bar">
      <div id="applied-categories">
        <li v-for="(category, index) in appliedCategories">
          {{ category.name }}
        </li>
      </div>
      <ul>
        <li v-for="(category, index) in categories">
          <input type="button" v-on:click="getSubCategories(index)">{{category.name}}
        </li>
      </ul>
    </div>
    <div id="item-panel">
      <li v-for="item in items">
        <Product
          v-bind:id="item"
        ></Product>
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import App from '../App.vue';
import { CategoryItem, ShopItem } from '@/models';
import Product from '@/components/Product.vue';

@Component({
  components: {
    Product
  }
})
export default class Shop extends App {
  categories: CategoryItem[] = [];
  appliedCategories: CategoryItem[] = [];
  items: ShopItem[] = [];

  getTopLevelCategories(){
    axios.get(`/api/categories/parents`)
    .then((res) => {
      this.categories = res.data.categories;
    })
  }

  getSubCategories(index){
    console.log(this.categories[index].id);
    this.appliedCategories.push(this.categories[index]);
    console.log(this.appliedCategories);
    axios.get(`/api/categories/parents/` + this.categories[index].id)
    .then((res) => {
      this.categories = res.data.category;
    })
  }

  beforeMount(){
    this.getTopLevelCategories()
    this.getAllItems()
  }

  getAllItems(){
    axios.get(`/api/items`)
    .then((res) => {
      this.items = res.data.items;
    })
  }
}
</script>

<style lang="scss">
#shop {
  padding: 80px 0px;
  text-align: center;
}

#category-bar{
  display: inline-block;
  float: left;
  background: #ddd;
  width: 25%;
  height: 400px;

  ul {
    list-style: none;
    li {
      text-align: left;
    }
  }
}

#item-panel{
  display: inline-block;
  padding: 100px 60px;
  width: 50%;
  height: 100%;
  background: #ddd;
}
</style>

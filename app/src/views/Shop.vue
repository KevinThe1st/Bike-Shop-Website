<template>
  <div id="shop">
    <div id="category-bar">
      <div id="applied-categories">
        <li v-for="(category, index) in appliedCategories">
          <input type="button" v-on:click="getSuperCategories(index)">{{category.name}}
        </li>
      </div>
      <ul id="category-selection">
        <li v-for="(category, index) in categories">
          <input type="button" v-on:click="getSubCategories(index)">{{category.name}}
        </li>
      </ul>
    </div>
    <div id="item-panel">
      <li v-for="item in items">
        <Product
          v-bind:id="item.id"
          v-bind:price="item.price"
          v-bind:stock="item.stock"
          v-bind:name="item.name"
          v-bind:descShort="item.descShort"
          v-bind:descLong="item.descLong"
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
/*
  createNewCategory(){
    axios.put(`/api/categories`, {
      username: this.UsernameMessage,
      password: this.PasswordMessage,
      lastName: this.LastNameMessage,
      firstName: this.FirstNameMessage
    }).then((res) => {
    }
  }
  */

  getTopLevelCategories(){
    axios.get(`/api/categories/parents`)
    .then((res) => {
      this.categories = res.data.categories;
    })
  }

  getSubCategories(index){
    this.appliedCategories.push(this.categories[index]);
    this.getSpecificCategoryItems(index);
    axios.get(`/api/categories/parent/` + this.categories[index].id)
    .then((res) => {
      this.categories = res.data.category;
    })
  }

  getSuperCategories(index){
    /*
     * cut off a part of the applied categories
     */
    var temp = this.appliedCategories;
    this.appliedCategories = [];
    for(var i = 0; i < index; i++){
      this.appliedCategories.push(temp[i]);
    }
    // get the subcategories of the new last category
    if(index > 0){
      this.categories = this.appliedCategories;
      this.getSpecificCategoryItems(index-1);
      axios.get(`/api/categories/parent/` + this.appliedCategories[index-1].id)
      .then((res) => {
        this.categories = res.data.category;
      })
    }
    // or all categories if all categories have removed
    else{
      this.getTopLevelCategories();
      this.getAllItems();
    }
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

  getSpecificCategoryItems(index){
    axios.get(`/api/items/byCat/` + this.categories[index].id)
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

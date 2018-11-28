<template>
  <div id="shop">
    <div class = "container">
        <div class = "row">
          <div class = "col-sm-12">
            <h1 id="ShopTopText">Shop</h1>
          </div>
        </div>
    </div>
    <div class = "container">
      <div class = "row">
            <div id="category-bar">
              <p id="CategoriesTopText">Categories</p>
              <div id="applied-categories">

                <li v-for="(category, index) in appliedCategories">
                  <input type="checkbox" v-on:click="getSuperCategories(index)" v-bind:checked="true">{{category.name}}
                </li>
              </div>
              <ul>
                <li v-for="(category, index) in categories">
                  <input type="checkbox" v-on:click="getSubCategories(index)"  v-bind:checked="appliedCategories[category]">{{category.name}}
                </li>
              </ul>
            </div>
        </div>
        <div id="item-panel">
          <p id="resultsFoundText">{{items.length}} total results found</p>
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
  topCategory: CategoryItem = null;

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
    this.topCategory = this.categories[index];
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

#resultsFoundText{
  font-style: italic;
  color: #808080;
  text-align: left;
}

#category-bar{
  display: inline-block;
  float: left;
  background: white;
  width: 25%;
  border-right: 1px black solid;
  height: 100%;

  ul {
    list-style: none;
    li {
      text-align: left;
    }
  }
}

#item-panel{
  display: inline-block;
  padding: 30px 20px;
  width: 60%;
  height: 100%;
  background: #ddd;
}

#ShopTopText {
  text-align: center;
}

#CategoriesTopText {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

</style>

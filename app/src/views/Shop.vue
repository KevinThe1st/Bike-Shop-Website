<template>
  <div id="shop">
    <div id="topContainer">
        <div>
          <div class = "col-sm-12">
            <h1 id="ShopTopText">Shop</h1>
          </div>
        </div>
    </div>


    <div>
      <div class = "row">
          <div class = "col-sm-2">
                <div id="category-bar">
                  <p id="CategoriesTopText">Categories</p>
                  <div id="applied-categories">
                    <ul class ="noBullets">
                      <li v-for="(category, index) in appliedCategories">
                        <input type="checkbox" v-on:click="getSuperCategories(index)" v-bind:checked="true">{{category.name}}
                      </li>
                    </ul>
                  </div>
                  <ul class ="noBullets">
                    <li v-for="(category, index) in categories">
                      <input type="checkbox" v-on:click="getSubCategories(index)"  v-bind:checked="appliedCategories[category]">{{category.name}}
                    </li>
                  </ul>
                </div>
            </div>
            <div class = "col-sm-9" id = "itemsContainer">

                <div id="item-panel">
                  <p id="resultsFoundText">{{items.length}} results found</p>
                  <ul class ="noBullets">
                    <li v-for="item in items">
                      <Product
                        v-bind:id="item.id"
                        v-bind:price="item.price"
                        v-bind:stock="item.stock"
                        v-bind:name="item.name"
                        v-bind:descShort="item.descShort"
                        v-bind:descLong="item.descLong"
                        v-bind:picName="item.picName"
                      ></Product>
                    </li>
                  </ul>
                </div>
            </div>
            <div class = "col-sm-1"></div>
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

}

#resultsFoundText{
  font-style: italic;
  color: black;
  text-align: left;
}

#category-bar{
  height: 100%;



  ul {
    list-style: none;
    li {
      text-align: left;
    }
  }
}

#item-panel{
  padding: 30px 20px;
  height: 100%;
}

#ShopTopText {
  text-align: center;
}

#CategoriesTopText {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

.noBullets {
  ul {
    list-style-type: none;
  }
  li {
    list-style-type: none;
  }
}
#topContainer {
  border-bottom: 2px #EDEDED solid;
}

hr {
  padding: 0px;
  margin: 0px;
  background-color: #EDEDED;
}

#itemsContainer {

  border-left: 2px #EDEDED solid;
}


</style>

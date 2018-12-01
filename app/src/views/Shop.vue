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
                  <input v-model="message" placeholder="category name" v-if="this.$store.getters.getLoginPermissionLevel == 'Admin'">
                  <button type="submit" v-on:click="addNewTopLevelCategory(message)" v-if="this.$store.getters.getLoginPermissionLevel == 'Admin'">Add New Category</button>
                  <p id="CategoriesTopText">Categories</p>
                  <div id="top-level-categories" v-if="loadedTopLevelCategoryCount == topLevelCategories.length">
                    <ul class ="noBullets">
                      <li v-for="(category, categoryIndex) in topLevelCategories">
                        <button type="submit" v-on:click="addNewSubCategory(message, categoryIndex)" v-if="$store.getters.getLoginPermissionLevel == 'Admin'">Add New Subcategory</button>
                        {{category.name}}
                        <ul class ="noBullets">
                          <li v-for="(subcategory, subcategoryIndex) in category.subcategories">
                            <input type="checkbox" v-on:click="getItemsRefinedByCategories(categoryIndex, subcategoryIndex)">
                            {{subcategory.name}}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
            <div class = "col-sm-9" id = "itemsContainer">
                <div id="item-panel">
                  <p id="resultsFoundText">{{displayedItems.length}} results found</p>
                  <ul class ="noBullets">
                    <li v-for="item in displayedItems">
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
  },
  data() {
    return {
      message: ''
    }
  }
})
export default class Shop extends App {
  topLevelCategories: CategoryItem[] = [];
  idsOfAppliedCategories: [number, number][] = [];
  displayedItems: ShopItem[] = [];
  loadedTopLevelCategoryCount: number = 0;

  getAllTopLevelCategories(){
    this.topLevelCategories = [];
    this.loadedTopLevelCategoryCount = 0;
    axios.get(`/api/categories/parents`)
    .then((res) => {
      this.topLevelCategories = res.data.categories;
      for(var i = 0; i < this.topLevelCategories.length; i++){
        this.getSubLevelCategories(i);
      }
    })
  }

  getSubLevelCategories(index){
    this.topLevelCategories[index].subcategories = [];
    axios.get(`/api/categories/parent/` + this.topLevelCategories[index].id)
    .then((res) => {
      this.topLevelCategories[index].subcategories = res.data.category;
      this.loadedTopLevelCategoryCount++; // only render when all responses have got back
    })
  }

  getAllItems(){
   axios.get(`/api/items`)
   .then((res) => {
     this.displayedItems = res.data.items;
   })
 }

 getItemsRefinedByCategories(categoryIndex, subcategoryIndex){
   this.categoryChanged(categoryIndex, subcategoryIndex);
   this.displayedItems = [];
   if(this.idsOfAppliedCategories.length == 0){
     this.getAllItems();
     return;
   }
   for(var i = 0; i < this.idsOfAppliedCategories.length; i++){
     var idTuple = this.idsOfAppliedCategories[i];
     axios.get(`/api/items/byCat/` + this.topLevelCategories[idTuple[0]].subcategories[idTuple[1]].id)
     .then((res) => {
       for(var j = 0; j < res.data.items.length; j++){
         this.displayedItems.push(res.data.items[j]);
       }
     })
   }
 }

  categoryChanged(index1, index2){
    for(var i = 0; i < this.idsOfAppliedCategories.length; i++){
      if(this.idsOfAppliedCategories[i][0] == index1 && this.idsOfAppliedCategories[i][1] == index2){
        this.idsOfAppliedCategories.splice(i, 1);
        return;
      }
    }
    this.idsOfAppliedCategories.push([index1, index2]);
  }

  beforeMount(){
    this.getAllTopLevelCategories();
    this.getAllItems();
  }

  addNewTopLevelCategory(categoryName){
    this.printer("top" + categoryName);
    if(categoryName.length == 0){
      return;
    }
    axios.put(`/api/categories`, {
      name: categoryName,
      type: null,
      parentId: null
    }).then((res) => {
      this.getAllTopLevelCategories();
    })
  }

  addNewSubCategory(categoryName, categoryIndex){
    this.printer("sub" + categoryName);
    if(categoryName.length == 0){
      return;
    }
    axios.put(`/api/categories`, {
      name: categoryName,
      type: null,
      parentId: this.topLevelCategories[categoryIndex].id
    }).then((res) => {
      this.getAllTopLevelCategories();
    })
  }

  printer(input){
    console.log(input);
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

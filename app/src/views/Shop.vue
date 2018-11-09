<template>
  <div id="shop">
    <div id="category-bar">
      <ul>
        <li v-for="(category, index) in categoryNames"><input type="checkbox" v-on:click="getSubCategories(index)">{{category}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import App from '../App.vue';
import { CategoryItem } from '@/models';

@Component
export default class Shop extends App {
  categories: CategoryItem[] = [];
  categoryNames: string[] = [];

  getTopLevelCategories(){
    axios.get(`/api/categories/parents`)
    .then((res) => {
      this.categories = res.data.categories;
      this.categoryNames = [];
      for(var i = 0; i < this.categories.length; i++){
        this.categoryNames[i] = this.categories[i].name;
      }
      console.log("from top level: " + this.categoryNames);
    })
  }

  getSubCategories(index){
    console.log(this.categories[index].id);
    axios.get(`/api/categories/parents/` + this.categories[index].id)
    .then((res) => {
      this.categories = res.data.category;
      this.categoryNames = [];
      for(var i = 0; i < this.categories.length; i++){
        this.categoryNames[i] = this.categories[i].name;
      }
      console.log("from sub level: " + this.categoryNames);
    })
  }

  beforeMount(){
    this.getTopLevelCategories()
  }
}

</script>

<style lang="scss">
#shop {
  padding: 50px 0px;
  text-align: center;
}

#category-bar{
  background: #ddd;
  width: 20%;
  height: 400px;

  ul {
    list-style: none;
    li {
      text-align: left;
    }
  }
}
</style>

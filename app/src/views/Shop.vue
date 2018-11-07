<template>
  <div id="shop">
    <div id="category-bar">
      <ul>
        <li v-for="(item, index) in temp"><input type="checkbox" v-on:click="printer(index)">{{item}}</li>
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
  temp: string[] = [ "aaaa", "bbb", "cc" ];
  subtemp: string[][] = [[ "dddd", "eee", "ff" ], ["111", "222"], ["a"]];

  printer(input){
    console.log(input);
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

<template>
  <div id="cart">
    <div id="item-panel">
      <li v-for="item in items">
        {{ item.name }}
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { CreateUserItem } from '@/models';

@Component
export default class Cart extends Vue {

}
</script>

<style lang="css">
.cart {
  padding: 80px 0px;
  text-align: center;
}
</style>

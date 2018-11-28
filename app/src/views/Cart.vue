<template>
  <div id="cart">
    <input type="button" v-on:click="getAllUserOrders()">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import App from '../App.vue';
import { OrderItem } from '@/models';

@Component({})
export default class Cart extends App {
  orders: OrderItem[] = [];
  currentOrder: OrderItem;

  getAllUserOrders(){
    axios.get(`/api/orders/` + this.$store.getters.getLoginStatus)
    .then((res) => {
      this.orders = res.data.orders;
    })
    this.getMostRecentOrder();
  }

  getMostRecentOrder(){
    for(var i = 0; i < this.orders.length; i++){
      if(this.orders[i].shippingStatus == "InProgress"){
        this.currentOrder = this.orders[i];
        i = this.orders.length;
      }
    }
  }
}
</script>

<style lang="scss">
#cart {
  padding: 80px 0px;
  text-align: center;
}
</style>

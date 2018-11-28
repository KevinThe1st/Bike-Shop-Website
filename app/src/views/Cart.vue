<template>
  <div id="cart">
    <input type="button" v-on:click="getUserOrder()">
    <li id="item-quantities" v-for="(orderItem, index) in orderItemsInCurrentOrder">
      quantity of item {{index}}: {{ orderItem.quantity }}
    </li>
    <li id="item-names" v-for="(item, index) in itemsInCurrentOrder">
      name of item {{index}}: {{ item.name }}
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import App from '../App.vue';
import { OrderItem, OrderItemItem, ShopItem } from '@/models';

@Component({})
export default class Cart extends App {
  orders: OrderItem[] = [];
  currentOrder: OrderItem;
  orderItemsInCurrentOrder: OrderItemItem[] = [];
  itemsInCurrentOrder: ShopItem[] = [];

  getUserOrder(){
    axios.get(`/api/orders/` + this.$store.getters.getLoginStatus)
    .then((res) => {
      this.orders = res.data.orders;
      this.getCurrentOrder();
    })
  }

  getCurrentOrder(){
    for(var i = 0; i < this.orders.length; i++){
      if(this.orders[i].shippingStatus == "InProgress"){
        this.currentOrder = this.orders[i];
        i = this.orders.length;
        this.getAllOrderItemsFromCurrentOrder();
      }
    }
  }

  getAllOrderItemsFromCurrentOrder(){
    axios.get(`/api/orderItems/` + this.currentOrder.id)
    .then((res) => {
      this.orderItemsInCurrentOrder = res.data.items;
      this.getAllItemsFromCurrentOrderItems();
    })
  }

  getAllItemsFromCurrentOrderItems(){
    this.itemsInCurrentOrder = [];
    for(var i = 0; i < this.orderItemsInCurrentOrder.length; i++){
      console.log(this.orderItemsInCurrentOrder[i].ItemId)
      // no idea why this has to be capital Item but it only works like this, changing the front end model to compensate
      axios.get(`/api/items/` + this.orderItemsInCurrentOrder[i].ItemId)
      .then((res) => {
        this.itemsInCurrentOrder.push(res.data.item);
      })
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

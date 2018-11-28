<template>
  <div id="cart">
    <input type="button" v-on:click="getUserOrder()">
    <input type="button" v-on:click="getCombinedData()">
    <li id="item-names" v-for="(item, index) in orderItemsInCurrentOrderWithItemData">
      item {{index}}: name = {{item.name}}, quantity = {{item.quantity}}, price = {{item.price}}, picName = {{item.picName}}
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import App from '../App.vue';
import { OrderItem, OrderItemItem, ShopItem, CurrentOrderItem } from '@/models';

@Component({})
export default class Cart extends App {
  orders: OrderItem[] = [];
  currentOrder: OrderItem;
  orderItemsInCurrentOrder: OrderItemItem[] = [];
  itemsInCurrentOrder: ShopItem[] = [];
  orderItemsInCurrentOrderWithItemData: CurrentOrderItem[] = [];

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

  getCombinedData(){
    this.orderItemsInCurrentOrderWithItemData = [];
    for(var i = 0; i < this.orderItemsInCurrentOrder.length; i++){
      var temp = new CurrentOrderItem;
      temp.picName = this.itemsInCurrentOrder[i].picName;
      temp.name = this.itemsInCurrentOrder[i].name;
      temp.price = this.orderItemsInCurrentOrder[i].price;
      temp.quantity = this.orderItemsInCurrentOrder[i].quantity;
      this.orderItemsInCurrentOrderWithItemData.push(temp);
    }
    console.log(this.orderItemsInCurrentOrderWithItemData);
  }
}
</script>

<style lang="scss">
#cart {
  padding: 80px 0px;
  text-align: center;
}
</style>

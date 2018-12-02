<template>
  <div id="admin-order-management">
    Shipping
    <li v-for="(order, orderIndex) in shippingOrders"
    v-if="itemsAssociatedWithOrders[0].length == shippingOrders.length && usersAssociatedWithOrders[0].length == shippingOrders.length &&
         orderItemsAssociatedWithOrders[0].length == shippingOrders.length">
      {{order}}
      {{usersAssociatedWithOrders[0][orderIndex]}}
      <button type="submit" v-on:click="cancelOrder(orderIndex)">Cancel Order</button>
      <ul>
        <li v-for="(item, itemIndex) in itemsAssociatedWithOrders[0][orderIndex]">
          {{item}}
          {{orderItemsAssociatedWithOrders[0][orderIndex][itemIndex]}}
        </li>
      </ul>
    </li>
    Completed
    <li v-for="(order, orderIndex) in completedOrders"
    v-if="itemsAssociatedWithOrders[1].length == completedOrders.length && usersAssociatedWithOrders[1].length == completedOrders.length &&
         orderItemsAssociatedWithOrders[1].length == completedOrders.length">
      {{order}}
      {{usersAssociatedWithOrders[1][orderIndex]}}
      <button type="submit" v-on:click="cancelOrder(orderIndex)">Cancel Order</button>
      <ul>
        <li v-for="(item, itemIndex) in itemsAssociatedWithOrders[1][orderIndex]">
          {{item}}
          {{orderItemsAssociatedWithOrders[1][orderIndex][itemIndex]}}
        </li>
      </ul>
    </li>
    Cancelled
    {{orderItemsAssociatedWithOrders[2]}}
    <li v-for="(order, orderIndex) in cancelledOrders"
    v-if="itemsAssociatedWithOrders[2].length == cancelledOrders.length && usersAssociatedWithOrders[2].length == cancelledOrders.length &&
         orderItemsAssociatedWithOrders[2].length == cancelledOrders.length">
      {{order}}
      {{usersAssociatedWithOrders[2][orderIndex]}}
      <button type="submit" v-on:click="cancelOrder(orderIndex)">Cancel Order</button>
      <ul>
        <li v-for="(item, itemIndex) in itemsAssociatedWithOrders[2][orderIndex]">
          {{item}}
          {{orderItemsAssociatedWithOrders[2][orderIndex][itemIndex]}}
        </li>
      </ul>
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { OrderItem, ShopItem, CreateUserItem, OrderOrderItems } from '@/models';

@Component
export default class AdminOrderManagement extends Vue {
  allOrders: OrderItem[] = [];
  shippingOrders: OrderItem[] = [];
  completedOrders: OrderItem[] = [];
  cancelledOrders: OrderItem[] = [];
  orderItemsAssociatedWithOrders: [OrderOrderItems[]] = [[]];
  itemsAssociatedWithOrders: [ShopItem[]] = [[]];
  usersAssociatedWithOrders: [CreateUserItem[]] = [[]];

  cancelOrder(indexIntoShippingOrders){
    axios.patch(`/api/orders/` + this.shippingOrders[indexIntoShippingOrders].id + `/Cancelled`);
    // client side front end change
    this.$set(this.shippingOrders[indexIntoShippingOrders], "shippingStatus", "Cancelled");
    var transferredOrder = this.shippingOrders.splice(indexIntoShippingOrders, 1);
    this.cancelledOrders.push(transferredOrder[0]);
    this.itemsAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    this.usersAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    this.orderItemsAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    // transfer all?
  }

  completedOrder(indexIntoShippingOrders){
    axios.patch(`/api/orders/` + this.shippingOrders[indexIntoShippingOrders].id + `/Complete`);
    // client side front end change
    this.$set(this.shippingOrders[indexIntoShippingOrders], "shippingStatus", "Complete");
    var transferredOrder = this.shippingOrders.splice(indexIntoShippingOrders, 1);
    this.completedOrders.push(transferredOrder[0]);
    this.itemsAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    this.usersAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    this.orderItemsAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
  }

  getAllOrders(){
    axios.get(`/api/orders`)
    .then((res) => {
      this.allOrders = res.data.orders;
      this.organizeOrders();
    })
  }

  organizeOrders(){
    this.shippingOrders = [];
    this.completedOrders = [];
    this.cancelledOrders = [];
    for(var i = 0; i < this.allOrders.length; i++){
      if(this.allOrders[i].shippingStatus == "Shipping"){
        this.shippingOrders.push(this.allOrders[i]);
      }
      else if(this.allOrders[i].shippingStatus == "Complete"){
        this.completedOrders.push(this.allOrders[i]);
      }
      else if(this.allOrders[i].shippingStatus == "Cancelled"){
        this.cancelledOrders.push(this.allOrders[i]);
      }
    }
    this.orderItemsAssociatedWithOrders = [[], [], []];
    this.itemsAssociatedWithOrders = [[], [], []];
    this.usersAssociatedWithOrders = [[], [], []];
    for(var i = 0; i < this.shippingOrders.length; i++){
      this.getItemsAssociatedWithOrder(i, "Shipping");
      this.getUsersAssociatedWithOrder(i, "Shipping");
      this.getOrderItemsAssociatedWithOrder(i, "Shipping");
    }
    for(var i = 0; i < this.completedOrders.length; i++){
      this.getItemsAssociatedWithOrder(i, "Completed");
      this.getUsersAssociatedWithOrder(i, "Completed");
      this.getOrderItemsAssociatedWithOrder(i, "Completed");
    }
    for(var i = 0; i < this.cancelledOrders.length; i++){
      this.getItemsAssociatedWithOrder(i, "Cancelled");
      this.getUsersAssociatedWithOrder(i, "Cancelled");
      this.getOrderItemsAssociatedWithOrder(i, "Cancelled");
    }
  }

  getItemsAssociatedWithOrder(orderIndex, orderStatus){
    var orderList, itemArrayIndex;
    if(orderStatus == "Shipping"){
      orderList = this.shippingOrders;
      itemArrayIndex = 0;
    }
    else if(orderStatus == "Completed"){
      orderList = this.completedOrders;
      itemArrayIndex = 1;
    }
    else if(orderStatus == "Cancelled"){
      orderList = this.cancelledOrders;
      itemArrayIndex = 2;
    }
    axios.get(`/api/orders/items/` + orderList[orderIndex].id)
    .then((res) => {
      this.itemsAssociatedWithOrders[itemArrayIndex].push(res.data);
    });
  }

  getUsersAssociatedWithOrder(orderIndex, orderStatus){
    var orderList, userArrayIndex;
    if(orderStatus == "Shipping"){
      orderList = this.shippingOrders;
      userArrayIndex = 0;
    }
    else if(orderStatus == "Completed"){
      orderList = this.completedOrders;
      userArrayIndex = 1;
    }
    else if(orderStatus == "Cancelled"){
      orderList = this.cancelledOrders;
      userArrayIndex = 2;
    }
    axios.get(`/api/users/` + orderList[orderIndex].UserId)
    .then((res) => {
      this.usersAssociatedWithOrders[userArrayIndex].push(res.data.user);
    });
  }

  getOrderItemsAssociatedWithOrder(orderIndex, orderStatus){
    var orderList, orderItemArrayIndex;
    if(orderStatus == "Shipping"){
      orderList = this.shippingOrders;
      orderItemArrayIndex = 0;
    }
    else if(orderStatus == "Completed"){
      orderList = this.completedOrders;
      orderItemArrayIndex = 1;
    }
    else if(orderStatus == "Cancelled"){
      orderList = this.cancelledOrders;
      orderItemArrayIndex = 2;
    }
    axios.get(`/api/orderItems/` + orderList[orderIndex].id)
    .then((res) => {
      this.orderItemsAssociatedWithOrders[orderItemArrayIndex].push(res.data.items);
    });
  }

  beforeMount(){
    this.getAllOrders();
  }

}
</script>

<style lang="scss">
#admin-order-management {
  padding: 80px 0px;
}
</style>

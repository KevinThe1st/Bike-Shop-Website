<template>
  <div id="admin-order-management">
    Shipping
    <li v-for="(order, orderIndex) in shippingOrders" v-if="numberOfLoadedItemSets == shippingOrders.length">
      {{order}}
      <button type="submit" v-on:click="cancelOrder(orderIndex)">Cancel Order</button>
      <ul>
        <li v-for="(item, itemIndex) in itemsAssociatedWithShippingOrders[orderIndex]">
          {{item}}
        </li>
      </ul>
    </li>
    Completed
    <li v-for="(order, index) in completedOrders">
      {{order}}
    </li>
    Cancelled
    <li v-for="(order, index) in cancelledOrders">
      {{order}}
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { OrderItem, ShopItem } from '@/models';

@Component
export default class Home extends Vue {
  allOrders: OrderItem[] = [];
  shippingOrders: OrderItem[] = [];
  itemsAssociatedWithShippingOrders: [ShopItem[]] = [[]];
  completedOrders: OrderItem[] = [];
  cancelledOrders: OrderItem[] = [];
  numberOfLoadedItemSets: number = 0;

  cancelOrder(indexIntoShippingOrders){
    axios.patch(`/api/orders/` + this.shippingOrders[indexIntoShippingOrders].id + `/Cancelled`);
    // client side front end change
    this.$set(this.shippingOrders[indexIntoShippingOrders], "shippingStatus", "Cancelled");
    var transferredOrder = this.shippingOrders.splice(indexIntoShippingOrders, 1);
    this.cancelledOrders.push(transferredOrder[0]);
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
    this.numberOfLoadedItemSets = 0;
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
    this.itemsAssociatedWithOrders = new Array(this.shippingOrders.length);
    for(var i = 0; i < this.shippingOrders.length; i++){
      this.getItemsAssociatedWithShippingOrder(i);
    }
  }

  getItemsAssociatedWithShippingOrder(orderIndex){
    console.log(this.shippingOrders[orderIndex].id);
    axios.get(`/api/orders/items/` + this.shippingOrders[orderIndex].id)
    .then((res) => {
      console.log(res.data);
      var listOfItemsAssociatedWithOrder = res.data.items;
      this.itemsAssociatedWithShippingOrders[orderIndex] = listOfItemsAssociatedWithOrder;
      this.numberOfLoadedItemSets++;
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

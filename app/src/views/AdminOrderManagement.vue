<template>
  <div id="admin-order-management">
    Shipping
    <li v-for="(order, index) in shippingOrders">
      {{order}}
      <button type="submit" v-on:click="cancelOrder(index)">Cancel Order</button>
    </li>
    Completed
    <li v-for="(order, index) in completedOrders">
      {{order}}
    </li>
    Cancelled
    <li v-for="(order, index) in canceledOrders">
      {{order}}
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { OrderItem } from '@/models';

@Component
export default class Home extends Vue {
  allOrders: OrderItem[] = [];
  shippingOrders: OrderItem[] = [];
  completedOrders: OrderItem[] = [];
  canceledOrders: OrderItem[] = [];

  cancelOrder(indexIntoShippingOrders){

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
    this.canceledOrders = [];
    for(var i = 0; i < this.allOrders.length; i++){
      if(this.allOrders[i].shippingStatus == "Shipping"){
        this.shippingOrders.push(this.allOrders[i]);
      }
      else if(this.allOrders[i].shippingStatus == "Complete"){
        this.completedOrders.push(this.allOrders[i]);
      }
      else if(this.allOrders[i].shippingStatus == "Cancelled"){
        this.canceledOrders.push(this.allOrders[i]);
      }
    }
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

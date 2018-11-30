<template>
  <div id = "cart">
    <div id="topCartContainer">
        <div>
          <div class = "col-sm-12">
            <h1 id="CartTopText">Cart Overview</h1>
          </div>
        </div>
    </div>

    <div class = "container">

      <div class = "row">

        <div class = "col-sm-1"></div>

        <div class = "col-sm-8">

            <div class = "container">

              <div class = "row">
                <div id="FoxcycleLogoCart">
                    Foxcycle
                </div>
              </div>
              <div class = "row">
                <div>
                    <!-- display number of items here-->
                </div>
              </div>

              <br>


              <div class = "row">
                <div class = "col-sm-4">
                    Item
                </div>
                <div class = "col-sm-2"></div>
                <div class = "col-sm-2">
                    price
                </div>
                <div class = "col-sm-2"></div>
                <div class = "col-sm-2">
                    amount
                </div>
              </div>

            </div>
          </div>
          <div class = "col-sm-3"></div>

      </div>
      <div class = "row">
        <ul class ="noCartBullets">
          <li id="item-names" v-for="(item, index) in orderItemsInCurrentOrderWithItemData">
            <div class = "cartItem">
                <div class = "container">
                    <div class = "row cartItemName">

                        <div class = "col-sm-7">
                          {{item.name}}
                        </div>
                        <div class = "col-sm-5"></div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm-12 itemIndex">
                          item id: {{index}}
                        </div>
                    </div>
                    <div class = "row">

                        <div class = "col-sm-4">
                            <img v-bind:src="item.picName" width=100%>
                        </div>
                        <div class = "col-sm-2"></div>
                        <div class = "col-sm-2 priceStyle">
                            ${{item.price}}
                        </div>
                        <div class = "col-sm-2"></div>
                        <div class = "col-sm-2 quantityStyle">
                            {{item.quantity}}
                        </div>
                    </div>

              </div>
            </div>
          </li>
        </ul>

      </div>

    </div>





    <input type="button" v-on:click="getUserOrder()">
    <input type="button" v-on:click="getCombinedData()">



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
      if(this.orders[i].shippingStatus == "Cart"){
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
}

#topCartContainer {
  border-bottom: 2px #EDEDED solid;
}

#CartTopText {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

.noCartBullets {
  ul {
    list-style-type: none;
  }
  li {
    list-style-type: none;
  }
}

.cartItem {
  background-color: white;
  border: 1px black solid;
  padding: 5px;
  margin: 4px;
  width: 100%;
}

.cartItem:hover {
  background-color: #DCDCDC;
}

.cartItemName {
  font-weight: bold;
  font-size: 25px;
  color: blue;
}

.itemIndex {
  font-style: italic;
  color: grey;
}

.priceStyle {
  color: red;
  font-size: 20px;
  font-weight: bold;
}

.quantityStyle {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

#FoxcycleLogoCart {
  color: #FFD700;
  font-family: "Cambria", "Courier New", "Times New Roman", serif;
  font-style: italic;
  font-size: 30px;
}




</style>

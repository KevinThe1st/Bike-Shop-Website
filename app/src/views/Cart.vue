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
          <div class = "col-sm-1"></div>
          <div class = "col-sm-2">

              <div id = "backToShopSidebox">
                <div id = "container">
                    <div id = "row">
                        <div id = "col-sm-2"></div>
                        <div id = "col-sm-8">
                          <p></p>
                          <p class = "centerText boldText">Thank you for shopping with us!</p>

                          <img alt="Vue logo" id="bikeLogoImg" src="../assets/bikeLogo2.png">

                          <p class = "centerText">Find everything you were looking for?</p>

                          <router-link :to="{name: 'shop'}">
                            <button class="btn btn-primary" id="toShopButton">Back to Shop</button>
                          </router-link>
                        </div>
                        <div id = "col-sm-2"></div>

                    </div>

                </div>
              </div>

          </div>

      </div>

      <div class = "row">
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
                              item id: {{item.id}}
                            </div>
                        </div>
                        <div class = "row">

                            <div class = "col-sm-4">
                                <img v-bind:src="item.picName" width=70%>
                            </div>
                            <div class = "col-sm-2">

                                <br><br><br><br><br>
                                <button class="btn btn-danger" id="removeButton" v-on:click="removeItems(item.id)">Remove</button>
                            </div>
                            <div class = "col-sm-2 priceStyle">
                                ${{item.price}}
                            </div>
                            <div class = "col-sm-2"></div>
                            <div class = "col-sm-2 quantityStyle">
                            {{item.quantity}}

                            </div>
                            <br>
                            <br>
                        </div>

                  </div>

                </div>
                <hr>
              </li>
            </ul>



        </div>
      </div>


    </div>

    <div class = "container">

      <div class = "row">

        <div class = "col-sm-12" id = "centeredDiv">

              <p id = "SubtotalPrice">Subtotal price ({{totalQuantity}} items): ${{totalPrice}}</p>
              <br>
              <button class="btn btn-success">Proceed to Checkout</button>

        </div>

      </div>


    </div>



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
  totalPrice: number = 0;
  totalQuantity = 0

  beforeMount(){
    this.getCartData()
  }

  getCartData(){
    axios.get(`/api/orders/cart/` + this.$store.getters.getLoginStatus)
    .then((res) => {
      this.currentOrder = res.data.order;
      axios.get(`/api/orderItems/` + this.currentOrder.id)
      .then((res) => {
        this.orderItemsInCurrentOrder = res.data.items;
        this.itemsInCurrentOrder = [];
        var ids = [];
        for(var i = 0; i < this.orderItemsInCurrentOrder.length; i++){
          ids.push(this.orderItemsInCurrentOrder[i].ItemId);
        }

        axios.put(`/api/items/list/`, {ids})
        .then((res2) => {
          this.itemsInCurrentOrder = res2.data.items;
          this.updateCombinedData()
        })
      });
    });
  }

  updateCombinedData(){
    this.orderItemsInCurrentOrderWithItemData = [];
    this.totalQuantity = 0;
    this.totalPrice = 0;
    for(var i = 0; i < this.orderItemsInCurrentOrder.length; i++){
      var temp = new CurrentOrderItem;
      temp.id = this.itemsInCurrentOrder[i].id;
      temp.picName = this.itemsInCurrentOrder[i].picName;
      temp.name = this.itemsInCurrentOrder[i].name;
      temp.price = this.orderItemsInCurrentOrder[i].price;
      temp.quantity = this.orderItemsInCurrentOrder[i].quantity;
      this.orderItemsInCurrentOrderWithItemData.push(temp);
      this.totalQuantity += temp.quantity;
      this.totalPrice += temp.price
    }
  }

  removeItems(itemId) {
    axios.put('/api/orderItems/deleteItems', {
      itemId: itemId,
      orderId: this.currentOrder.id
    }).then((res) => {
      this.getCartData()
    });
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

  padding: 5px;
  margin: 1px;
  width: 100%;

}

.cartItem:hover {
  background-color: #DCDCDC;
}

.cartItemName {
  font-size: 25px;
  color: #0AA1FF;
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

#backToShopSidebox {
  background-color: #D3D3D3;
  height: 300px;
  width: 200px;
  position: absolute;
  top: 200px;
  border-radius: 10px;
  margin-left: 40px;

}

#bikeLogoImg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

.centerText {
  text-align: center;
}

.boldText {
  font-weight: bold;
}

#toShopButton {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#removeButton {
  position: absolute;
}

#SubtotalPrice {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

#centeredDiv {
  margin: 0 auto;
  text-align: center;
}

body {
  background-color: #F9F9F9;
}




</style>

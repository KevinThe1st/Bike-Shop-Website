<template>
  <div id="admin-order-management">
    <div id = "container">
      <div id = "row">
          <div id = "col-sm-12">
              <div id= "ManageOrdersText">Manage Orders</div>
          </div>
      </div>

    </div>


    <div id = "container">
      <div id = "row">
          <div id = "col-sm-12">
              <div class="manageOrdersHeaders">Shipping</div>
              <br>
              <ul class="noCartBulletsOrderManagement">
                <li v-for="(order, orderIndex) in shippingOrders" v-if="numberOfLoadedItemSets == shippingOrders.length">
                  <div class = "row">
                      <div class = "col-sm-2"><p class ="orderManagerNumber">Order #{{order.id}}</p></div>
                      <div class = "col-sm-10"></div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-3"><p class ="orderInfoHeader">Total Price: ${{order.totalPrice}}</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == true"><p class ="orderInfoHeader">In-store Pickup: yes</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == false"><p class ="orderInfoHeader">In-store Pickup: no</p></div>
                      <div class = "col-sm-3"><p class ="orderInfoHeader">User: </p></div>
                      <div class = "col-sm-3">
                        <button class="btn btn-success" type="submit">Complete Order</button>
                        <br><br>
                        <button class="btn btn-danger" type="submit" v-on:click="cancelOrder(orderIndex)">Cancel Order</button>

                      </div>
                  </div>

                  <table class="manageOrdersTables">
                    <tr class="manageOrderTableStyles">
                        <td class="manageOrderTableStyles">
                          <p>Item ID</p>
                        </td>
                        <td class="manageOrderTableStyles">
                          <p>Name</p>
                        </td>
                        <td class="manageOrderTableStyles">
                          <p>Price</p>
                        </td>
                        <td class="manageOrderTableStyles">
                          <p>Quantity</p>
                        </td>
                    </tr>
                    <template v-for="(item, itemIndex) in itemsAssociatedWithShippingOrders[orderIndex]">
                        <tr class="manageOrderTableStyles">
                          <td class="manageOrderTableStyles">
                              {{item.id}}
                          </td>
                          <td class="manageOrderTableStyles">
                              {{item.name}}
                          </td>
                          <td class="manageOrderTableStyles">
                              {{item.price}}
                          </td>
                          <td class="manageOrderTableStyles">

                          </td>
                        </tr>
                    </template>
                  </table>
                  <br>

                </li>
              </ul>
          </div>
      </div>

    </div>

    <hr>

    <div id = "container">
      <div id = "row">
          <div id = "col-sm-12">
              <div class="manageOrdersHeaders">Completed</div>
              <br>
              <ul class="noCartBulletsOrderManagement">
                <li v-for="(order, index) in completedOrders">
                  <div class = "row">
                      <div class = "col-sm-2"><p class ="orderManagerNumber">Order #{{order.id}}</p></div>
                      <div class = "col-sm-10"></div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-3"><p class ="orderInfoHeader">Total Price: ${{order.totalPrice}}</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == true"><p class ="orderInfoHeader">In-store Pickup: yes</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == false"><p class ="orderInfoHeader">In-store Pickup: no</p></div>
                      <div class = "col-sm-3"><p class ="orderInfoHeader">User: </p></div>
                      <div class = "col-sm-3"></div>
                  </div>

<!--
                  <table class="manageOrdersTables">
                    <tr class="manageOrderTableStyles">
                        <td class="manageOrderTableStyles">
                          <p>Item ID</p>
                        </td>
                        <td class="manageOrderTableStyles">
                          <p>Name</p>
                        </td>
                        <td class="manageOrderTableStyles">
                          <p>Price</p>
                        </td>
                        <td class="manageOrderTableStyles">
                          <p>Quantity</p>
                        </td>
                    </tr>
                    <template v-for="(item, itemIndex) in itemsAssociatedWithShippingOrders[orderIndex]">
                        <tr class="manageOrderTableStyles">
                          <td class="manageOrderTableStyles">
                              {{item.id}}
                          </td>
                          <td class="manageOrderTableStyles">
                              {{item.name}}
                          </td>
                          <td class="manageOrderTableStyles">
                              {{item.price}}
                          </td>
                          <td class="manageOrderTableStyles">

                          </td>
                        </tr>
                    </template>
                  </table> -->
                  <br>

                </li>
              </ul>
          </div>
      </div>

    </div>

    <hr>

    <div id = "container">
      <div id = "row">
          <div id = "col-sm-12">
              <div class="manageOrdersHeaders">Cancelled</div>
              <br>
              <ul class="noCartBulletsOrderManagement">
                <li v-for="(order, index) in cancelledOrders">
                  <div class = "row">
                      <div class = "col-sm-2"><p class ="orderManagerNumber">Order #{{order.id}}</p></div>
                      <div class = "col-sm-10"></div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-3"><p class ="orderInfoHeader">Total Price: ${{order.totalPrice}}</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == true"><p class ="orderInfoHeader">In-store Pickup: yes</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == false"><p class ="orderInfoHeader">In-store Pickup: no</p></div>
                      <div class = "col-sm-3"><p class ="orderInfoHeader">User: </p></div>
                      <div class = "col-sm-3"></div>
                  </div>

    <!--
                  <table class="manageOrdersTables">
                    <tr class="manageOrderTableStyles">
                        <td class="manageOrderTableStyles">
                          <p>Item ID</p>
                        </td>
                        <td class="manageOrderTableStyles">
                          <p>Name</p>
                        </td>
                        <td class="manageOrderTableStyles">
                          <p>Price</p>
                        </td>
                        <td class="manageOrderTableStyles">
                          <p>Quantity</p>
                        </td>
                    </tr>
                    <template v-for="(item, itemIndex) in itemsAssociatedWithShippingOrders[orderIndex]">
                        <tr class="manageOrderTableStyles">
                          <td class="manageOrderTableStyles">
                              {{item.id}}
                          </td>
                          <td class="manageOrderTableStyles">
                              {{item.name}}
                          </td>
                          <td class="manageOrderTableStyles">
                              {{item.price}}
                          </td>
                          <td class="manageOrderTableStyles">

                          </td>
                        </tr>
                    </template>
                  </table> -->
                  <br>

                </li>
              </ul>
          </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { OrderItem, ShopItem } from '@/models';

@Component
export default class AdminOrderManagement extends Vue {
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
    this.numberOfLoadedItemSets--;
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
      this.itemsAssociatedWithShippingOrders[orderIndex] = res.data;
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
  margin-left: 10px;
}

#ManageOrdersText {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

.manageOrdersHeaders {
  font-weight: bold;
  color: blue;
  font-size: 18px;
}

.noCartBulletsOrderManagement {
  ul {
    list-style-type: none;
  }
  li {
    list-style-type: none;
  }
}

.orderManagerNumber {
  font-weight: bold;
  font-size: 18px;
}

.orderInfoHeader {
  font-size: 18px;
}

.manageOrdersTables {
  border-spacing: 20px;
  border-collapse: collapse;
  border: 1px solid black;
}

.manageOrderTableStyles {
  border: 1px solid black;
}


</style>

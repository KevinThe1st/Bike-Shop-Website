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
                <li v-for="(order, orderIndex) in shippingOrders" v-if="itemsAssociatedWithOrders[0].length == shippingOrders.length && usersAssociatedWithOrders[0].length == shippingOrders.length &&
                     orderItemsAssociatedWithOrders[0].length == shippingOrders.length">
                  <div class = "row">
                      <div class = "col-sm-2"><p class ="orderManagerNumber">Order #{{order.id}}</p></div>
                      <div class = "col-sm-10"></div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-3"><p class ="orderInfoHeader">Total Price: ${{order.totalPrice}}</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == true"><p class ="orderInfoHeader">In-store Pickup: yes</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == false"><p class ="orderInfoHeader">In-store Pickup: no</p></div>
                      <div class = "col-sm-3"><p class ="orderInfoHeader">User:
                        {{usersAssociatedWithOrders[0][orderIndex]}}</p>
                      </div>
                      <div class = "col-sm-3">
                        <button class="btn btn-success" type="submit" v-on:click="completedOrder(orderIndex)">Complete Order</button>
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
                    <template v-for="(item, itemIndex) in itemsAssociatedWithOrders[0][orderIndex]">
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
                            {{orderItemsAssociatedWithOrders[0][orderIndex][itemIndex]}}
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
>>>>>>> 8f2a8ade5d024ffa76b862757818faeed3db2a9f
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

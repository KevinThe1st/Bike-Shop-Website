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
                        {{usersAssociatedWithOrders[0][orderIndex].username}}</p>
                      </div>
                      <div class = "col-sm-3">
                        <button class="btn btn-success" type="submit" v-on:click="completeOrder(orderIndex)">Complete Order</button>
                        <br><br>
                        <button class="btn btn-danger" type="submit" v-if="$store.getters.getLoginPermissionLevel == 'Admin'" v-on:click="cancelOrder(orderIndex)">Cancel Order</button>

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
                            {{orderItemsAssociatedWithOrders[0][orderIndex][itemIndex].quantity}}
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
                <li v-for="(order, orderIndex) in completedOrders" v-if="itemsAssociatedWithOrders[1].length == completedOrders.length && usersAssociatedWithOrders[1].length == completedOrders.length &&
                     orderItemsAssociatedWithOrders[1].length == completedOrders.length">
                  <div class = "row">
                      <div class = "col-sm-2"><p class ="orderManagerNumber">Order #{{order.id}}</p></div>
                      <div class = "col-sm-10"></div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-3"><p class ="orderInfoHeader">Total Price: ${{order.totalPrice}}</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == true"><p class ="orderInfoHeader">In-store Pickup: yes</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == false"><p class ="orderInfoHeader">In-store Pickup: no</p></div>
                      <div class = "col-sm-3"><p class ="orderInfoHeader">User:
                        {{usersAssociatedWithOrders[1][orderIndex].username}}</p>
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
                    <template v-for="(item, itemIndex) in itemsAssociatedWithOrders[1][orderIndex]">
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
                            {{orderItemsAssociatedWithOrders[1][orderIndex][itemIndex].quantity}}
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
              <div class="manageOrdersHeaders">Cancelled</div>
              <br>
              <ul class="noCartBulletsOrderManagement">
                <li v-for="(order, orderIndex) in cancelledOrders" v-if="itemsAssociatedWithOrders[2].length == cancelledOrders.length && usersAssociatedWithOrders[2].length == cancelledOrders.length &&
                     orderItemsAssociatedWithOrders[2].length == cancelledOrders.length">
                  <div class = "row">
                      <div class = "col-sm-2"><p class ="orderManagerNumber">Order #{{order.id}}</p></div>
                      <div class = "col-sm-10"></div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-3"><p class ="orderInfoHeader">Total Price: ${{order.totalPrice}}</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == true"><p class ="orderInfoHeader">In-store Pickup: yes</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == false"><p class ="orderInfoHeader">In-store Pickup: no</p></div>
                      <div class = "col-sm-3"><p class ="orderInfoHeader">User:
                        {{usersAssociatedWithOrders[2][orderIndex].username}}</p>
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
                    <template v-for="(item, itemIndex) in itemsAssociatedWithOrders[2][orderIndex]">
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
                            {{orderItemsAssociatedWithOrders[2][orderIndex][itemIndex].quantity}}
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { OrderItem, ShopItem, CreateUserItem, OrderItemItem } from '@/models';

@Component
export default class AdminOrderManagement extends Vue {
  allOrders: OrderItem[] = [];
  shippingOrders: OrderItem[] = [];
  completedOrders: OrderItem[] = [];
  cancelledOrders: OrderItem[] = [];
  orderItemsAssociatedWithOrders: [OrderItemItem[]] = [[]];
  itemsAssociatedWithOrders: [ShopItem[]] = [[]];
  usersAssociatedWithOrders: [CreateUserItem[]] = [[]];

  cancelOrder(indexIntoShippingOrders){
    axios.patch(`/api/orders/` + this.shippingOrders[indexIntoShippingOrders].id + `/Cancelled`);
    // client side front end change
    this.$set(this.shippingOrders[indexIntoShippingOrders], "shippingStatus", "Cancelled");
    var transferredOrder = this.shippingOrders.splice(indexIntoShippingOrders, 1);
    this.cancelledOrders.push(transferredOrder[0]);
    var transferredItem = this.itemsAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    var transferredUser = this.usersAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    var transferredOrderItem = this.orderItemsAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    this.itemsAssociatedWithOrders[2].push(transferredItem[0]);
    this.usersAssociatedWithOrders[2].push(transferredUser[0]);
    this.orderItemsAssociatedWithOrders[2].push(transferredOrderItem[0]);
  }

  completeOrder(indexIntoShippingOrders){
    axios.patch(`/api/orders/` + this.shippingOrders[indexIntoShippingOrders].id + `/Complete`);
    // client side front end change
    this.$set(this.shippingOrders[indexIntoShippingOrders], "shippingStatus", "Complete");
    var transferredOrder = this.shippingOrders.splice(indexIntoShippingOrders, 1);
    this.completedOrders.push(transferredOrder[0]);
    var transferredItem = this.itemsAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    var transferredUser = this.usersAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    var transferredOrderItem = this.orderItemsAssociatedWithOrders[0].splice(indexIntoShippingOrders, 1);
    this.itemsAssociatedWithOrders[1].push(transferredItem[0]);
    this.usersAssociatedWithOrders[1].push(transferredUser[0]);
    this.orderItemsAssociatedWithOrders[1].push(transferredOrderItem[0]);
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

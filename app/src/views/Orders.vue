<template>
  <div id="orders">

    <!-- Page allows users to view their current and past orders -->

    <div id = "container">
      <div id = "row">
          <div id = "col-sm-12">
              <!-- Title for page -->
              <div id= "SeeOrdersText">My Orders</div>
          </div>
      </div>

    </div>

    <!-- Container that holds current shipping info in bootstrap container -->
    <div id = "container">

      <!-- Row that contains current shipping orders -->
      <div id = "row">
          <div id = "col-sm-12">

              <div class="manageOrdersHeaders">Shipping</div>
              <br>
              <ul class="noCartBulletsOrderManagement">
                <li v-for="(order, orderIndex) in shippingOrders" v-if="itemsAssociatedWithOrders[0].length == shippingOrders.length &&
                     orderItemsAssociatedWithOrders[0].length == shippingOrders.length">
                  <div class = "row">
                      <div class = "col-sm-2"><p class ="orderManagerNumber">Order #{{order.id}}</p></div>
                      <div class = "col-sm-10"></div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-3"><p class ="orderInfoHeader">Total Price: ${{order.totalPrice}}</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == true"><p class ="orderInfoHeader">In-store Pickup: yes</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == false"><p class ="orderInfoHeader">In-store Pickup: no</p></div>

                  </div>

                  <!-- Table that displays items in order -->
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

    <!-- hr, horizontal rules display lines on page for styling -->
    <hr>

    <!-- container that holds completed orders info -->
    <div id = "container">
      <div id = "row">
          <div id = "col-sm-12">
              <div class="manageOrdersHeaders">Completed</div>
              <br>
              <ul class="noCartBulletsOrderManagement">
                <li v-for="(order, orderIndex) in completedOrders" v-if="itemsAssociatedWithOrders[1].length == completedOrders.length &&
                     orderItemsAssociatedWithOrders[1].length == completedOrders.length">
                  <div class = "row">
                      <div class = "col-sm-2"><p class ="orderManagerNumber">Order #{{order.id}}</p></div>
                      <div class = "col-sm-10"></div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-3"><p class ="orderInfoHeader">Total Price: ${{order.totalPrice}}</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == true"><p class ="orderInfoHeader">In-store Pickup: yes</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == false"><p class ="orderInfoHeader">In-store Pickup: no</p></div>
                  </div>

                  <!-- Table that displays items in orders -->

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

    <!-- Container that holds info on orders users had that were cancelled -->

    <div id = "container">
      <div id = "row">
          <div id = "col-sm-12">
              <div class="manageOrdersHeaders">Cancelled</div>
              <br>
              <ul class="noCartBulletsOrderManagement">
                <li v-for="(order, orderIndex) in cancelledOrders" v-if="itemsAssociatedWithOrders[2].length == cancelledOrders.length &&
                     orderItemsAssociatedWithOrders[2].length == cancelledOrders.length">
                  <div class = "row">
                      <div class = "col-sm-2"><p class ="orderManagerNumber">Order #{{order.id}}</p></div>
                      <div class = "col-sm-10"></div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-3"><p class ="orderInfoHeader">Total Price: ${{order.totalPrice}}</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == true"><p class ="orderInfoHeader">In-store Pickup: yes</p></div>
                      <div class = "col-sm-3" v-if="order.storePickup == false"><p class ="orderInfoHeader">In-store Pickup: no</p></div>

                  </div>

                  <!-- Table that displays items in orders -->

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
import { OrderItem, ShopItem, OrderItemItem } from '@/models';

@Component
export default class Orders extends Vue {
  allOrders: OrderItem[] = [];
  shippingOrders: OrderItem[] = [];
  completedOrders: OrderItem[] = [];
  cancelledOrders: OrderItem[] = [];
  orderItemsAssociatedWithOrders: [OrderItemItem[]] = [[]];
  itemsAssociatedWithOrders: [ShopItem[]] = [[]];

  getAllOrders(){
    axios.get(`/api/orders/user/` + this.$store.getters.getLoginStatus)
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
    for(var i = 0; i < this.shippingOrders.length; i++){
      this.getItemsAssociatedWithOrder(i, "Shipping");
      this.getOrderItemsAssociatedWithOrder(i, "Shipping");
    }
    for(var i = 0; i < this.completedOrders.length; i++){
      this.getItemsAssociatedWithOrder(i, "Completed");
      this.getOrderItemsAssociatedWithOrder(i, "Completed");
    }
    for(var i = 0; i < this.cancelledOrders.length; i++){
      this.getItemsAssociatedWithOrder(i, "Cancelled");
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
#orders {
  padding: 80px 0px;
  margin-left: 10px;
}

#SeeOrdersText {
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

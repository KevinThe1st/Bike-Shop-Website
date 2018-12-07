<template>
  <div id="checkout">

    <div class = "container">
      <div class = "row">
        <div class = "col-sm-12">
          <p id="checkoutText">Checkout</p>
          <hr>
        </div>
      </div>
    </div>

    <div class = "container">
      <div class = "row">
        <div class = "col-sm-9">
          <div class = "row">
              <div class = "col-sm-1 checkoutBold">1</div>
              <div class = "col-sm-2 checkoutBold">Shipping Address</div>
              <div class = "col-sm-2"></div>
              <div class = "col-sm-5">
                <button class = "btn btn-secondary" v-on:click="updateAddress(shippingAddress)">Update</button>
                <br><br>
                <b-form-input id="input-default1" type="text" v-model="shippingAddress.street1"></b-form-input>
                <b-form-input id="input-default2" type="text" v-model="shippingAddress.street2"></b-form-input>
                <b-form-input id="input-default3" type="text" v-model="shippingAddress.city"></b-form-input>
                <b-form-input id="input-default4" type="text" v-model="shippingAddress.state"></b-form-input>
                <b-form-input id="input-default5" type="text" v-model="shippingAddress.zip"></b-form-input>
              </div>
              <div class = "col-sm-2"></div>
          </div>
          <hr>
          <div class = "row">
              <div class = "col-sm-1 checkoutBold">2</div>
              <div class = "col-sm-2 checkoutBold">Billing Address</div>
              <div class = "col-sm-2"></div>
              <div class = "col-sm-5">
                <button class = "btn btn-secondary" v-on:click="updateAddress(billingAddress)">Update</button>
                <br><br>
                <b-form-input id="input-default1" type="text" v-model="billingAddress.street1"></b-form-input>
                <b-form-input id="input-default2" type="text" v-model="billingAddress.street2"></b-form-input>
                <b-form-input id="input-default3" type="text" v-model="billingAddress.city"></b-form-input>
                <b-form-input id="input-default4" type="text" v-model="billingAddress.state"></b-form-input>
                <b-form-input id="input-default5" type="text" v-model="billingAddress.zip"></b-form-input>
              </div>
              <div class = "col-sm-2"></div>
          </div>
          <hr>
          <div class = "row">
              <div class = "col-sm-1 checkoutBold">3</div>
              <div class = "col-sm-2 checkoutBold">Payment Method</div>
              <div class = "col-sm-1"></div>
              <div class = "col-sm-3">
                <b-form-input id="input-default" type="text" placeholder="Card #"></b-form-input>
                <br>
                <b-form-input id="input-default" type="text" placeholder="CSC (3 digit code)"></b-form-input>
              </div>
              <div class = "col-sm-2"></div>
              <div class = "col-sm-3">

                <div>
                  <input type="radio" id="masterCard" name="radioset1" checked>
                  <label><img alt="Vue logo" src="../assets/mastercard.png" class="creditCardImages"></label>
                </div>

                <div>
                  <input type="radio" id="visa" name="radioset1">
                  <label><img alt="Vue logo" src="../assets/visa.png" class="creditCardImages"></label>
                </div>

                <div>
                  <input type="radio" id="americanExpress" name="radioset1">
                  <label><img alt="Vue logo" src="../assets/americanExpress.png" class="creditCardImages"></label>
                </div>

                <div>
                  <input type="radio" id="payPal" name="radioset1">
                  <label><img alt="Vue logo" src="../assets/paypal.png" class="creditCardImages"></label>
                </div>
              </div>
          </div>
          <hr>

          <div class = "row">
              <div class = "col-sm-1 checkoutBold">4</div>
              <div class = "col-sm-2 checkoutBold">Delivery or Pick-up</div>
              <div class = "col-sm-1"></div>
              <div class = "col-sm-4">
                <div>
                  <input type="radio" name="radioset2" checked v-on:click="storePickup=false">
                  <label class="marginLeftRadio">Deliver to Shipping Address</label>
                </div>
              </div>
              <div class = "col-sm-4">
                <div>
                  <input type="radio" name="radioset2" v-on:click="storePickup=true">
                  <label class="marginLeftRadio">Pick-up In-Store</label>
                </div>
              </div>
          </div>
          <hr>

          <div class = "row">
              <div class = "col-sm-4 checkoutBold">
                  Total Price: ${{totalPrice}}
              </div>
              <div class = "col-sm-8"></div>
          </div>
          <div class = "row">
              <button class = "btn btn-success" id = "checkoutButton" v-on:click="finalizeCheckout()">Place your order</button>
          </div>


          </div>

          <div class = "col-sm-1"></div>

          <div class = "col-sm-2">

            <div id="checkoutSideBox">
                <p id = "checkoutSideBoxTopText">Review Order</p>
                <br>
                <p class = "checkoutSideBoxBodyText">Total Price ${{this.totalPrice}} </p>
                <br>
                <br>
                <br>
                <button class = "btn-sm btn-success" id = "checkoutButtonSmall" v-on:click="finalizeCheckout()">Place your order</button>

            </div>

          </div>
        </div>


      </div>



  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { AddressItem, OrderItem } from '@/models';

@Component
export default class Checkout extends Vue {
  userId: number;
  shippingAddress: AddressItem = null;
  billingAddress: AddressItem = null;
  order: OrderItem = null;
  storePickup: Boolean = false;

  totalPrice = 0
  totalItems = 0

  finalizeCheckout(){
    axios.patch(`/api/orders/pickup/` + this.order.id + `/` + this.storePickup)
    axios.patch(`/api/orders/` + this.order.id + `/Shipping`).then(() => {
      this.$router.push({name: 'home'})
    })
  }

  getUsersAddresses(){
    axios.get(`/api/addresses/user/` + this.userId)
    .then((res) => {
      for(var i = 0; i < res.data.addresses.length; i++){
        if(res.data.addresses[i].type == "Shipping"){
          this.shippingAddress = res.data.addresses[i];
          console.log("s" + this.shippingAddress);
        }
        else if(res.data.addresses[i].type == "Billing"){
          this.billingAddress = res.data.addresses[i];
          console.log("b" + this.billingAddress);
        }
      }
    });
  }

  getOrderData(){
    axios.get('/api/orders/cart/' + this.userId)
    .then((res) => {
      this.order = res.data.order
      this.totalPrice = this.order.totalPrice
    });
  }

  beforeMount(){
    this.userId = this.$store.getters.getLoginStatus;
    this.getUsersAddresses();
    this.getOrderData();
  }

  updateAddress(address){
    axios.put('/api/addresses/edit/', {
        type: address.type,
        street1: address.street1,
        street2: address.street2,
        state: address.state,
        city: address.city,
        zip: address.zip,
        userId: this.$store.getters.getLoginStatus
    }).then((res) => {
      console.log("Update Successful");
    });
  }

}
</script>

<style lang="scss">
#checkout {
  padding: 80px 0px;
}

#checkoutText {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

.checkoutBold {
  font-weight: bold;
}

.creditCardImages {
  width: 60px;
  height: 39px;
  margin-left: 5px;
}

.marginLeftRadio {
  margin-left: 5px;
}

#checkoutButton {
  margin: auto;
}

#checkoutSideBox {
  border: solid 1px #EDEDED;
  border-radius: 15px;
  width: 100%;
  height: 300px;
  text-align: center;
}

#checkoutSideBoxTopText {
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.checkoutSideBoxBodyText {
  font-size: 14px;
  text-align: center;
}

</style>

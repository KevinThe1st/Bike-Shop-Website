<template>
  <div id="checkout" v-if="shippingAddress && billingAddress">
    <p>Shipping: {{shippingAddress}}</p>
    <p>Billing: {{billingAddress}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { AddressItem } from '@/models';

@Component
export default class Checkout extends Vue {
  userId: number;
  shippingAddress: AddressItem = null;
  billingAddress: AddressItem = null;

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

  beforeMount(){
    this.userId = this.$store.getters.getLoginStatus;
    this.getUsersAddresses();
  }

}
</script>

<style lang="scss">
#checkout {
  padding: 80px 0px;
}
</style>

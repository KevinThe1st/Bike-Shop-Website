<template>
  <div id="product">
    <!-- A component that displays one item on the shop page -->

    <!-- Displays info of product within this div -->
    <div id = "productStyle">
      <p id = "boldText">
        {{name}}
      </p>
      <div class = "container">
          <div class = "row">
            <div class = "col-sm-4">
              <img v-bind:src="picName" width = 200px>
            </div>
            <div class = "col-sm-5">
              <p>
                Description: {{descShort}}
              </p>
            </div>
            <div class = "col-sm-3">
              <p>
                Price: ${{price}}
              </p>
              <p>
                Stock: {{stock}}
              </p>
              <p class ="inlineBlock">Quantity: </p>
              <input class="form-control form-control-sm inlineBlock" id="inputTextbox" v-model="qty" type="number" :max="stock" min="0" placeholder="1">
              <br>
              <div v-if="((qty > stock) && (stock!=0)) || (qty < 0) " class="alert alert-danger" role="alert">
                Your quantity cannot exceed the stock value or be less than 1
              </div>
              <b-alert :show="boolQty" dismissible fade variant="success" v-on:dismissed="changeDismissedToFalse()"> Item(s) added to cart
              </b-alert>
              <button class="btn btn-success buttonClass" :disabled="(qty > stock) || (qty < 1)" v-on:click="addToCart()">Add to Cart</button>
              <br>
              <b-button class="bButtonMargins" variant="primary" v-on:click="displayModalShow()">
                Product Info
              </b-button>

              <!-- Code for modal to display when additional info is clicked -->

              <b-modal size="lg"
              centered
              header-bg-variant="warning"
              v-model="modalShow" :title="name">
                  <div class = "row">
                    <b-alert class="centeredAlert" :show="boolQty" dismissible fade variant="success" v-on:dismissed="changeDismissedToFalse()"> Item(s) added to cart
                    </b-alert>
                    <div v-if="((qty > stock) && (stock!=0)) || (qty < 0) " class="alert alert-danger centeredAlert" role="alert">
                      Your quantity cannot exceed the stock value or be less than 1
                    </div>
                  </div>
                  <div class = "row">
                      <div class = "col-sm-4">
                          <img v-bind:src="picName" width = 100%>
                      </div>
                      <div class = "col-sm-1"></div>
                      <div class = "col-sm-7">
                        <br>
                          {{descLong}}
                      </div>
                  </div>
                  <div class = "row">
                    <div class = "col-sm-1"></div>
                    <div class = "col-sm-4 modalProductPrice">Subtotal Price: ${{price}}</div>
                    <div class = "col-sm-4">
                      <p class ="inlineBlock">Quantity: </p>
                      <input class="form-control form-control-sm inlineBlock" id="inputTextbox" v-model="qty" type="number" :max="stock" min="0" placeholder="1">
                    </div>
                    <div class = "col-sm-3">
                      <button class="btn btn-success buttonClass" :disabled="(qty > stock) || (qty < 1)" v-on:click="addToCart()">Add to Cart</button>
                    </div>

                  </div>

                  <div slot="modal-footer" class="w-100">
                     <p class="returnPolicyText">Returns accepted within 60 days on undamaged items.  Faulty components will be replaced at no charge within the first 3 months of ownership at no charge.  Free bike tune-ups provided within the first 6 months.</p>
                   </div>

              </b-modal>

              </div>

            </div>
          </div>
      </div>

    </div>


  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component({
  props: {
    id: Number,
    price: Number,
    stock: Number,
    name: String,
    descShort: String,
    descLong: String,
    picName: String,
  }
})
export default class Product extends Vue {
  qty = 1;
  boolQty = false;
  modalShow = false;

  displayModalShow() {
    this.modalShow = !this.modalShow;
  }

  addToCart(){
    axios.put('/api/orderItems/cart', {
      userId: this.$store.getters.getLoginStatus,
      itemId: this.$props.id,
      quantity: this.qty,
    }).then((res) => {
      this.boolQty = true;
      var newStock = this.$props.stock - this.qty;
      axios.put(`/api/items/modifyItem`, {
        id: this.$props.id,
        name: this.$props.name,
        price: this.$props.price,
        stock: newStock,
        descShort: this.$props.descShort,
        descLong: this.$props.descLong,
      }).then((res) => {
        this.$props.stock -= this.qty
      })
    })
  }

  changeDismissedToFalse(){
    this.boolQty = false;
  }

}
</script>

<style lang="scss">
    .item {
        width: 350px;
        height:350px;
        color: black;
    }
    .item:hover {
        color: #f79927;
        background-color: grey;
        border: solid 2px black;
    }


    #productStyle {
      background-color: #EDEDED;
      width: 100%;
      margin-top: 3px;
      padding: 5px;
    }

    #productStyle:hover {
      background-color: #DCDCDC;
    }

    #boldText {
      font-weight: bold;
      font-size: 20px;
    }

    #inputTextbox {
      width: 60px;
    }

    .inlineBlock {
      display: inline;
    }

    .buttonClass {
      margin-top: 10px;
    }

    .bButtonMargins {
      margin-top: 5px;
      margin-bottom: 5px;
    }

    .modalProductPrice {
      font-weight: bold;
      color: green;
    }

    .centeredAlert {
      text-align: center;
      margin: auto;
    }

    .returnPolicyText {
      font-size: 10px;
      color: gray;
    }
</style>

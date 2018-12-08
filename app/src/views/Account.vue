<template>
    <div id="profile">

        <!-- This page will allow a user to view their account info, and update it -->


        <!-- Account page header text -->
        <h3 id = "AccountHeaderText">Account</h3>

        <!-- Fields that will display a users current info -->
        <form id="aFields">
            <div class="displayInfo">
                <div id="first" v-if="clicked === false">
                    <h5>First Name:</h5>
                    <h6 class="accountInfo">{{profile[0].firstName}}</h6>
                </div>
                <div id="last" v-if="clicked === false">
                    <h5>Last Name:</h5>
                    <h6 class="accountInfo">{{profile[0].lastName}}</h6>
                </div>
                <div id="uname" class="aFields" v-if="clicked === false">
                    <h5>Username:</h5>
                    <h6 class="accountInfo">{{profile[0].username}}</h6>
                </div>
                <div id="pass" v-if="clicked === false">
                    <h5>Password:</h5>
                    <h6 class="accountInfo">**********</h6>
                </div>
            </div>

            <!-- Shipping address info -->
            <div class="displayInfo">
                <div id="sa" v-if="clicked === false">
                    <h5>Shipping Address:</h5>
                    <div v-for="(address, index) in allAddresses" v-if="address.type == 'Shipping'">
                        <h6 class="accountInfo">{{address.street1}}</h6>
                        <h6 class="accountInfo">{{address.street2}}</h6>
                        <h6 class="accountInfo">{{address.city}}</h6>
                        <h6 class="accountInfo">{{address.state}}</h6>
                        <h6 class="accountInfo">{{address.zip}}</h6>
                        <br>
                    </div>
                </div>

                <!-- Billing address info -->
                <div id="ba" class="aFields" v-if="clicked === false">
                    <h5>Billing Address:</h5>
                    <div v-for="(address, index) in allAddresses" v-if="address.type == 'Billing'">
                        <h6 class="accountInfo">{{address.street1}}</h6>
                        <h6 class="accountInfo">{{address.street2}}</h6>
                        <h6 class="accountInfo">{{address.city}}</h6>
                        <h6 class="accountInfo">{{address.state}}</h6>
                        <h6 class="accountInfo">{{address.zip}}</h6>
                        <br>
                    </div>
                </div>
            </div>

            <!-- Update sections to update personal info -->
            <button id="Update" @click="update()" type="button" class="btn btn-primary" v-if="clicked === false">
                Update
            </button>
            <div id="fField" class="form-group" v-if="clicked === true">
                <label for="exampleInputFirstName1">Enter first name</label>
                <input type="text" class="form-control" id="exampleInputFirstName1" placeholder="First Name"
                       v-model="FirstMessage">
            </div>
            <div id="lField" class="form-group" v-if="clicked === true">
                <label for="exampleInputLastName1">Enter last name</label>
                <input type="text" class="form-control" id="exampleInputLastName1" placeholder="Last Name"
                       v-model="LastMessage">
            </div>
            <div id="uField" class="form-group" v-if="clicked === true">
                <label for="exampleInputUsername1">Enter your new username</label>
                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Username"
                       v-model="UsernameMessage">
            </div>
            <div id="pField" class="form-group" v-if="clicked === true">
                <label for="exampleInputPassword1">Enter your new password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                       v-model="PasswordMessage">
            </div>
            <div id="saField" class="form-group" v-if="clicked === true">
                <label>Enter your new shipping address</label>
                <input type="text" class="form-control" id="ss1" placeholder="Street 1" v-model="sStreet1Message">
                <input type="text" class="form-control" id="ss2" placeholder="Street 2" v-model="sStreet2Message">
                <input type="text" class="form-control" id="scity" placeholder="City" v-model="sCityMessage">
                <input type="text" class="form-control" id="sstate" placeholder="State" v-model="sStateMessage">
                <input type="text" class="form-control" id="szip" placeholder="ZIP code" v-model="sZIPMessage">
            </div>
            <div id="baField" class="form-group" v-if="clicked === true">
                <label>Enter your new billing address</label>
                <input type="text" class="form-control" id="bs1" placeholder="Street 1" v-model="bStreet1Message">
                <input type="text" class="form-control" id="bs2" placeholder="Street 2" v-model="bStreet2Message">
                <input type="text" class="form-control" id="bcity" placeholder="City" v-model="bCityMessage">
                <input type="text" class="form-control" id="bstate" placeholder="State" v-model="bStateMessage">
                <input type="text" class="form-control" id="bzip" placeholder="ZIP code" v-model="bZIPMessage">
            </div>
            <br>

            <button id="saveProfileChanges" @click="saveChanges()" type="submit" class="btn btn-primary saveButton" v-if="changes === true">Save
                changes
            </button>

            <br>
            <br>

            <button id="cancelProfileChanges" type="submit" class="btn btn-primary cancelButton" v-if="changes === true">Cancel
                changes
            </button>

        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';
import { AddressItem } from '@/models';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';


@Component({
  components: {
  },
  })


export default class Account extends Vue {

  clicked:boolean = false;
  changes:boolean = false;


  FirstMessage: string = '';
  LastMessage: string = '';
  UsernameMessage: string = '';
  PasswordMessage: string = '';

  sStreet1Message: string = '';
  sStreet2Message: string = '';
  sCityMessage: string = '';
  sStateMessage: string = '';
  sZIPMessage: string = '';

  bStreet1Message: string = '';
  bStreet2Message: string = '';
  bCityMessage: string = '';
  bStateMessage: string = '';
  bZIPMessage: string = '';


  profile: any[] = [{
    firstName: "Hansel",
    lastName: "Thorpedo",
    username: "Placeholder",
    password: "password",
  }];

  allAddresses: AddressItem[] = [];

  beforeMount(){
    axios
      .get('/api/users/' + this.$store.getters.getLoginStatus)
      .then((res) => {
        this.profile = [res.data.user]
        console.log(this.profile[0].password);
        console.log(this.profile);
        console.log(this.profile[0]);
      })
    axios
      .get('/api/addresses/user/' + this.$store.getters.getLoginStatus)
      .then((res) => {
        console.log(res.data);
        this.allAddresses = res.data.addresses
      })
  }

  update(){
    this.changes = true;
    this.clicked = true;
  }

  saveChanges(){
    axios.put(`/api/users/edit`, {
        id: this.$store.getters.getLoginStatus,
        firstName: this.FirstMessage,
        lastName: this.LastMessage,
        username: this.UsernameMessage,
        password: this.PasswordMessage
    }).then((res) => {
      console.log("Update Successful");
    })

    axios.put('/api/addresses/edit', {
        type: "Shipping",
        street1: this.sStreet1Message,
        street2: this.sStreet2Message,
        state: this.sCityMessage,
        city: this.sStateMessage,
        zip : this.sZIPMessage,
        userId: this.$store.getters.getLoginStatus
    }).then((res) => {
      console.log("Update Successful");
    })

    axios.put('/api/addresses/edit', {
        type: "Billing",
        street1: this.bStreet1Message,
        street2: this.bStreet2Message,
        state: this.bCityMessage,
        city: this.bStateMessage,
        zip : this.bZIPMessage,
        userId: this.$store.getters.getLoginStatus
    }).then((res) => {
      console.log("Update Successful");
    })
  }

}


</script>

<style lang="scss">

.logoClass {
  padding: 5px;
  margin: 5px;
  width: 100%;
}

#profile {
  padding: 75px 0px;
  margin-left: 20px;

}

#accountHead {
  color: #FFD700;
  font-family: "Cambria", "Courier New", "Times New Roman", serif;
  font-style: italic;
  text-align: center;
  font-size: 20px;
}


#aFields {
  padding: 10px;
}


.form-control {
    width: 500px;
}

.saveButton
{
  background-color: #4CAF50; /* Green */
  border: none;
}

#AccountHeaderText {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}


</style>

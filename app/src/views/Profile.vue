<template>
  <div id="profile">
    <h3>Profile</h3>

    <form>

      <button @click="newEmail()" type="button" class="btn btn-primary danielButton" v-if="newE === false">Change email</button>
      <div id="eField" class="form-group" v-if="newE === true">
        <label for="exampleInputEmail1">Enter your new email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" v-model="EmailMessage">
        </div>
      <br>
      <br>
      <button @click="newPass()" type="button" class="btn btn-primary danielButton" v-if="newP === false">Change password</button>
      <div id="pField" class="form-group" v-if="newP === true">
        <label for="exampleInputPassword1">Enter your new password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="PasswordMessage">
      </div>
      <br>
      <br>
      <button @click="newAdd()" type="button" class="btn btn-primary" v-if="newA === false">Change address</button>
      <div id="aField" class="form-group" v-if="newA === true">
        <label for="exampleInputAddress1">Enter your new address</label>
        <input type="address" class="form-control" id="exampleInputAddress1" placeholder="Address" v-model="AddressMessage">
      </div>
      <br>
      <br>
      <button @click="saveChanges()" type="submit" class="btn btn-primary saveButton" v-if="changes === true">Save changes</button>

    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';


@Component({
  components: {
  },
  })


export default class Profile extends Vue {

  changes:boolean = false;

  newE:boolean = false;
  newP:boolean = false;
  newA:boolean = false;

  EmailMessage: string = '';
  PasswordMessage: string = '';
  AddressMessage: string = '';

  email: string = "leeroy.jenkins@placeholder.onion";
  location: string = "Very\nNice\nPlaceholder";

  newEmail(){
    this.changes = true;
    this.newE = true;
  }

  newPass(){
    this.changes = true;
    this.newP = true;
  }

  newAdd(){
    this.changes = true;
    this.newA = true;
  }

  saveChanges(){
    axios.put(`/api/users`, {
      if (newE == true){
        email: this.EmailMessage;
      }
      if (newP == true){
        password: this.PasswordMessage;
      }
      if (newA == true){
        address: this.AddressMessage;
      }
    }).then((res) => {
      this.userItem = res.data;
      if(res.status == 200){
        console.log("Update Successful");
        this.missing = [];
        this.$store.commit('login', res.data.user_id);
        this.$router.push('/')
      }
      else{
        console.log("Missing: " + res.data.missing); //an array
        this.missing = res.data.missing;
        console.log("Var: " + this.missing);
      }
      this.showMissing();
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

.saveButton
{
  background-color: #4CAF50; /* Green */
  border: none;
}

</style>

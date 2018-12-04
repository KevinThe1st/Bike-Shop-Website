<template>
  <div id="profile">
    <h3>Account</h3>

    <form>
      <div id="first" v-if="clicked === false">
        <h5>First Name:</h5>
        <h6>{{profile[0].firstName}}</h6>
      </div>
      <div id="last" v-if="clicked === false">
        <h5>Last Name:</h5>
        <h6>{{profile[0].lastName}}</h6>
      </div>
      <div id="uname" v-if="clicked === false">
        <h5>Username:</h5>
        <h6>{{profile[0].username}}</h6>
      </div>
      <div id="pass" v-if="clicked === false">
        <h5>Password:</h5>
        <h6>{{profile[0].password}}</h6>
      </div>

      <button id="Update" @click="update()" type="button" class="btn btn-primary" v-if="clicked === false">Update</button>
      <div id="fField" class="form-group" v-if="clicked === true">
        <label for="exampleInputFirstName1">Enter first name</label>
        <input type="name" class="form-control" id="exampleInputFirstName1" placeholder="First Name" v-model="FirstMessage">
      </div>
      <div id="lField" class="form-group" v-if="clicked === true">
        <label for="exampleInputLastName1">Enter last name</label>
        <input type="lastName" class="form-control" id="exampleInputLastName1" placeholder="Last Name" v-model="LastMessage">
      </div>
      <div id="uField" class="form-group" v-if="clicked === true">
        <label for="exampleInputUsername1">Enter your new username</label>
        <input type="username" class="form-control" id="exampleInputUsername1" placeholder="Username" v-model="UsernameMessage">
        </div>
      <div id="pField" class="form-group" v-if="clicked === true">
        <label for="exampleInputPassword1">Enter your new password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="PasswordMessage">
      </div>
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


export default class Account extends Vue {

  clicked:boolean = false;
  changes:boolean = false;


  FirstMessage: string = '';
  LastMessage: string = '';
  UsernameMessage: string = '';
  PasswordMessage: string = '';


  profile: any[] = [{
    firstName: "Hansel",
    lastName: "Thorpedo",
    username: "Placeholder",
    password: "password",
    address: "Placeholder Blvd"
  }];

  beforeMount(){
    axios
      .get('/api/users/' + this.$store.getters.getLoginStatus)
      .then((res) => {
        console.log(this.profile);
        this.profile = [res.data.user]
        console.log(this.profile);
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
      this.$store.commit('login', res.data.user_id);
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

<template>
  <div class="createcustomer">
    <h1>Create a New Customer Account</h1>
    <h3>Please enter a username and password:</h3>
    <input type = "text"  id = "createUserUsernameInput" placeholder = "Username" v-model="UsernameMessage">
    <input type = "submit" id = "createUserButton" v-on:click="updateDone"/>
    <br>
    <input type = "text"  id = "createUserPasswordInput" placeholder = "Password" v-model="PasswordMessage">
    <input type = "text"  id = "createUserFirstNameInput" placeholder = "First Name" v-model="FirstNameMessage">
    <input type = "text"  id = "createUserLastNameInput" placeholder = "Last Name" v-model="LastNameMessage">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { CreateUserItem } from '@/models';

@Component
export default class CreateCustomer extends Vue {
  user!: CreateUserItem;
  updateDone (event: any) {

    //console.log({{ UsernameMessage }});
    //if (this.user) {
      //let checked = event.target.checked;
      //axios.put(`/api/users/${this.user.id}`, {...this.user, username: {{ UsernameMessage }}, password: {{ PasswordMessage }}, type: "customer", lastName: {{ LastNameMessage }}, firstName: {{ FirstNameMessage }}}).then((res) => {
        //this.todo = res.data; //this is not accurate
      //})
    //}
  }
}
</script>

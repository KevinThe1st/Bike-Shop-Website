<template>
  <div class="CreateCustomer">

    <!-- This page will allow a user to register for the website by setting up an account -->
    <!-- Page has similar functionality to register page but is currently an intermediary -->

    <!-- Display fields to enter registration info -->
    <h1>Create a New Customer Account</h1>
    <h3>Please enter a username and password:</h3>
    <input class="input" type="text" placeholder="Username" v-model="UsernameMessage">
    <input type="submit" id="createUserButton" v-on:click="updateDone"/>
    <br>
    <input class="input" type="text" placeholder="Password" v-model="PasswordMessage">
    <input class="input" type="text" placeholder="First Name" v-model="FirstNameMessage">
    <input class="input" type="text" placeholder="Last Name" v-model="LastNameMessage">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { CreateUserItem } from '@/models';

@Component
export default class CreateCustomer extends Vue {
  user: CreateUserItem|null = null;
  UsernameMessage: string = '';
  PasswordMessage: string = '';
  FirstNameMessage: string = '';
  LastNameMessage: string = '';
  updateDone () {
    axios.put(`/api/register`, {
      username: this.UsernameMessage,
      password: this.PasswordMessage,
      lastName: this.LastNameMessage,
      firstName: this.FirstNameMessage
    }).then((res) => {
      //console.log(res)
      this.user = res.data; //this is not accurate
    })
  }
}
</script>

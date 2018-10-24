<template>
  <div class="register">
    <h1>Create a New Customer Account</h1>
    <h3>Please enter a username and password:</h3>
    <p>
      <input type = "text"  id = "createUserUsernameInput" placeholder = "Username" v-model="UsernameMessage">
    </p>
    <p>
      <input type = "text"  id = "createUserPasswordInput" placeholder = "Password" v-model="PasswordMessage">
    </p>
    <p>
      <input type = "text"  id = "createUserFirstNameInput" placeholder = "First Name" v-model="FirstNameMessage">
    </p>
    <p>
      <input type = "text"  id = "createUserLastNameInput" placeholder = "Last Name" v-model="LastNameMessage">
    </p>
    <input type = "submit" id = "createUserButton" v-on:click="register"/>
    <br>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { CreateUserItem } from '@/models';

@Component
export default class Register extends Vue {
  user: CreateUserItem|null = null;
  UsernameMessage: string = '',
  PasswordMessage: string = '',
  FirstNameMessage: string = '',
  LastNameMessage: string = ''
  register () {
    axios.put(`/api/register`, {
      username: this.UsernameMessage,
      password: this.PasswordMessage,
      lastName: this.LastNameMessage,
      firstName: this.FirstNameMessage
    }).then((res) => {
      this.user = res.data;
    })
  }
}
</script>

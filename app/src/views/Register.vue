<template>
  <div id="register">
    <h1>Create a New Customer Account</h1>
    <h3>Please enter a username and password:</h3>
    <p id="username">
      <input type="text"  id="username-box" placeholder="Username" v-model="UsernameMessage"
             v-bind:style="{border: borderColorUsername}">
      <section id="missing" v-bind:style="{display: errorDisplayUsername}">This is a required field</section>
    </p>
    <p>
      <input type = "password"  id = "createUserPasswordInput" placeholder = "Password" v-model="PasswordMessage"
             v-bind:style="{border: borderColorPassword}">
      <section id="missing" v-bind:style="{display: errorDisplayPassword}">This is a required field</section>
    </p>
    <p>
      <input type = "text"  id = "createUserFirstNameInput" placeholder = "First Name" v-model="FirstNameMessage"
             v-bind:style="{border: borderColorFirstName}">
      <section id="missing" v-bind:style="{display: errorDisplayFirstName}">This is a required field</section>
    </p>
    <p>
      <input type = "text"  id = "createUserLastNameInput" placeholder = "Last Name" v-model="LastNameMessage"
             v-bind:style="{border: borderColorLastName}">
      <section id="missing" v-bind:style="{display: errorDisplayLastName}">This is a required field</section>
    </p>
    <input type = "submit" id = "button" v-on:click="register"/>
    <br>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { CreateUserItem } from '@/models';
import App from '../App.vue';

@Component
export default class Register extends App {
  userItem: CreateUserItem|null = null;
  UsernameMessage: string = '';
  PasswordMessage: string = '';
  FirstNameMessage: string = '';
  LastNameMessage: string = '';
  missing: string[] = [];

  errorColor: string = '1px solid red';
  normalColor: string = '0.5px solid #888888';

  borderColorUsername = this.normalColor;
  borderColorPassword = this.normalColor;
  borderColorFirstName = this.normalColor;
  borderColorLastName = this.normalColor;

  errorDisplayUsername: string = 'none';
  errorDisplayPassword: string = 'none';
  errorDisplayFirstName: string = 'none';
  errorDisplayLastName: string = 'none';

  register () {
    axios.put(`/api/register`, {
      username: this.UsernameMessage,
      password: this.PasswordMessage,
      lastName: this.LastNameMessage,
      firstName: this.FirstNameMessage
    }).then((res) => {
      this.userItem = res.data;
      if(res.status == 200){
        console.log("Registration Successful");
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

  showMissing () {
    if(this.missing.includes("username")){
      this.borderColorUsername = this.errorColor;
      this.errorDisplayUsername = 'block';
    }
    else{
      this.borderColorUsername = this.normalColor;
      this.errorDisplayUsername = 'none';
    }

    if(this.missing.includes("password")){
      this.borderColorPassword = this.errorColor;
      this.errorDisplayPassword = 'block';
    }
    else{
      this.borderColorPassword = this.normalColor;
      this.errorDisplayPassword = 'none';
    }

    if(this.missing.includes("firstName")){
      this.borderColorFirstName = this.errorColor;
      this.errorDisplayFirstName = 'block';
    }
    else{
      this.borderColorFirstName = this.normalColor;
      this.errorDisplayFirstName = 'none';
    }

    if(this.missing.includes("lastName")){
      this.borderColorLastName = this.errorColor;
      this.errorDisplayLastName = 'block';
    }
    else{
      this.borderColorLastName = this.normalColor;
      this.errorDisplayLastName = 'none';
    }
  }
}
</script>

<style lang="scss">
#register {
  padding: 50px 0px;
  text-align: center;

  #button {
      background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      padding: 10px 10px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
  }
}

#missing {
  color: red;
  font-size: 12px;
}

</style>

<template>
  <div class = "login">
    <div>
      <h1>Welcome to Foxcycle Cyclery</h1>
      <h3>Thank you for shopping with us</h3>
      <h3>Please login or register to continue</h3>
      <input type = "text"  id = "loginUsernameInput" placeholder = "Username">
      <input type = "submit" id = "loginUsernameButton">
      <br>
      <input type = "text"  id = "loginPasswordInput" placeholder = "Password">
    </div>
    <div>
      <h3>Register: </h3>
      <br>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';


@Component
export default class Login extends Vue {}
</script>

<template>
  <div class="createcustomer">
    <h1>Create a New Customer Account</h1>
    <h3>Please enter a username and password:</h3>
    <input type = "text"  id = "createUserUsernameInput" placeholder = "Username">
    <input type = "submit" id = "createUserButton" v-on:click="updateDone"/>
    <br>
    <input type = "text"  id = "createUserPasswordInput" placeholder = "Password">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';


@Component
export default class CreateCustomer extends Vue {}
</script>

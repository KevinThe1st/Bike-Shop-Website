<template>
  <div class = "login">
    <div>
      <h1>Welcome to Foxcycle Cyclery</h1>
      <h3>Thank you for shopping with us</h3>
      <h3>Please login or register to continue</h3>
      <input type = "text"  id = "loginUsernameInput" placeholder = "Username" v-model="username">
      <input type = "submit" id = "loginUsernameButton" v-on:click="doLogin">
      <br>
      <input type = "text"  id = "loginPasswordInput" placeholder = "Password" v-model="password">
    </div>
    <div>
      <h3>Don't have an account?</h3>
      <br>
      <div id = "app">
        <div id="nav">
          <router-link to="/createCustomer">Register</router-link>
        </div>
        <router-view/>
      </div>


    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Login extends Vue {
  username: string = '';
  password: string = '';
  doLogin() {
    axios.put(`/api/users/login`, {
      username: this.username,
      password: this.password
    }).then((res) => {
      console.log(res);
    })
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <!--
        <img src="./assets/logo.png" alt="logo" id="logo">
      -->
      <router-link to="/">Home</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link to="/services">Services</router-link>
      <router-link to="/about">About</router-link>
      <button id="login" v-on:click="showModal" is-active=false v-if="!this.$store.getters.getLoginStatus">Login</button>
      <UserDropdown id="dropdown" v-if="this.$store.getters.getLoginStatus"/>
    </div>
    <LoginPopup
      v-show="isPopupVisible"
      @close="closeModal"
    />
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import Component from 'vue-class-component'
import LoginPopup from '@/components/LoginPopup.vue';
import UserDropdown from '@/components/UserDropdown.vue';

@Component({
  components: {
    LoginPopup,
    UserDropdown,
  },
})
export default class App extends Vue {
  isPopupVisible: boolean = false;

  showModal() {
    this.isPopupVisible = true;
    console.log(this.$store.getters.isLoggedIn);
  }
  closeModal() {
    this.isPopupVisible = false;
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  list-style-type: none;
  background-color: #f1f1f1;
  display: inline;
  background-color: #333;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 5;

  a {
    display: inline-block;
    padding: 8px 16px;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    padding: 14px 16px;
    color: white;
  }

  a:hover {
    background-color: #555;
    color: white;
  }

  a.router-link-exact-active {
    background-color: #4CAF50;
    color: white;
  }
}

#login {
  margin-left: 60%;
  background-color: #AA7777;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}

#dropdown {
  float: right;
  top: 0px;

  a.router-link-exact-active {
    background-color: #4444FF;
    color: white;
  }
}
</style>

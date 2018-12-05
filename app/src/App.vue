<template>
  <div id="app">

    <b-navbar toggleable="md" type="dark" variant="secondary" fixed = "top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">Foxycle</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/shop">Shop</b-nav-item>
          <b-nav-item to="/services">Services</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto"Ht>

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>



            <router-link :to="{name: 'shop'}">
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </router-link>
          </b-nav-form>

          <b-nav-item-dropdown text="Profile" v-if="this.$store.getters.getLoginStatus" right>
            <b-dropdown-item href="/account">Account</b-dropdown-item>
            <b-dropdown-item to="/cart">Cart</b-dropdown-item>
            <b-dropdown-item href="/orders">My Orders</b-dropdown-item>
            <b-dropdown-item to="/adminItemManagement" v-if="this.$store.getters.getLoginPermissionLevel == 'Admin' || this.$store.getters.getLoginPermissionLevel == 'Employee'">Admin Item Management</b-dropdown-item>
            <b-dropdown-item to="/adminAccountManagement" v-if="this.$store.getters.getLoginPermissionLevel == 'Admin'">Admin Account Management</b-dropdown-item>
            <b-dropdown-item to="/adminOrderManagement" v-if="this.$store.getters.getLoginPermissionLevel == 'Admin' || this.$store.getters.getLoginPermissionLevel == 'Employee'">Admin Order Management</b-dropdown-item>
            <b-dropdown-item to="/adminPageManagement" v-if="this.$store.getters.getLoginPermissionLevel == 'Admin'">Admin Page Management</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click="$store.commit('logout')">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-on:click = "showModal" is-active=false v-if="!this.$store.getters.getLoginStatus">Login</b-nav-item>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <!-- navbar-1.vue -->

<!--
    <div id="nav"> -->
      <!--
        <img src="./assets/logo.png" alt="logo" id="logo">
      -->
<!--      <router-link to="/">Home</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link to="/services">Services</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/account">Account</router-link>
      <div id="login">
        <a v-on:click="showModal" is-active=false v-if="!this.$store.getters.getLoginStatus">Login</a>
      </div>
    </div> -->
    <LoginPopup
      v-bind:visible="isPopupVisible"
      v-on:close="closeModal"
    />
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import Component from 'vue-class-component';
import LoginPopup from '@/components/LoginPopup.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


@Component({
  components: {
    LoginPopup,

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


#logo {
  padding: 0px 20px;
  width: 20px;
  height: 20px;
}

/*
#nav {
  list-style-type: none;
  background-color: #f1f1f1;
  display: inline;
  background-color: #333;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 10;
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
} */

#login {
  position: absolute;
  left: 90%;
  top: 0px;
  background-color: #f1f1f1;
  a {
    background-color: #002288;
  }
  a.router-link-exact-active {
    background-color: #002288;
    color: white;
  }
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

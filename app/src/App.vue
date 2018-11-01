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
      <div id="login">
        <router-link to="" v-on:click.native="showModal" is-active=false>Login</router-link>
      </div>
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
import Component from 'vue-class-component'
import LoginPopup from '@/components/LoginPopup.vue';

@Component({
  components: {
    LoginPopup
  },
  props:{
    loggedIn: Boolean = false
  }
})
export default class App extends Vue {
  isPopupVisible: boolean = false;

  showModal() {
    this.isPopupVisible = true;
    console.log(this.loggedIn);
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

#nav {
  list-style-type: none;
  background-color: #f1f1f1;
  display: inline;
  background-color: #333;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;

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
</style>

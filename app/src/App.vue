<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="" v-on:click.native="showModal">Login</router-link>
      <LoginPopup
        v-show="isPopupVisible"
        @close="closeModal"
      />
    </div>
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
})
export default class App extends Vue {
  isPopupVisible: boolean = false

  showModal() {
    this.isPopupVisible = true;
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
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

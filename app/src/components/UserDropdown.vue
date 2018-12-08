<template>

  <!-- Dropdown menu for users that links to other pages -->
  <div class="dropdown">
    <router-link to="" class="dropdown-source">Account
      <i class="fa fa-caret-down"></i>
    </router-link>
    <div class="dropdown-content">
      <router-link to="/">Account Info</router-link>
      <router-link to="/">Cart</router-link>
      <button v-on:click="$store.commit('logout')">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UserDropdown extends Vue {

}
</script>
<style lang="scss">

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #777777;
  width: inherit;
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {

  width: 100%;
  display: block;
  color: black;
  text-decoration: none;
  text-align: center;
}

/* Add a grey background color to dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown-context a.router-link-exact-active {
  background-color: #333;
  color: white;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>

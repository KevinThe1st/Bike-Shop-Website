<template>
  <div class="logininput">
    <input type = "text"  id = "loginUsernameInput" placeholder = "Username">
    <input type = "submit" id = "loginUsernameButton">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class logininput extends Vue {}
</script>

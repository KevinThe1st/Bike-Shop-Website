<template>
  <div id="home">
    <h1>This is the home page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss">
#home {
  padding: 50px 0px;
  text-align: center;
}
</style>

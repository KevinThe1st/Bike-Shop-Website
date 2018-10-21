<template>
  <div class="foxcyclehome">
    <img alt="Vue logo" src="../assets/FoxcycleLogoKevin.png" width = 400>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import logininput from '@/components/LoginInput.vue';

@Component({
  components: {
  HelloWorld,
  /*logininput,*/
  },
  })
export default class FoxcycleHome extends Vue {}
</script>

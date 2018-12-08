<template>

  <!-- Code used by carousel to store images and cycle -->
  <div>
    <vue-flux
   :options="fluxOptions"
   :images="fluxImages"
   :transitions="fluxTransitions"
   ref="slider">
    </vue-flux>

    <button @click="$refs.slider.showImage('next')">NEXT</button>
  </div>
</template>

<script lang="ts">
import { VueFlux, FluxPagination, Transitions } from 'vue-flux';

export default {
   components: {
      VueFlux,
      FluxPagination
   },

   data: () => ({
      fluxOptions: {
         autoplay: true
      },
      fluxImages: [
         '../assets/FoxcycleLogoKevin.png',
         '../assets/FoxcycleLogoKevin.png',
         '../assets/FoxcycleLogoKevin.png'
      ],
      fluxTransitions: {
         transitionBook: Transitions.transitionBook
      }
   })
}

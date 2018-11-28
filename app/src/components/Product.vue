<template>
    <head>
        <body>

        <item v-bind="item"></item>

        <div class = "item">

            <h1>bike</h1>
            <h4>price</h4>
            <div>desc</div>

        </div>

        </body>
    </head>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Product extends Vue {
  props: {
    id: Number,
    price: Number,
    stock: Number,
    desc-short: String,
    desc-long: String
  }
}

</script>

<style lang="scss">

    .item {
        width: 350px;
        height:350px;
        color: black;
    }

    .item:hover {
        color: #f79927;
        background-color: grey;
        border: solid 2px black;
    }

</style>


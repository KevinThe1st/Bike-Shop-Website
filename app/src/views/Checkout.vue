<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Checkout extends Vue {
  items: any[] = [{
    name: "Placeholder",
    price: "Number",
    quantity: "Number",
  }];
}
</script>

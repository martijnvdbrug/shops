<template>
  <div>
    <a
      v-if="!soldOut"
      class="button"
      data-toggle="addedToCartModal"
      v-on:click="buy()"
      style="width: 100%; margin-top: 10px"
    >
      IN WINKELMAND</a
    >
    <a
      v-if="soldOut"
      disabled="true"
      class="button"
      style="width: 100%; margin-top: 10px"
      >SOLD OUT</a
    >

    <div class="reveal text-center" id="addedToCartModal" data-reveal>
      <i class="fi-check" style="font-size: 2rem"></i>
      <a
        class="hollow button"
        data-close
        aria-label="Close modal"
        type="button"
        style="width: 100%; margin-top: 30px"
      >
        Verder winkelen
      </a>
      <g-link
        class="button"
        to="/cart/"
        data-close
        aria-label="Close modal"
        type="button"
        style="width: 100%"
      >
        <i class="fi-shopping-cart"></i>
        Bestellen
      </g-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['variant'],
  data() {
    return {
      soldOut: false,
    };
  },
  watch: {
    variant(newVal, oldVal) {
      // watch it
      this.isSoldOut(newVal);
    },
  },
  methods: {
    buy() {
      if (this.soldOut) {
        return;
      }
      // this.$store.activeOrder = {dingen: 'dinges'}
      this.$vendure.addProductToCart(this.variant.id, 1);
    },
    isSoldOut(variant) {
      this.soldOut = variant?.stockLevel === 'OUT_OF_STOCK';
    },
  },
  async mounted() {
    this.isSoldOut(this.variant);
    if (process.env.isClient) {
      // THis is for refresh on this page
      window.onload = function () {
        $(document).foundation();
      };
    }
    $(document).foundation(); // this is for when you land here from other page
  },
};
</script>

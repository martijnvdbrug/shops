<template>
  <div>
    <p>Je wordt doorgestuurd naar het betaal platform...</p>
    <ClientOnly>
      <p v-if="error" v-html="error"></p>
    </ClientOnly>
  </div>
</template>
<script>
export default {
  mixins: [require('./empty-basket-validator')],
  data() {
    return {
      error: undefined,
    };
  },
  async mounted() {
    try {
      const states = await this.$vendure.getNextOrderStates();
      if (states?.indexOf('ArrangingPayment') > -1) {
        await this.$vendure.transitionOrderToState('ArrangingPayment');
      }
      const order = await this.$vendure.addPaymentToOrder({
        method: `mollie-payment-${process.env.GRIDSOME_VENDURE_TOKEN}`,
        metadata: {},
      });
      const latestPayment = order?.payments?.[order?.payments.length - 1];
      if (latestPayment?.metadata?.public?.redirectLink) {
        window.location.href = latestPayment.metadata.public.redirectLink;
      } else {
        throw new Error(
          `No redirect link found in order response for order ${order?.code}`
        );
      }
    } catch (e) {
      this.error = e.message;
      throw e;
    }
  },
};
</script>

<template>
  <Layout>
    <template #content>
      <ProductFilter
        :collections="$context.collections"
        no-collection-url="/shop/"
        :selected-collection="$context.selectedCollection"
      />

      <br />
      <div
        v-if="$context.selectedCollection"
        v-html="$context.selectedCollection.description"
      ></div>
      <br />

      <div class="columns is-multiline is-mobile">
        <div
          class="column is-half-mobile is-one-quarter-tablet mb-4"
          v-for="product of $context.products"
          :key="product.slug"
        >
          <ProductCard
            :product="product"
            buy-label="Add to cart"
            product-url-prefix="/shop/product/"
          />
        </div>
      </div>
    </template>
  </Layout>
</template>
<script>
import ProductFilter from 'pinelab-storefront-client/lib/buefy-components/ProductFilter';
import ProductCard from 'pinelab-storefront-client/lib/buefy-components/ProductCard';
import { hydrate } from 'pinelab-storefront-client';

export default {
  components: {
    ProductFilter,
    ProductCard,
  },
  async mounted() {
    await hydrate(this.$context.featuredProducts, this.$vendure);
  },
};
</script>

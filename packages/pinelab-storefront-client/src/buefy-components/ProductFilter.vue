<template>
  <div>
    <template v-for="collection of collections">
      <g-link
        v-if="isSelected(collection)"
        :to="noCollectionUrl"
        :key="collection.id"
        class="button is-primary mr-2"
      >
        <span> {{ collection.name }} </span
        ><span class="icon is-small"><i class="mdi mdi-close-thick"></i></span>
      </g-link>
      <g-link
        v-else
        :to="`/${collectionPrefix}/${collection.slug}/`"
        :key="collection.id"
        class="button is-outlined mr-2"
      >
        {{ collection.name }}
      </g-link>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    collections: {
      required: true,
      type: Array,
    },
    collectionPrefix: { default: 'product-category' },
    selectedCollection: { type: Object },
    noCollectionUrl: {
      required: true,
    },
  },
  methods: {
    isSelected(collection) {
      return collection.id === this.selectedCollection?.id;
    },
  },
};
</script>

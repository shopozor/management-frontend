<template>
  <q-card>
    <q-card-main>
      <q-field>
        <q-input float-label="Nom du produit" v-model="title"></q-input>
      </q-field>
      <br >
      <q-field>
        <q-input float-label="Description du produit" v-model="description" type="textarea" :max-height="190"></q-input>
      </q-field>
    </q-card-main>
  </q-card>
</template>

<script>export default {
  name: 'ProductEditName',
  computed: {
    title: {
      get: function () { return this.$store.state.products.editedProduct.title },
      set: function (newVal) { this.$store.state.products.editedProduct.title = newVal }
    },
    description: {
      get: function () { return this.$store.state.products.editedProduct.description },
      set: function (newVal) { this.$store.state.products.editedProduct.description = newVal }
    },
    productId () { return this.$store.state.products.editedProduct.productId },
    state () { return this.$store.state.products.editedProduct.state },
    ordersSummary () { return this.$store.state.products.editedProduct.ordersSummary }
  }
}
</script>

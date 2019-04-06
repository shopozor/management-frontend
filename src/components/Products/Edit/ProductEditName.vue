<template>
  <q-card class="width-md height-md">
    <q-card-section>
      <q-field>
        <q-input
          :float-label="$t('products.title')"
          :placeholder="productTitle"
          :value="productTitle"
          @input="updateEditedProduct({ newProps: {title: $event} })"
        ></q-input>
      </q-field>
      <br >
      <q-field>
        <q-input
        :float-label="$t('products.productDescription')"
        :placeholder="productDescription"
        type="textarea"
        :max-height="190"
        rows="8"
        :value="productDescription"
        @input="updateEditedProduct({ newProps: {description: $event} })"
      ></q-input>
      </q-field>
    </q-card-section>
  </q-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'ProductEditName',
  computed: {
    ...mapGetters(['editedProduct', 'myProducts']),
    productId () {
      return this.editedProduct.productId
    },
    productTitle () {
      return this.editedProduct.title
    },
    productDescription () {
      return this.editedProduct.description
    }
  },
  methods: {
    ...mapActions(['updateEditedProduct'])
  }
}

// TODO : si aucune valeur, afficher la valeur actuelle du produit (placeholder)
// TODO : pouvoir indiquer si la modification est majeure ou mineure (si oui -> notifications)

</script>

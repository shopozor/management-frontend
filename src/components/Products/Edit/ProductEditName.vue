<template>
  <q-card class="width-md height-md">
    <q-card-main>
      <q-field>
        <q-input
          :float-label="$t('products.title')"
          :placeholder="productTitle"
          :value="editedProduct.title"
          @input="updateEditedProduct({title: $event})"
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
        :value="editedProduct.description"
        @input="updateEditedProduct({description: $event})"
      ></q-input>
      </q-field>
    </q-card-main>
  </q-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'ProductEditName',
  computed: {
    ...mapGetters(['editedProduct', 'myProducts']),
    productId () {
      return this.editedProduct.productId
    },
    productTitle () {
      return this.myProducts[this.productId].title
    },
    productDescription () {
      return this.myProducts[this.productId].description
    }
  },
  methods: {
    ...mapMutations(['updateEditedProduct'])
  }
}

// TODO : si aucune valeur, afficher la valeur actuelle du produit (placeholder)
// TODO : pouvoir indiquer si la modification est majeure ou mineure (si oui -> notifications)

</script>

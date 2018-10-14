<template>
  <div class="row justify-center">
    <product-edit-picture class="product-edit-card q-ma-sm" />
    <product-edit-name class="product-edit-card q-ma-sm" />
    <product-edit-type class="product-edit-card q-ma-sm" />
    <product-edit-formats class="q-ma-sm q-mb-xl" />
    <q-page-sticky position="bottom-right">
      <q-btn class="q-ma-md" size="md" icon="cancel" label="Annuler" color="negative" @click="cancel" />
      <q-btn class="q-ma-md" size="md" icon="save" label="Enregistrer" color="positive" @click="save" />
    </q-page-sticky>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ProductEditPicture from './ProductEditPicture'
import ProductEditName from './ProductEditName'
import ProductEditType from './ProductEditType'
import ProductEditFormats from './ProductEditFormats'

export default {
  name: 'ProductsEditView',
  props: {
    jumpTo: {
      type: Function,
      required: true
    }
  },
  components: {
    ProductEditPicture,
    ProductEditName,
    ProductEditType,
    ProductEditFormats
  },
  methods: {
    ...mapActions(['updateProduct', 'updateFormatsOfProduct']),
    save () {
      const vm = this
      const {
        productId,
        title,
        description,
        aisle,
        conservationMethod,
        conservationDays,
        image,
        defaultFormatMode,
        defaultCustomerPrice,
        defaultUnit
      } = this.$store.state.products.editedProduct
      this.updateProduct({
        productId,
        newProps: {
          title,
          description,
          aisle,
          conservationMethod,
          conservationDays,
          image,
          defaultFormatMode,
          defaultCustomerPrice,
          defaultUnit
        }
      })
        .then(() => vm.jumpTo('inventory'))
    },
    cancel () { this.jumpTo('inventory') }
  }
}
</script>

<style lang="stylus">

.product-edit-card {
  width: 240px;
  height: 320px;
}
</style>

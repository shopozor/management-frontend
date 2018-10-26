<template>
  <div class="row justify-center">
    <product-edit-picture class="product-edit-card q-ma-sm" />
    <product-edit-name class="product-edit-card q-ma-sm" />
    <product-edit-type class="product-edit-card q-ma-sm" />
    <product-edit-formats class="q-ma-sm q-mb-xl" />
    <q-page-sticky position="bottom-right">
      <q-btn class="q-ma-md" size="md" icon="cancel" :label="$t('actions.cancel')" color="negative" @click="cancel" />
      <q-btn class="q-ma-md" size="md" icon="save" :label="$t('actions.save')" color="positive" @click="save" />
    </q-page-sticky>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
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
  computed: {
    ...mapGetters(['editedProduct', 'editedFormats'])
  },
  methods: {
    ...mapActions(['updateProduct', 'updateFormatsOfProduct']),
    save () {
      this.updateProduct({
        productId: this.editedProduct.productId,
        newProps: this.editedProduct
      })
      this.updateFormatsOfProduct({
        productId: this.editedProduct.productId,
        formats: this.editedFormats
      })
        .then(() => this.jumpTo('inventory'))
    },
    cancel () { this.jumpTo('inventory') }
  }
}
</script>

<style lang="stylus">

.product-edit-card {
  width: 260px;
  height: 320px;
}
</style>

<template>
  <div class="row justify-center">
    <product-edit-picture class="q-ma-sm" />
    <product-edit-name class="q-ma-sm" />
    <product-edit-type class="q-ma-sm" />
    <product-edit-formats class="q-ma-sm q-my-md" />
    <q-page-sticky position="bottom-right">
      <q-btn class="q-ma-md" size="md" icon="cancel" :label="$t('actions.cancel')" color="negative" @click="cancel" />
      <q-btn class="q-ma-md" size="md" icon="save" :label="$t('actions.save')" color="positive" @click="save" />
    </q-page-sticky>
    <q-page-sticky position="bottom-left">
      <product-toggle-non-trivial-changes class="q-ma-md" />
    </q-page-sticky>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ProductEditPicture from './ProductEditPicture'
import ProductEditName from './ProductEditName'
import ProductEditType from './ProductEditType'
import ProductEditFormats from './ProductEditFormats'
import ProductToggleNonTrivialChanges from './ProductToggleNonTrivialChanges'

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
    ProductEditFormats,
    ProductToggleNonTrivialChanges
  },
  computed: {
    ...mapGetters(['editedProduct', 'editedFormats'])
  },
  methods: {
    ...mapActions(['updateProduct', 'updateFormatsOfProduct', 'clearEdition']),
    back () {
      this.jumpTo('inventory')
      this.clearEdition()
    },
    save () {
      this.updateProduct({
        productId: this.editedProduct.productId,
        newProps: this.editedProduct
      })
      this.updateFormatsOfProduct({
        productId: this.editedProduct.productId,
        formats: this.editedFormats
      })
        .then(() => this.back())
    },
    cancel () { this.back() }
  }
}
</script>

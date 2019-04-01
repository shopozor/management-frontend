<template>
  <transition leave-active-class="animated bounceOutDown">
    <q-card
      class="width-md height-lg q-ma-sm"
      :class="{visibleState: isVisible, invisibleState: !isVisible}"
      v-if="!isDeleted"
    >
      <q-card-actions class="row justify-between">
        <!-- <product-visibility-manager :productId="productId" /> -->
        <q-btn
          class="q-ma-sm"
          icon="create"
          :label="$t('products.edit')"
          size="md"
          color="primary"
          @click="edit"
        />
        <product-delete-manager :productId="productId"/>
      </q-card-actions>
      <q-card-title>
        {{ product.title }}
        <span slot="subtitle">{{ summary }}</span>
      </q-card-title>
      <q-card-media>
        <img :src="showImage" alt="product image">
      </q-card-media>
    </q-card>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductDeleteManager from '../ProductDeleteManager'
// import ProductVisibilityManager from '../ProductVisibilityManager'
import ShowImageMixin from '../../../assets/images/ShowImageMixin'
import types from '../../../../common/src/types'

export default {
  name: 'ProductInventoryCard',
  props: {
    productId: {
      type: String,
      required: true
    },
    jumpTo: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters(['pendingOrdersOfProductSummary', 'myProducts']),
    product () {
      return this.myProducts[this.productId]
    },
    image () {
      return this.product.image
    },
    summary () {
      const paid = this.pendingOrdersOfProductSummary({
        productId: this.productId
      }).paid
      return this.$tc('products.ordersSummary', paid.amount, {
        amount: paid.amount,
        price: (paid.customerPrice / 100).toFixed(2)
      })
    },
    isVisible () {
      return this.product.state === types.productState.VISIBLE
    },
    isDeleted () {
      return this.product.state === types.productState.DELETED
    }
  },
  methods: {
    ...mapActions([
      'updateProduct',
      'getFormatsOfProduct',
      'setEditedProduct',
      'setEditedFormats'
    ]),
    edit () {
      this.setEditedProduct({ productId: this.productId })
      this.setEditedFormats({ productId: this.productId })
      this.jumpTo('edit')
    }
  },
  components: {
    ProductDeleteManager
    // ProductVisibilityManager
  },
  mixins: [ShowImageMixin],
  created () {
    this.getFormatsOfProduct({ productId: this.productId })
  }
}
</script>

<style lang='stylus'>
.invisibleState {
  opacity: 0.5
  transition: opacity 0.5s
}

.visibleState {
  opacity: 1
  transition: opacity 0.5s
}
</style>

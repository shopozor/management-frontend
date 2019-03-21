<template>
  <transition leave-active-class="animated bounceOutDown">
    <q-card
      class="product-inventory-card q-ma-sm"
      :class="{visibleState: isVisible, invisibleState: !isVisible}"
      v-if="!isDeleted">
      <q-card-actions class="row justify-between">
        <product-visibility-manager :productId="productId" />
        <q-btn
          class="q-ma-sm"
          icon="create"
          :label="$t('products.edit')"
          size="md"
          color="primary"
          @click="edit" />
        <product-delete-manager :productId="productId" />
      </q-card-actions>
      <q-card-title>
        {{ title }}
        <span slot="subtitle">{{ summary }}</span>
      </q-card-title>
      <q-card-media>
        <img :src="image" alt="product image"/>
      </q-card-media>
    </q-card>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import ProductDeleteManager from '../ProductDeleteManager'
import ProductVisibilityManager from '../ProductVisibilityManager'
import types from '../../../../common/src/types'

export default {
  name: 'ProductInventoryCard',
  props: {
    productId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: 'Un produit de votre budzonnerie'
    },
    image: {
      type: String,
      default: function () {
        return 'assets/no_image.png'
      }
    },
    conservationDaysAfterSale: {
      type: Number
    },
    conservationMethod: {
      type: String
    },
    categories: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    defaultFormatUI: {
      type: String
    },
    defaultCustomerPrice: {
      type: Number
    },
    defaultUnit: {
      type: String
    },
    formatsIds: {
      type: Array,
      required: true
    },
    ordersSummary: {
      type: Object,
      required: true
    },
    jumpTo: {
      type: Function,
      required: true
    }
  },
  computed: {
    summary () {
      return this.$tc(
        'products.ordersSummary',
        this.ordersSummary.amount,
        {
          amount: this.ordersSummary.amount,
          price: this.ordersSummary.customerPrice
        }
      )
    },
    isVisible () {
      return this.state === types.productState.VISIBLE
    },
    isDeleted () {
      return this.state === types.productState.DELETED
    }
  },
  methods: {
    ...mapActions(['updateProduct', 'getFormatsOfProduct', 'setEditedProduct', 'setEditedFormats']),
    edit () {
      this.setEditedProduct({productId: this.productId})
      this.setEditedFormats({productId: this.productId})
      this.jumpTo('edit')
    }
  },
  components: {
    ProductDeleteManager,
    ProductVisibilityManager
  },
  created () {
    this.getFormatsOfProduct({productId: this.productId})
  }
}
</script>

<style lang="stylus">

.product-inventory-card {
  width: 260px;
  height: 420px;
}

.invisibleState {
  opacity: 0.5;
  transition: opacity 0.5s;
}

.visibleState {
  opacity: 1;
  transition: opacity 0.5s;
}
</style>

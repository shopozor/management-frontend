<template>
  <transition leave-active-class="animated bounceOutDown">
    <q-card
      class="szr-product-card q-ma-sm"
      :class="{visibleState: isVisible, invisibleState: !isVisible}"
      v-if="!isDeleted">
      <product-card-state-manager
        :productId="productId"
        :state="state"
        :ordersSummary="ordersSummary" />
      <q-card-media>
        <img :src="image" alt="product image"/>
      </q-card-media>
      <q-card-title>
        {{ title }}
      </q-card-title>
      <q-card-main>
        <div>{{ description }}</div>
        <br>
        <div>{{ summary }}</div>
      </q-card-main>
      <q-card-actions align="center">
        <q-btn icon="create" label="Editer" size="md" color="primary" />
      </q-card-actions>
    </q-card>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import productCardStateManager from './ProductCardStateManager'
import types from '../../types'

export default {
  name: 'ProductCard',
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
    aisle: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    defaultFormatMode: {
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
    }
  },
  computed: {
    ...mapGetters(['myOrdersToDeliver']),
    summary () {
      if (this.ordersSummary.amount === 0) return 'Aucune commande en cours.'
      else if (this.ordersSummary.amount === 1) return `Une commande de ${this.ordersSummary.customerPrice} francs en cours.`
      else return `${this.ordersSummary.amount} commandes en cours pour un total de ${this.ordersSummary.customerPrice} francs.`
    },
    isVisible () {
      return this.state === types.productState.VISIBLE
    },
    isDeleted () {
      return this.state === types.productState.DELETED
    }
  },
  methods: {
    ...mapActions(['updateProduct', 'getFormatsOfProduct'])
  },
  components: {
    productCardStateManager
  },
  created () {
    this.getFormatsOfProduct({productId: this.productId})
  }
}
</script>

<style lang="stylus">
@import '~variables';

.szr-product-card {
  width: 30%;
  min-width: 240px;
  max-width: 500px;
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

<template>
  <transition leave-active-class="animated bounceOutUp">
    <q-card
      class="product-trash-card q-ma-sm"
      v-if="isDeleted">
      <q-card-media>
        <img :src="image" alt="product image"/>
      </q-card-media>
      <q-card-title>
        {{ title }}
      </q-card-title>
      <q-card-main>
        <div>{{ description }}</div>
      </q-card-main>
      <q-card-actions align="center">
        <q-btn icon="restore_from_trash" round color="positive" size="xl" @click="restore" />
      </q-card-actions>
    </q-card>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import types from '../../../../common/src/types'

export default {
  name: 'ProductTrashCard',
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
      default: 'Pas de description.'
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
    }
  },
  computed: {
    isDeleted () {
      return this.state === types.productState.DELETED
    }
  },
  methods: {
    ...mapActions(['updateProduct']),
    restore () {
      this.updateProduct({productId: this.productId, newProps: {state: types.productState.INVISIBLE}})
    }
  }
}
</script>

<style lang="stylus">

.product-trash-card {
  width: 30%;
  min-width: 240px;
  max-width: 500px;
}
</style>

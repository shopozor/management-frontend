<template>
  <transition leave-active-class="animated bounceOutUp">
    <q-card class="product-trash-card q-ma-sm" v-if="isDeleted">
      <q-card-media>
        <img :src="showImage" alt="product image">
      </q-card-media>
      <q-card-title>{{ product.title }}</q-card-title>
      <q-card-main>
        <div>{{ product.description }}</div>
      </q-card-main>
      <q-card-actions align="center">
        <q-btn icon="restore_from_trash" round color="positive" size='xl' @click='restore'/>
      </q-card-actions>
    </q-card>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import types from '../../../../common/src/types'
import ShowImageMixin from '../../../assets/images/ShowImageMixin'

export default {
  name: 'ProductTrashCard',
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['myProducts']),
    product () {
      return this.myProducts[this.productId]
    },
    image () {
      return this.product.image
    },
    isDeleted () {
      return this.product.state === types.productState.DELETED
    }
  },
  methods: {
    ...mapActions(['updateProduct']),
    restore () {
      this.updateProduct({
        productId: this.productId,
        newProps: { state: types.productState.INVISIBLE }
      })
    }
  },
  mixins: [ShowImageMixin]
}
</script>

<style lang='stylus'>
.product-trash-card {
  width: 30%
  min-width: 240px
  max-width: 500px
}
</style>

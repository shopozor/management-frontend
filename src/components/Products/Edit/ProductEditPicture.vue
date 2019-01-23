<template>
  <q-card class="width-md height-md">
    <q-card-media>
      <img class="q-px-md q-pb-sm" :src="editedProduct.image" alt="product image">
    </q-card-media>
    <q-card-actions align="around">
      <q-btn round size="lg" icon="camera_alt" color="primary" />
      <q-btn round size="lg" icon="image" color="primary" />
      <q-btn round size="lg" icon="image_search" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {mapGetters} from 'vuex'
import { NO_IMAGE } from 'assets/images'

export default {
  name: 'ProductEditPicture',
  computed: {
    ...mapGetters(['editedProduct']),
    image () {
      if (this.product.image && this.product.image.length > 0) return this.product.image
      else return NO_IMAGE
    }
  }
}
</script>

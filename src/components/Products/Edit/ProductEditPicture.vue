<template>
  <q-card class="width-md height-md">
    <img class="q-px-md q-pb-sm" :src="showImage" alt="product image">
    <q-card-actions align="around">
      <q-btn round size="lg" icon="camera_alt" color="primary" />
      <q-btn round size="lg" icon="image" color="primary" />
      <q-btn round size="lg" icon="image_search" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {mapGetters} from 'vuex'
import ShowImageMixin from 'assets/images/ShowImageMixin'

export default {
  name: 'ProductEditPicture',
  computed: {
    ...mapGetters(['editedProduct']),
    image () {
      return this.editedProduct.image
    }
  },
  mixins: [ShowImageMixin]
}
</script>

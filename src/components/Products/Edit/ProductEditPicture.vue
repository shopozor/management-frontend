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

export default {
  name: 'ProductEditPicture',
  computed: {
    ...mapGetters(['editedProduct'])
  }
}
</script>

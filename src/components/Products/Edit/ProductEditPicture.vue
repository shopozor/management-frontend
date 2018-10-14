<template>
  <q-card>
    <q-card-media>
      <img :src="image" alt="product image">
    </q-card-media>
    <q-card-actions align="around">
      <q-btn round size="lg" icon="camera_alt" color="primary" />
      <q-btn round size="lg" icon="image" color="primary" />
      <q-btn round size="lg" icon="image_search" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
import NO_IMAGE from '../../../assets/no_image.png'

export default {
  name: 'ProductEditPicture',
  computed: {
    image: {
      get: function () {
        const image = this.$store.state.products.editedProduct.image
        if (image && image !== '') return image
        else return NO_IMAGE
      },
      set: function (newVal) { this.$store.state.products.editedProduct.image = newVal }
    }
  }
}
</script>

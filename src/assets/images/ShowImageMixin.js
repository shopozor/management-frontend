import {NO_IMAGE} from '.'

export default {
  name: 'ShowImageMixin',
  computed: {
    showImage () {
      const imageExists = this.image && this.image.length > 0
      if (imageExists) return this.image
      else return NO_IMAGE
    }
  }
}

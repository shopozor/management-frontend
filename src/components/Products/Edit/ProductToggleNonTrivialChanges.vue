<template>
  <q-toggle
    icon="warning"
    :value="allowNonTrivialChanges"
    @change="toggleNonTrivialChanges"
    color="warning"
  />
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'ProductEditType',
  computed: {
    ...mapGetters(['editedProduct']),
    allowNonTrivialChanges () { return this.editedProduct.allowNonTrivialChanges }
  },
  methods: {
    ...mapMutations(['updateEditedProduct']),
    toggleNonTrivialChanges () {
      this.updateEditedProduct({allowNonTrivialChanges: !this.allowNonTrivialChanges})
    }
  }
}
</script>

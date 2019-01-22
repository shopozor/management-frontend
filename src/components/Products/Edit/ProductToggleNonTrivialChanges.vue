<template>
  <q-toggle
    icon="warning"
    :value="allowNonTrivialChanges"
    @change="toggleNonTrivialChanges"
    color="warning"
  />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'ProductToggleNonTrivialChanges',
  computed: {
    ...mapGetters(['editedProduct']),
    allowNonTrivialChanges () { return this.editedProduct.allowNonTrivialChanges }
  },
  methods: {
    ...mapActions(['updateEditedProduct']),
    toggleNonTrivialChanges () {
      this.updateEditedProduct({allowNonTrivialChanges: !this.allowNonTrivialChanges})
    }
  }
}
</script>

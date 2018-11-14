<template>
  <q-btn
    icon="close"
    round
    color="negative"
    :disable="!isNew && !allowNonTrivialChanges"
    @click="del"
  />
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import types from '../../../../types'

export default {
  name: 'FormatStateManager',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats', 'editedProduct']),
    isNew () { return this.editedFormats[this.formatId].isNew },
    allowNonTrivialChanges () { return this.editedProduct.allowNonTrivialChanges }
  },
  methods: {
    ...mapMutations(['updateEditedFormat']),
    del () {
      this.updateEditedFormat({formatId: this.formatId, newProps: {state: types.formatState.DELETED}})
    }
  }
}
</script>

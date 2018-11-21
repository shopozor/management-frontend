<template>
  <q-btn
    class="absolute-bottom-right"
    icon="close"
    color="negative"
    :disable="!isUpdatable"
    @click="del"
  />
</template>

<script>
import {mapMutations} from 'vuex'
import types from '../../../../types'
import FormatCriticalValuesMixin from './FormatCriticalValuesMixin.js'

export default {
  name: 'FormatStateManager',
  mixins: [FormatCriticalValuesMixin],
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapMutations(['updateEditedFormat']),
    del () {
      this.updateEditedFormat({formatId: this.formatId, newProps: {state: types.formatState.DELETED}})
    }
  }
}
</script>

<template>
  <transition leave-active-class="animated bounceOutLeft">
    <q-card class="row justify-center height-sm" key="cards" v-if="show">
      <format-description :formatId="formatId" />
      <format-price :formatId="formatId" />
      <format-amount :formatId="formatId" />
    </q-card>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import FormatDescription from './FormatDescription/FormatDescription'
import FormatPrice from './FormatPrice/FormatPrice'
import FormatAmount from './FormatAmount'
import FormatIsUpdatableMixin from './FormatIsUpdatableMixin.js'
import types from '../../../../types'

export default {
  name: 'ProductEditFormat',
  mixins: [FormatIsUpdatableMixin],
  data () {
    return {
      state: types.formatState
    }
  },
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    show () {
      const state = this.editedFormats[this.formatId].state
      return state === this.state.VISIBLE || state === this.state.INVISIBLE
    }
  },
  components: {FormatDescription, FormatAmount, FormatPrice}
}
</script>

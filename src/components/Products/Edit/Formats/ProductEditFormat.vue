<template>
  <transition-group leave-active-class="animated bounceOutLeft">
    <div class="row justify-center" key="cards" v-if="show">
      <format-description :formatId="formatId" />
      <format-price :formatId="formatId" />
      <format-amount :formatId="formatId" />
    </div>
    <div class="q-my-md" key="margin" v-if="show" />
  </transition-group>
</template>

<script>
import {mapGetters} from 'vuex'
import FormatDescription from './FormatDescription'
import FormatPrice from './FormatPrice'
import FormatAmount from './FormatAmount'
import types from '../../../../types'

export default {
  name: 'ProductEditFormat',
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

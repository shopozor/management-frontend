<template>
  <transition leave-active-class="animated bounceOutLeft">
    <q-card class="row justify-center relative-position" key="cards" v-if="show">
      <format-description :formatId="formatId"/>
      <format-price :formatId="formatId"/>
      <format-amount :formatId="formatId"/>
      <format-state-manager :formatId="formatId"/>
    </q-card>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import FormatDescription from "./FormatDescription/FormatDescription";
import FormatPrice from "./FormatPrice/FormatPrice";
import FormatAmount from "./FormatAmount";
import types from "../../../../../common/src/types";

export default {
  name: "ProductEditFormat",
  mixins: [FormatCriticalValuesMixin],
  data() {
    return {
      state: types.formatState
    };
  },
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["editedFormats"]),
    show() {
      const state = this.editedFormats[this.formatId].state;
      return state === this.state.VISIBLE || state === this.state.INVISIBLE;
    }
  },
  components: {
    FormatDescription,
    FormatAmount,
    FormatPrice,
    FormatStateManager
  }
};
</script>

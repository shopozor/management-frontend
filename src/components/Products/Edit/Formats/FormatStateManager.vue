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
import { mapGetters, mapMutations } from "vuex";
import types from "../../../../../common/src/types";

export default {
  name: "FormatStateManager",
  mixins: [FormatCriticalValuesMixin],
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(["updateEditedFormat"]),
    del() {
      this.updateEditedFormat({
        formatId: this.formatId,
        newProps: { state: types.formatState.DELETED }
      });
    }
  }
};
</script>

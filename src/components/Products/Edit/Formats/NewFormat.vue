<template>
  <q-card class="width-max height-sm row justify-center content-center">
    <q-btn icon="add" size="xl" round color="primary" @click="createFormat"/>
  </q-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'NewFormat',
  methods: {
    ...mapMutations(['createEditedFormat']),
    createFormat () {
      this.createEditedFormat()
    }
  }
}
</script>

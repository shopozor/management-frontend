<template>
  <q-card class="width-max height-sm row justify-center content-center">
    <q-btn icon="add" size="xl" round color="primary" @click="createFormat"/>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewFormat',
  methods: {
    ...mapActions(['createEditedFormat']),
    createFormat () {
      this.createEditedFormat()
    }
  }
}
</script>

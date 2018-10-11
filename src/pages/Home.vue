<template>
  <q-page>
    <q-toggle v-model="model" @input="logVal"></q-toggle>
    <div>{{model}}</div>
  </q-page>
</template>

<script>
export default {
  name: 'PageHome',
  data () {
    return {
      model: true
    }
  },
  methods: {
    logVal: function (newVal) { console.log(newVal) }
  }
}
</script>

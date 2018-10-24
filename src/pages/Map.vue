<template>
    <q-page class="row justify-center">
        <gmap-map class="q-ma-md"
        :center="center"
        :zoom="9"
        map-type-id="roadmap"
        style="width: 100vw; height: 500px"
      >
        <gmap-marker
          :icon="icon"
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            @click="() => moveTo(m.position)"
        />
        </gmap-map>
    </q-page>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import budzi from '../assets/budzi.png'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA4xnZ_np7vsCKUEmlXAhF46WO_sbygF7Q',
    v: '3.'
  }
})

export default {
  name: 'PageMap',
  data () {
    return {
      icon: budzi,
      center: {lat: 46.67, lng: 6.8},
      markers: [{
        position: { lat: 46.775670, lng: 7.037666 }
      }, {
        position: { lat: 46.696717, lng: 6.919868 }
      }, {
        position: { lat: 46.609589, lng: 7.061532 }
      }, {
        position: { lat: 46.421299, lng: 6.928725 }
      }]
    }
  },
  methods: {
    moveTo (end) {
      window.open(`https://www.google.ch/maps/dir//'${end.lat},${end.lng}'/`)
    }
  }
}
</script>

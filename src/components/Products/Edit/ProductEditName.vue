<template>
  <q-card>
    <q-card-main>
      <q-field>
        <q-input
          float-label="Nom du produit"
          :value="editedProduct.title"
          @input="updateEditedProduct({title: $event})"
        ></q-input>
      </q-field>
      <br >
      <q-field>
        <q-input
        float-label="Description du produit"
        type="textarea"
        :max-height="190"
        rows="8"
        :value="editedProduct.description"
        @input="updateEditedProduct({description: $event})"
      ></q-input>
      </q-field>
    </q-card-main>
  </q-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'ProductEditName',
  computed: {
    ...mapGetters(['editedProduct'])
  },
  methods: {
    ...mapMutations(['updateEditedProduct'])
  }
}
</script>

<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { initFakeServer } from './store/modules/simulateServer'
import * as rqUser from './store/modules/simulateServer/users/requestUsers'
import * as rqProduct from './store/modules/simulateServer/products/requestProducts'

export default {
  name: 'App',
  methods: {
    ...mapActions(['getAuthorizations'])
  },
  created () {
    const serverMustBeInitialized = true // localStorage.getItem('fake_server') === null
    if (serverMustBeInitialized) {
      initFakeServer()

      // bidouillage de tests
      rqUser.signup({email: 'test@test.com', password: 'test1234'})
        .then(response => {
          console.log(response.message)
          rqUser.login({email: 'test@test.com', password: 'test1234'})
            .then(response => {
              console.log(response.message)
              localStorage.setItem('userId', response.userId)
              localStorage.setItem('token', response.token)

              let userId = localStorage.getItem('userId')
              let token = localStorage.getItem('token')

              rqUser.changeUserEmail({userId, token, newEmail: 'changed@test.com', password: 'test1234'})
                .then(response => {
                  console.log(response.message)

                  rqUser.changeUserPassword({userId, token, oldPassword: 'test1234', newPassword: 'changed1234'})
                    .then(response => {
                      console.log(response.message)

                      rqUser.logout({userId, token})
                        .then(response => {
                          console.log(response.message)

                          rqUser.login({ email: 'softozor@budzons.ch', password: 'Budzonnerie1' })
                            .then(response => {
                              console.log(response.message)
                              localStorage.setItem('userId', response.userId)
                              localStorage.setItem('token', response.token)

                              userId = localStorage.getItem('userId')
                              token = localStorage.getItem('token')

                              rqProduct.createProduct({ userId, token, newProduct: {title: 'Ragoût de budzon'} })
                                .then(response => {
                                  localStorage.setItem('myProducts', JSON.stringify(response.myProducts))
                                  console.log(response.message)

                                  rqProduct.getMyProducts({userId, token})
                                    .then(response => {
                                      localStorage.setItem('myProducts', JSON.stringify(response.myProducts))
                                      console.log(response.message)

                                      const productId = Object.keys(JSON.parse(localStorage.getItem('myProducts')))[0]
                                      const newProps = { description: 'De délicieuses fourmis en ragoût' }
                                      rqProduct.updateProduct({ userId, token, productId, newProps })
                                        .then(response => {
                                          console.log(response.message)
                                          localStorage.setItem('myProducts', JSON.stringify(response.products))
                                        })
                                        .catch(error => console.log(error))
                                    })
                                    .catch(error => console.log(error))
                                })
                                .catch(error => console.log(error))
                            })
                            .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    } else {
      this.getAuthorizations()
    }
  }
}
</script>

<style>
</style>

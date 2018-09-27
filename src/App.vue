<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { initFakeServer } from './store/modules/simulateServer'
import * as rqUser from './store/modules/simulateServer/requestUser'
import * as rqProduct from './store/modules/simulateServer/requestProduct'

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
      rqUser.signup({email: '6@6.6', password: '666666'})
        .then(response => {
          console.log(response)
          rqUser.login({email: '6@6.6', password: '666666'})
            .then(response => {
              console.log(response.message)
              localStorage.setItem('userId', response.userId)
              localStorage.setItem('token', response.token)

              let userId = localStorage.getItem('userId')
              let token = localStorage.getItem('token')

              rqUser.changeUserEmail({userId, token, newEmail: '7@7.7', password: '666666'})
                .then(response => {
                  console.log(response)

                  rqUser.changeUserPassword({userId, token, oldPassword: '666666', newPassword: '777777'})
                    .then(response => {
                      console.log(response)

                      rqUser.logout({userId, token})
                        .then(response => {
                          console.log(response.message)

                          rqUser.login({ email: 'softozor@budzons.ch', password: 'Budzonnerie1' })
                            .then(response => {
                              console.log(response.message)
                              localStorage.setItem('userId', response.userId)
                              localStorage.setItem('token', response.token)

                              const oldUserId = userId
                              userId = localStorage.getItem('userId')
                              token = localStorage.getItem('token')

                              rqProduct.createProduct({ userId, token, newProduct: {name: 'Ragoût de budzon'} })
                                .then(response => {
                                  localStorage.setItem('products', JSON.stringify(response.products))
                                  console.log(response.message)

                                  rqProduct.getProductsOf({userId, token})
                                    .then(response => {
                                      localStorage.setItem('products', JSON.stringify(response.products))
                                      console.log(response.message)

                                      const productId = Object.keys(JSON.parse(localStorage.getItem('products')))[0]
                                      const newProps = { description: 'De délicieuses fourmis en ragoût' }
                                      rqProduct.updateProduct({ userId, token, productId, newProps })
                                        .then(response => {
                                          console.log(response.message)
                                          localStorage.setItem('products', JSON.stringify(response.products))

                                          rqProduct.removeProduct({ userId, token, productId })
                                            .then(response => {
                                              console.log(response.message)
                                              localStorage.setItem('products', JSON.stringify(response.products))

                                              rqUser.removeOtherUser({ userId, token, toRemoveUserId: oldUserId })
                                                .then(response => {
                                                  console.log(response.message)
                                                  rqUser.logout({ userId, token })
                                                    .then(response => {
                                                      console.log(response.message)
                                                      localStorage.removeItem('token')
                                                      localStorage.removeItem('userId')
                                                      localStorage.removeItem('products')
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
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    } else {
      this.getAuthorizations({
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('token')
      })
    }
  }
}
</script>

<style>
</style>

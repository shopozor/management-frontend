<template>
  <q-page padding class="q-pa-md flex flex-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-list>
        <q-item class="incorrectIdentifiers bg-warning" v-if="invalidCredentials">
          <q-item-main>
            {{ $t('login.invalidCredentials') }}
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field
              icon="mail">
              <q-input
                v-model="email"
                type="email"
                :float-label="$t('profile.email')" />
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
            <q-item-main>
              <q-field
                icon="vpn_lock">
                <q-input
                  ref="password"
                  v-model="password"
                  type="password"
                  :float-label="$t('profile.password')"
                  @keyup.enter="login({email, password, stayLoggedIn})" />
              </q-field>
            </q-item-main>
        </q-item>
        <q-item class="row justify-center">
          <q-toggle class="q-ma-md" :class="{'text-faded': !stayLoggedIn}" v-model="stayLoggedIn" :label="$t('login.stayLoggedIn')"></q-toggle>
        </q-item>
        <q-item class="row justify-center">
            <q-btn class="q-ma-md" color="primary" :label="$t('login.connect')" @click="login" ></q-btn>
        </q-item>
        <q-item class="row justify-center">
          <router-link to="/confirmationEmailSent">{{ $t('login.forgotPassword') }}</router-link>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageLogin',
  data () {
    return {
      email: '',
      password: '',
      stayLoggedIn: true,
      invalidCredentials: false,
      userIsNotStaff: false
    }
  },
  methods: {
    login () {
      const vm = this
      vm.$store.dispatch('login', {
        email: vm.email,
        password: vm.password,
        stayLoggedIn: vm.stayLoggedIn
      })
        .then(() => vm.$router.back())
        .catch(error => vm.handleError(error))
    },
    handleError (error) {
      switch (error.message) {
        case 'WRONG_CREDENTIALS':
          this.invalidCredentials = true
          break
        case 'NOT_STAFF':
          this.userIsNotStaff = true
          break
        default: break
      }
    },
    focusPassword () {
      this.$refs.password.focus()
    }
  }
}
</script>

<template>
  <q-page padding class="q-pa-md flex flex-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-list>
        <q-item>
          <q-item-main>
            <q-field
              icon="mail"
              :helper="emailHelper">
              <q-input
                v-model="email"
                type="email"
                :float-label="$t('profile.email')"
                @blur="$v.email.$touch"
                @keyup.enter="focusPassword"
                :error="$v.email.$error" />
            </q-field>
          </q-item-main>
          <q-item-side right>
            <q-icon name="check_circle" v-show="!this.$v.email.$invalid" />
          </q-item-side>
        </q-item>
        <q-item>
            <q-item-main>
              <q-field
                icon="vpn_lock"
                :helper="passwordHelper"
                :class="{valid: !$v.email.$invalid}">
                <q-input
                  ref="password"
                  v-model="password"
                  type="password"
                  :float-label="$t('profile.password')"
                  @blur="$v.password.$touch"
                  @keyup.enter="focusConfirmPassword"
                  :error="$v.password.$error" />
              </q-field>
            </q-item-main>
          <q-item-side right>
            <q-icon name="check_circle" v-show="!this.$v.password.$invalid" />
          </q-item-side>
        </q-item>
        <q-item>
            <q-item-main>
              <q-field
                icon="vpn_lock"
                :helper="confirmPasswordHelper"
                :class="{valid: !$v.confirmPassword.$invalid}">
                <q-input
                  ref="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  :float-label="$t('signup.repeatPassword')"
                  @blur="$v.confirmPassword.$touch"
                  @keyup.enter="submit"
                  :error="$v.confirmPassword.$error" />
              </q-field>
            </q-item-main>
          <q-item-side right>
            <q-icon name="check_circle" v-show="!this.$v.confirmPassword.$invalid" />
          </q-item-side>
        </q-item>
        <q-item class="row justify-center">
            <q-btn class="q-ma-md" color="primary" :label="$t('signup.createAccount')" @click="submit" ></q-btn>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
  name: 'PageSignup',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations: {
    email: {
      required, email
    },
    password: {
      required, minLength: minLength(6)
    },
    confirmPassword: {
      required, sameAs: sameAs('password')
    }
  },
  computed: {
    emailHelper: function () {
      if (!this.$v.email.$error) return this.$t('signup.emailHelper.valid')
      else return this.$t('signup.emailHelper.invalid')
    },
    passwordHelper: function () {
      if (!this.$v.password.$error) return this.$t('signup.passwordHelper.valid')
      else return this.$tc('signup.passwordHelper.invalid', 6 - this.password.length, {count: 6 - this.password.length})
    },
    confirmPasswordHelper: function () {
      if (!this.$v.confirmPassword.$error) return this.$t('signup.confirmPasswordHelper.valid')
      else return this.$t('signup.confirmPasswordHelper.invalid')
    }
  },
  methods: {
    focusPassword () {
      this.$refs.password.focus()
    },
    focusConfirmPassword () {
      this.$refs.confirmPassword.focus()
    },
    submit () {
      this.$v.$touch()

      if (this.$v.$error) {
        this.$q.notify(this.$t('signup.correctErrors'))
      } else {
        this.$store.dispatch('signup', {email: this.email, password: this.password})
      }
    }
  }
}
</script>

<style lang="stylus">
.q-list {
  // width: 200px
}
</style>

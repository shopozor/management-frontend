import PageLink from '../../../../../common/src/components/SideDrawerContent/PageLink'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Quasar from 'quasar'
import VueRouter from 'vue-router'
// import i18n from '../../../../../src/boot'

describe('PageLink', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Quasar)

  const mountPageLink = ({ $route, label, path }) => {
    return shallowMount(PageLink, {
      mocks: { $route },
      propsData: { label, path }
    })
  }

  it('is aware when its path is the active route', () => {
    const activeLink = mountPageLink({
      $route: { path: '/activeRoute' },
      label: 'active route',
      path: '/activeRoute'
    })
    expect(activeLink.vm.isActive).toBe(true)
    const inactiveLink = mountPageLink({
      $route: { path: '/otherRoute' },
      label: 'active route',
      path: '/activeRoute'
    })
    expect(inactiveLink.vm.isActive).toBe(false)
  })

  // it('changes the url to its path when clicked', () => {
  //   const pageLink =
  // })
})

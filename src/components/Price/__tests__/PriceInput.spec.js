import PriceInput from '../PriceInput'
import { mountQuasar } from '../../../../common/unit-tests/utils'

describe('PriceInput', () => {
  const wrapper = mountQuasar(PriceInput, { shallow: true })

  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})

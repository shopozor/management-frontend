export const myProducts = state => state.myProducts
export const products = state => state.products
export const firstOfMyProducts = (state, {myProducts}) => {
  const id = Object.keys(myProducts)[0]
  return myProducts[id]
}

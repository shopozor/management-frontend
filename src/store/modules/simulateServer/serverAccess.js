// get objects of owner, filtering by states
export const getOrdersAmountsOfFormat = ({ formatId, requiredStates }) => {
  const orders = getOrdersOfFormat({ formatId, requiredStates })
  return Object.keys(orders).reduce((amount, orderId) => amount + orders[orderId].amount)
}

export const getOrdersOfFormat = ({ formatId, requiredStates }) => {
  const owned = getFormat({ formatId }).orders
  return owned.reduce((ownedOrders, orderId) => {
    const order = getOrders()[orderId]
    if (!requiredStates || requiredStates.includes(order.state)) {
      ownedOrders[orderId] = order
    }
  }, {})
}

export const getOrdersToReceiveOfCustomer = ({ userId, requiredStates }) => {
  const owned = getUser({ userId }).orders
  return owned.reduce((ordersToReceive, orderId) => {
    const order = getOrders()[orderId]
    if (order.customer === userId && (!requiredStates || requiredStates.includes(order.state))) {
      ordersToReceive[orderId] = order
    }
  }, {})
}

export const getOrdersToDeliverOfProducer = ({ userId, requiredStates }) => {
  const owned = getUser({ userId }).orders
  return owned.reduce((ordersToDeliver, orderId) => {
    const order = getOrder({ orderId })
    if (order.producer === userId && (!requiredStates || requiredStates.includes(order.state))) {
      ordersToDeliver[orderId] = order
    }
  }, {})
}

export const getFormatsOfProduct = ({ productId, requiredStates }) => {
  const owned = getProduct({ productId }).formats
  return owned.reduce((ownedFormats, formatId) => {
    const format = getFormat({ formatId })
    if (format.product === productId && (!requiredStates || requiredStates.includes(format.state))) {
      ownedFormats[formatId] = format
    }
  }, {})
}

export const getProductsOfProducer = ({ userId, requiredStates }) => {
  const owned = getUser({ userId }).products
  return owned.reduce((ownedProducts, productId) => {
    const product = getProduct({ productId })
    if (product.producer === userId && (!requiredStates || requiredStates.includes(product.state))) {
      ownedProducts[productId] = product
    }
  }, {})
}

// set, get, update, delete
// server > orders > order
export const deleteOrder = ({ orderId }) => {
  const orders = getOrders()
  delete orders[orderId]
  setOrders({ orders })
}

export const updateOrder = ({ orderId, newProps }) => {
  const order = { ...getOrder({ orderId }), ...newProps, lastChange: Date.now() }
  updateOrders({ newOrders: { [orderId]: order } })
}

export const getOrder = ({ orderId }) => getOrders()[orderId]

export const setOrder = ({ orderId, order }) => {
  updateOrders({ newOrders: { [orderId]: order } })
}

// server > orders
export const deleteOrders = () => {
  const server = getServer()
  delete server.orders
  setServer({ server })
}

export const updateOrders = ({ newOrders }) => {
  const orders = { ...getOrders(), ...newOrders }
  updateServer({ newProps: orders })
}

export const getOrders = () => getServer().orders

export const setOrders = ({ orders }) => {
  updateServer({ newProps: orders })
}

// server > formats > format
export const deleteFormat = ({ formatId }) => {
  const formats = getFormats()
  delete formats[formatId]
  setFormats({ formats })
}

export const updateFormat = ({ formatId, newProps }) => {
  const format = { ...getFormat({ formatId }), ...newProps, lastChange: Date.now() }
  updateFormats({ newFormats: { [formatId]: format } })
}

export const getFormat = ({ formatId }) => getFormats()[formatId]

export const setFormat = ({ formatId, format }) => {
  updateFormats({ newFormats: { [formatId]: format } })
}

// server > formats
export const deleteFormats = () => {
  const server = getServer()
  delete server.formats
  setServer({ server })
}

export const updateFormats = ({ newFormats }) => {
  const formats = { ...getServer(), ...newFormats }
  updateServer({ newProps: { formats } })
}

export const getFormats = () => getServer().formats

export const setFormats = ({ formats }) => {
  updateServer({ newProps: { formats } })
}

// server > products > product
export const deleteProduct = ({ productId }) => {
  const products = getProducts()
  delete products[productId]
  setProducts({ products })
}

export const updateProduct = ({ productId, newProps }) => {
  const product = { ...getProduct({ productId }), ...newProps, lastChange: Date.now() }
  updateProducts({ newProducts: { [productId]: product } })
}

export const getProduct = ({ productId }) => getProducts()[productId]

export const setProduct = ({ productId, product }) => {
  updateProducts({ newProducts: { [productId]: product } })
}

// server > products
export const deleteProducts = () => {
  const server = getServer()
  delete server.products
  setServer(server)
}

export const updateProducts = ({ newProducts }) => {
  const products = { ...getProducts(), ...newProducts }
  updateServer({ newProps: { products } })
}

export const getProducts = () => getServer().products

export const setProducts = ({ products }) => {
  updateServer({ newProps: products })
}

// server > users > user
export const deleteUser = ({ userId }) => {
  const users = getUsers()
  delete users[userId]
  setUsers({ users })
}

export const updateUser = ({ userId, email, newProps }) => {
  const user = { ...getUser({ userId, email }), ...newProps, lastChange: Date.now() }
  updateUsers({ newUsers: { [user.userId]: user } })
}

export const getUser = ({ userId, email }) => {
  const users = getServer().users
  if (userId) return users[userId]
  else if (email) return Object.values(users).find(user => user.email === email)
  else return undefined
}

export const setUser = ({ userId, user }) => {
  updateUsers({ newUsers: { [userId]: user } })
}

// server > users
export const deleteUsers = () => {
  const server = getServer()
  delete server.users
  setServer({ server })
}

export const updateUsers = ({ newUsers }) => {
  const users = { ...getUsers(), ...newUsers }
  updateServer({ newProps: { users } })
}

export const getUsers = () => getServer().users

export const setUsers = ({ users }) => {
  updateServer({ newProps: { users } })
}

// server
export const deleteServer = () => {
  localStorage.removeItem('fake_server')
}

export const updateServer = ({ newProps }) => {
  const server = { ...getServer(), ...newProps }
  setServer({ server })
}

export const getServer = () => JSON.parse(localStorage.getItem('fake_server'))

export const setServer = ({ server }) => {
  localStorage.setItem('fake_server', JSON.stringify(server))
}

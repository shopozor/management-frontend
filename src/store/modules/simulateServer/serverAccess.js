export const updateServer = ({ newProps }) => {
  const server = { ...readServer(), ...newProps }
  writeServer(server)
}

export const readServer = () => JSON.parse(localStorage.getItem('fake_server'))

export const writeServer = newServerData => {
  localStorage.setItem('fake_server', JSON.stringify(newServerData))
}

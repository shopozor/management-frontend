import types from '../../../../common/types'

export const permissions = state => state.permissions
export const userId = state => state.userId
export const token = state => state.token
export const email = state => state.email
export const isAuthorized = state => state.permissions.every(permission => permission !== types.permissions.NOT_CONNECTED)

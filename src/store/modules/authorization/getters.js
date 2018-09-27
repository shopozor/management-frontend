import * as auth from '../../../types/authorization'

export const authorizations = state => state.authorizations
export const userId = state => state.userId
export const token = state => state.token
export const email = state => state.email
export const isAuthorized = state => state.authorizations.every(authorization => authorization !== auth.NOT_CONNECTED)

import { UndefinedUserActuallyDefined } from './Exceptions'

let compareUsers = (lhs, rhs) =>
  lhs.email === rhs.email && lhs.password === rhs.password

let isUserUndefined = (definedUsers, user) =>
  definedUsers.find(currUser => compareUsers(currUser, user)) === undefined

export default function checkUserUndefined(definedUsers, undefinedUser) {
  if (!isUserUndefined(definedUsers, undefinedUser)) {
    throw new UndefinedUserActuallyDefined(
      `The undefined user is in fact defined: ${JSON.stringify(undefinedUser)}`
    )
  }
}

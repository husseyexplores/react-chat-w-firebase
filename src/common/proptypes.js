import { shape, string } from 'prop-types'

export const userPropType = shape({
  uid: string.isRequired,
  displayName: string.isRequired,
  photoURL: string.isRequired,
}).isRequired

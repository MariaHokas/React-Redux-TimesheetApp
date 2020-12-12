import { userConstants } from '../_constants';
// Important to notice that reducers are pure functions. 
// They never call something like an API or dispatch another action to redux.

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}
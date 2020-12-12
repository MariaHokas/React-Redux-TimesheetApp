import { tunnitConstants } from '../_constants';
// Important to notice that reducers are pure functions. 
// They never call something like an API or dispatch another action to redux.

export function addtunnit(state = {}, action) {
  switch (action.type) {
    case tunnitConstants.CREATE_REQUEST:
      return { tunti: true };
    case tunnitConstants.CREATE_SUCCESS:
      return {};
    case tunnitConstants.CREATE_FAILURE:
      return {};
    default:
      return state
  }
}
import { tunnitConstants } from '../_constants';

// Important to notice that reducers are pure functions. 
// They never call something like an API or dispatch another action to redux.

export function tunnit(state = {}, action) {
  switch (action.type) {
    case tunnitConstants.GETALLTUNNIT_REQUEST:
      return {
        loading: true
      };
    case tunnitConstants.GETALLTUNNIT_SUCCESS:
      return {
        items: action.tunnit
      };
    case tunnitConstants.GETALLTUNNIT_FAILURE:
      return {
        error: action.error
      };
    case tunnitConstants.DELETE_REQUEST:
      // add 'deleting:true' property to tunti being deleted
      return {
        ...state,
        items: state.items.map(tunti =>
          tunti.id === action.id
            ? { ...tunti, deleting: true }
            : tunti
        )
      };

    case tunnitConstants.DELETE_SUCCESS:
      // remove deleted tunti from state
      return {
        items: state.items.filter(tunti => tunti.id !== action.id)
      };
    case tunnitConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to tunti 
      return {
        ...state,
        items: state.items.map(tunti => {
          if (tunti.id === action.id) {
            // make copy of tunti without 'deleting:true' property
            const { deleting, ...tuntiCopy } = tunti;
            // return copy of tunti with 'deleteError:[error]' property
            return { ...tuntiCopy, deleteError: action.error };
          }

          return tunti;
        })
      };


    default:
      return state
  }
}
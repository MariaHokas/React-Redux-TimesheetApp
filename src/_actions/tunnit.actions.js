import { tunnitConstants } from '../_constants';
import { tunnitService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const tunnitActions = {
   addNewTunnit,
    // createNew,
    getAlltunnit,
    delete: _delete,
    updateTunnit
};

function addNewTunnit(tunnit) {
    return dispatch => {
        dispatch(request(tunnit));

        tunnitService.addNewTunnit(tunnit)
            .then(
                tunnit => { 
                    dispatch(success());
                    dispatch(alertActions.success('Adding new tunnit successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(tunnit) { return { type: tunnitConstants.CREATE_REQUEST, tunnit } }
    function success(tunnit) { return { type: tunnitConstants.CREATE_SUCCESS, tunnit } }
    function failure(error) { return { type: tunnitConstants.CREATE_FAILURE, error } }
}

function getAlltunnit() {
    return dispatch => {
        dispatch(request());
        tunnitService.getAlltunnit()
            .then(
                tunnit => dispatch(success(tunnit)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: tunnitConstants.GETALLTUNNIT_REQUEST } }
    function success(tunnit) { return { type: tunnitConstants.GETALLTUNNIT_SUCCESS, tunnit } }
    function failure(error) { return { type: tunnitConstants.GETALLTUNNIT_FAILURE, error } }
}

// // prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        tunnitService.delete(id)
            .then(
                tunti => dispatch(success(id)),
                history.push('/opettaja'),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: tunnitConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: tunnitConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: tunnitConstants.DELETE_FAILURE, id, error } }
}

function updateTunnit(id) {
    return dispatch => {
        dispatch(request(id));

        tunnitService.updateTunnit(id)
            .then(
                tunti => dispatch(success(id)),
                history.push('/opettaja'),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: tunnitConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: tunnitConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: tunnitConstants.DELETE_FAILURE, id, error } }
}


// After an action is dispatched, it will be passed onto a reducer.
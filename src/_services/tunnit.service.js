// import config from 'config';
import { authHeader } from '../_helpers';

export const tunnitService = {
    getAlltunnit,
    addNewTunnit,
    // getById,
    // updateTunnit,
    delete: _delete
};
const apiUrl = 'http://localhost:4000';
const start = 0;
const take = 20;
// const user = useSelector(state => state.authentication.user);

function getAlltunnit() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
console.log('serviseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
// return fetch(`${apiUrl}/api/oppilas` , requestOptions).then(handleResponse);
return fetch(`${apiUrl}/api/oppilas/r?offset=${start}&limit=${take}` , requestOptions).then(handleResponse);
}

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${apiUrl}/api/Opettaja${id}`, requestOptions).then(handleResponse);
// }

function addNewTunnit(tunnit) {
    const requestOptions = {
        method: 'POST',
        headers: { "Accept": "application/json",'Content-Type': 'application/json' },
        body: JSON.stringify(tunnit)
    };
    return fetch(`${apiUrl}/api/opettaja/add`, requestOptions).then(handleResponse);
}

// function updateTunnit(tunnit) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(tunnit)
//     };

//     return fetch(`${apiUrl}/api/Opettaja/${user.id}`, requestOptions).then(handleResponse);;
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/api/Opettaja/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                Location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
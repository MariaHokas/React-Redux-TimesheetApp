import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

export default function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, [dispatch]);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">

            <p>
                <Link to="/login">Logout</Link> <br/>
                <Link to="/opettaja">Opettaja</Link>
            </p>
            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in with React Hooks!!</p>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.success && <span className="text-primary">SUCCESS: {users.success}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName + ' ' + user.role} 
                            {
                                user.deleting ? <em>Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> <a onClick={() => handleDeleteUser(user.id)} className="text-primary" href="Homepage">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
      
        </div>
    );
}

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { tunnitActions } from '../_actions';

export default function OppilasPage() {
    const tunnit = useSelector(state => state.tunnit);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tunnitActions.getAlltunnit());
    }, [dispatch]);

    function handleDeleteTunti(id) {
        dispatch(tunnitActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <p>
                <Link to="/login">Logout</Link>
                <Link to="/homepage">homepage</Link>
            </p>
            {/* <h1>Hi {user.firstName}!</h1> */}
            <p>You're logged in with React Hooks!!</p>
            <h1>Hi {user.firstName}!</h1>
            <h1>Your role is {user.role}!</h1>
            {/* <h3>All registered tunnit:</h3> */}
            {tunnit.loading && <em>Loading tunnit...</em>}
            {tunnit.error && <span className="text-danger">ERROR: {tunnit.error}</span>}
            {tunnit.success && <span className="text-primary">SUCCESS: {tunnit.success}</span>}
            {tunnit.items &&
                <table>
                    <thead><tr><th>Oppilas</th><th>luokkahuone</th><th>Sisään</th><th>Ulos</th></tr></thead>
                    <tbody>
                        {tunnit.items.map((tunti, index) =>
                            <tr key={tunti.tunnitId}>
                                <td>{tunti.tunnitId}</td>
                                <td>{tunti.oppilasName}</td>
                                <td>{tunti.luokkahuoneNimi}</td>
                                <td>{tunti.sisaan}</td>
                                <td>{tunti.ulos}</td>
                                <td>
                                    {
                                        tunti.deleting ? <em>Deleting...</em>
                                            : tunti.deleteError ? <span className="text-danger">ERROR: {tunti.deleteError}</span>
                                                : <span><a onClick={() => handleDeleteTunti(tunti.tunnitId)} className="btn btn-warning" href="Opettaja">Delete</a></span>
                                    }
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            }

        </div>
    );
}
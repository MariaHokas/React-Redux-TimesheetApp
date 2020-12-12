import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { createSelector } from 'reselect'

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components/PrivateRoute';
import { userService } from './_services'
import HomePage from './HomePage/HomePage'
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import OpettajaPage from './Opettaja/OpettajaRaportti';
import OppilasPage from './Oppilas/OppilasRaportti';
import './App.css';

//testiCaset poistetaan myöhemmin
import TestiAdd from './Opettaja/TestiAdd'

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    
    const role = createSelector(
        state => state.user,
        (_, role) => role,
        (user, role) => user.filter(user => user.role === role).length
      )

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, [dispatch]);

    function logout() {
        userService.logout();
        history.push('/login');

    }
    return (
        
        <div>
            <div>

                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    
                    {user&& 
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="/Homepage">HomePage</Nav.Link>
                                <Nav.Link href="/Opettaja">Opettaja</Nav.Link>
                                <Nav.Link href="/Oppilas">OppilasPage</Nav.Link>
                          <Nav.Link href="/TestiAdd">TestiAdd</Nav.Link>
                            </Nav>
                            <Nav>
                    <div className="kayttaja">Hei</div>
                            <div className="hellotext">
                                    <a onClick={logout} className="nav-item" href="/login">Kirjaudu ulos</a>
                            </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    }
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/Opettaja" component={OpettajaPage} />
                        <Route path="/Oppilas" component={OppilasPage} />
                        <Route path="/TestiAdd" component={TestiAdd} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </div>

        </div>
    );
}
export default App;

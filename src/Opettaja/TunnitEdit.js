import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { tunnitActions } from '../_actions';

export default function TestiAdd(props) {
    const [tunnit, setTunnit] = useState({
        luokkahuoneId: '',
        userId: '',
        sisaan: '',
        ulos: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const addtunnit = useSelector(state => state.addtunnit);
    const dispatch = useDispatch();

    // reset login status
    // useEffect(() => {
        
    //     tunnitId: props.tunnit.address,
    //     luokkahuoneId: props.tunnit.customerId,
    //     userId: props.tunnit.companyName,
    //     sisaan: props.tunnit.contactName,
    //     ulos: props.tunnit.contactTitle,
    //     dispatch(tunnitActions.logout());

    //     );

    // }, [dispatch]);

    function handleChange(e) {
        const { name, value, type } = e.target;
        setTunnit(tunnit => ({ ...tunnit, [name]: type === "number" ? parseInt(value, tunnit.userId) : value}));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (tunnit.luokkahuoneId && Number(tunnit.userId) && tunnit.sisaan && tunnit.ulos) {
            console.log('here setSubmit');
            parseInt(tunnit.userId)
            dispatch(tunnitActions.addNewTunnit(tunnit));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Lisää tunti</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Luokka id</label>
                    <input type="text" name="luokkahuoneId" value={tunnit.luokkahuoneId} onChange={handleChange} className={'form-control' + (submitted && !tunnit.luokkahuoneId ? ' is-invalid' : '')} />
                    {submitted && !tunnit.luokkahuoneId &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Oppilaan tunnus</label>
                    <input type="number" name="userId" value={tunnit.userId} onChange={handleChange} className={'form-control' + (submitted && !tunnit.userId ? ' is-invalid' : '')} />
                    {submitted && !tunnit.userId &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>sisaan</label>
                    <input type="datetime-local" name="sisaan" value={tunnit.sisaan} onChange={handleChange} className={'form-control' + (submitted && !tunnit.sisaan ? ' is-invalid' : '')} />
                    {submitted && !tunnit.sisaan &&
                        <div className="invalid-feedback">sisaan is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>ulos</label>
                    <input type="datetime-local" name="ulos" value={tunnit.ulos} onChange={handleChange} className={'form-control' + (submitted && !tunnit.ulos ? ' is-invalid' : '')} />
                    {submitted && !tunnit.ulos &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {addtunnit && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
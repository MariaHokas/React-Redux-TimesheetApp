import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { tunnitActions } from '../_actions';

export default function AddNewTunti() {
  const [tunnit, setTunnit] = useState({
    luokkahuoneId: '',
    userId: '',
    sisaan: '',
    ulos: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const addtunnit = useSelector(state => state.addtunnit);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) {
    const { name, value, type } = e.target;
    setTunnit(tunnit => ({ ...tunnit, [name]: type === "number" ? parseInt(value, tunnit.userId) : value }));
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
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new tunnit
        </Button>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tuntikortti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <button className="btn btn-primary" onClick={handleClose}>
                {addtunnit && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Add
                </button>
                <button className="btn btn-primary" variant="secondary" onClick={handleClose}>Close</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

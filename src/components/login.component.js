import React, {useState} from 'react'
import PropTypes from 'prop-types';
import configData from "../config.json";
import {Button, Modal} from "react-bootstrap";

export default function Login({setToken}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function loginUser(credentials) {
        return fetch(`${configData.API_URL}/login`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await loginUser({
            email,
            password
        });
        if (typeof (data.token) === 'undefined') {
            handleShow();
        } else {
            setToken(data.token);
        }
    }

    return (<div className="auth-wrapper">
        <div className="auth-inner">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Authentication Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please check your authentication details
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>)
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
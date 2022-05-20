import React, {useEffect, useState} from 'react'
import {Badge, Button, ListGroup, Modal, Pagination, Table} from 'react-bootstrap';
import configData from "../config.json";
import Customer from "./customer.component";


export default function Dashboard({appState, setAppState, token}) {
    const [show, setShow] = useState(false);

    const [modalState, setModalState] = useState({
        loading: false,
        customer: false,
        loaded: false,
        id: 0,
        current_id: 0,
    });


    useEffect(() => {
        let customerId = modalState.id;

        if (modalState.loading || modalState.id == 0) {
            return;
        }
        if (modalState.id === modalState.current_id) {
            return;
        }

        setModalState({...modalState, loading: true});
        const apiUrl = `${configData.API_URL}/customer/${modalState.id}`;
        fetch(apiUrl, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((res) => res.json())
            .then((response) => {
                if (typeof (response.data) !== 'undefined') {
                    setTimeout(() => {
                        setModalState({...modalState, current_id: customerId, loading: false, loaded: true, customer: response.data});
                        openModal();
                    }, 500);
                }
            });
    }, [modalState]);

    const closeModal = () => setShow(false);
    const openModal = () => setShow(true);

    const goBack = () => {
        if (appState.page > 1) {
            setAppState({...appState, loading: false, page: appState.page - 1});
        }
    }

    const goForward = () => {
        setAppState({...appState, loading: false, page: appState.page + 1});
    }

    const showCustomerDetails = (id) => {
        setModalState({...modalState, id: id,current_id: 0});
    }

    return (
        <div>

            <Modal
                show={show}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>#{modalState.current_id} Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Customer modalState={modalState} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Table striped hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {appState.customers.data.map((customer, index) => {
                    return (<tr key={index}>
                            <td>{customer.id}</td>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.city}</td>
                            <td>{customer.company}</td>
                            <td>{customer.title}</td>
                            <td>{customer.geolocation.longitude + ', ' + customer.geolocation.latitude}</td>
                            <td><span onClick={() => showCustomerDetails(customer.id)}
                                      className="link">Show Details</span></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.First/>
                <Pagination.Prev onClick={goBack}>Previous</Pagination.Prev>
                <Pagination.Ellipsis/>
                <Pagination.Item active>{appState.current_page}</Pagination.Item>
                <Pagination.Ellipsis/>
                <Pagination.Next onClick={goForward}>Next</Pagination.Next>
            </Pagination>
            <br></br>
        </div>
    )
}

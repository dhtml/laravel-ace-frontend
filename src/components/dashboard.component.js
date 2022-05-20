import React from 'react'
import {Pagination, Table} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default function Dashboard({appState, setAppState}) {

    const goBack = () => {
        if(appState.page>1) {
            setAppState({...appState, loading: false, page: appState.page-1 });
        }
    }

    const goForward = () => {
        setAppState({...appState, loading: false, page: appState.page+1 });
    }

    return (
        <div>
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
                    return  (<tr key={index}>
                            <td>{customer.id}</td>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.city}</td>
                            <td>{customer.company}</td>
                            <td>{customer.title}</td>
                            <td>{customer.geolocation.longitude + ', ' + customer.geolocation.latitude}</td>
                            <td><a href="#" className="more-details">Show Details</a></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.First />
                <Pagination.Prev onClick={goBack}>Previous</Pagination.Prev>
                <Pagination.Ellipsis />
                <Pagination.Item active>{appState.current_page}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Next onClick={goForward}>Next</Pagination.Next>
            </Pagination>
            <br></br>
        </div>
    )
}

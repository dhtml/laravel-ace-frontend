import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

export default function Dashboard({token}) {
    const [appState, setAppState] = useState({
        loading: false,
        customers: null,
    });

    var reptiles = ["alligator", "snake", "lizard"];

        return (
            <div>
            {reptiles.map((each, index) => <div key={index}>{each}</div>)}

            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
            </div>
        )
}

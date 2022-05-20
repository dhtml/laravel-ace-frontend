import React from "react";
import {Badge, Button, ListGroup, Modal} from "react-bootstrap";

export default function Customer({modalState}) {
 if(!modalState.loaded) {return}
 let info = modalState.customer;

    return (
        <ListGroup as="ol" numbered>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Full Name</div>
                    {info.first_name + ' ' + info.last_name} ({info.title+', '+info.company})
                </div>
                <Badge bg="primary" pill>
                    {info.gender}
                </Badge>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">E-mail</div>
                    {info.email}
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Location</div>
                    {info.city}
                </div>
                <Badge bg="primary" pill>
                    {info.geolocation.latitude},  
                    {info.geolocation.longitude}
                </Badge>
            </ListGroup.Item>
        </ListGroup>
    )
}
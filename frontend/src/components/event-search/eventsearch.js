import React from 'react';
import {  Form, Button,  Col,Dropdown } from 'react-bootstrap';
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EventSearch = (props) => {
    return ( 
        <Form onSubmit={props.submitHandler}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="title">
                    <Form.Label>Search by event name</Form.Label>
                    <Form.Control type="text" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid input.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Button type="submit" style={{ marginTop: '32px' }}>Search</Button>
                </Form.Group>
                <Form.Group as={Col} md="8" controlId="validation">
                <Dropdown className="mr-2">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick = { props.setSortByValue } >Event Date</Dropdown.Item>
                        <Dropdown.Item onClick = { props.setSortByValue } >Event Name</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button type="button" variant="link" onClick = { props.setSortByOrder }><FontAwesomeIcon icon={ faSort } size= "2x" /></Button>
                </Form.Group>
            </Form.Row>
            
        </Form>
    );
}
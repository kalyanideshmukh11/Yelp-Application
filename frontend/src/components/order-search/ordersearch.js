import React from 'react';
import { Card, Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const OrderSearch = (props) => {
    return ( 
        <Form onSubmit={props.submitHandler}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Button type="submit" style={{ marginTop: '32px' }}>Search</Button>
                </Form.Group>
            </Form.Row>
            <Form.Row className='w-75'>
                <Form.Group as={Col} md="3" controlId="pickupFilter">
                    <button type="button" onClick = {props.recordFilters} className="btn btn-outline-primary">Curbside Pickup</button>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="dineFilter">
                    <button type="button" onClick = {props.recordFilters} className="btn btn-outline-primary">Dine In</button>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="delFilter">
                    <button type="button" key= "delivery_method" value="Yelp Delivery" onClick = {props.recordFilters} className="btn btn-outline-primary">Yelp Delivery</button>
                </Form.Group>
            </Form.Row>
            <Form.Row>
            </Form.Row>
        </Form>
    );
}
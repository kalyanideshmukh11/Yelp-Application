import React from 'react';
import { Card,Row,Dropdown, Button, Modal,Col, Form, Alert, Badge } from 'react-bootstrap';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const OrdersList = (props) => {    
    let orderDetails = props.orderDetails;
    let list
    // if(props.ordersearchResults.length){
    //      orderDetails = props.ordersearchResults;
    //  }
    console.log(orderDetails)
    if(orderDetails){
     list = Object.keys(orderDetails).map((key,i) =>
        <Card bg="light" className = "mt-2">
            <Card.Body>
             <Button type="button" variant="link" className="p-0" href="/customerpage">{orderDetails[i].customer_name}</Button>
             <Card.Text id="cousine">
             Date:   {orderDetails[key].date} 
            </Card.Text> 
            <Card.Text id="location">
            Order Status:   {orderDetails[key].order_status}
            </Card.Text>
            <Card.Text id="city">
            Delivery Method:  {orderDetails[key].delivery_status}
            </Card.Text>
            <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Update Delivery Status
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">On the way</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Pick up Ready</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Picked up</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Delivered</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>       
            </Card.Body>
        </Card>
    )
    }else {
        list = (<Card.Body>
            <Card.Text>
                Loding Orders List...
            </Card.Text>
        </Card.Body>)
    }
    return (
            <Card bg="light">
            <Card.Body>
            <Card.Title>Order Details</Card.Title>
            {list}            
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card>
    );  
}

//<Button variant="link" style={{paddingLeft: '300px'}} onClick={() => props.changeMode(true)}><FontAwesomeIcon icon={faEdit} /></Button>
           
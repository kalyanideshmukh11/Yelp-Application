import React from 'react';
import { Card, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import{GetMenuDetails} from '../../components/menu-details/getmenudetails';


export const OrdersList = (props) => {    
    let orderDetails = props.orderDetails;
    // if(props.ordersearchResults.length){
    //      orderDetails = props.ordersearchResults;
    //  }
    const list = Object.keys(orderDetails).map(key =>
        <Card bg="light" className = "mt-2">
            <Card.Body>
            <Button type="button" variant="link" className="p-0" onClick={() => props.controlModal(true, orderDetails[key])}>{orderDetails[key].restaurant_name}</Button>
            <Card.Text id="location">
            Location:   {orderDetails[key].restaurant_location}
            </Card.Text>
            <Card.Text id="city">
            City:  {orderDetails[key].restaurant_city}
            </Card.Text>
            <Card.Text id="cousine">
            Cuisines:   {orderDetails[key].cousine} 
            </Card.Text>
            <Card.Text id="deliverymode">   
            Deivery Method:  {orderDetails[key].delivery_method}
            </Card.Text> 
            <Card.Text id="contact">
            Contact Details:  {orderDetails[key].contact_info}
            </Card.Text> 
            <Card.Text id="timing">
            Timing:  {orderDetails[key].timing}
            </Card.Text>         
            </Card.Body>
        </Card>
    );
    return (
        <div>
            {list}
            <Modal show={props.openModal} onHide={() => props.controlModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Restaurant Page{props.selectedRestaurant && props.selectedRestaurant.title}</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <div className="pb-2">
                        <li style={{listStyle: 'none'}}>
                            <p className="d-inline font-weight mr-2">Restaurant Name: {props.selectedRestaurant && props.selectedRestaurant.restaurant_name}</p><br/>
                            <ul className="d-inline font-weight mr-2">{props.selectedRestaurant && props.selectedRestaurant.restaurant_location}</ul><br/>
                            <ul className="d-inline font-weight mr-2">${props.selectedRestaurant && props.selectedRestaurant.cousine} </ul> <br/>
                            <ul className="d-inline font-weight mr-2">{props.selectedRestaurant && props.selectedRestaurant.delivery_method}</ul><br/>
                        </li>
                    </div>                
                    <p className="font-italic">Description</p>{props.selectedRestaurant && props.selectedRestaurant.restaurant_description}   
                </Modal.Body>
                <Modal.Footer>
                {props.success && <Alert variant='success'>
                        Successfully applied!
                    </Alert>}
                <Button variant="secondary" onClick={() => props.controlModal(false)}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={props.applyToJob}>
                    Order Now
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );  
}
import React from 'react';
import { Card, Form,Row, Col,Modal,Alert, Button } from 'react-bootstrap';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import party from '../../assets/party.jpg';
import '../../App.css';
export const GetEventDetails = (props) => {
    let content;
    if(props.eventDetails && props.eventDetails.length ){   
        console.log("from props",props.eventDetails) 
        let events = props.eventDetails;
         events= events.sort((a, b) => (a.date > b.date) ? 1 : -1)
        console.log("event value",events)
        content = Object.keys(events).map((key,i) =>(
            <div>
                <Card.Header>
                    Event Info:
                </Card.Header>
                <Button type="button" variant="link" className="p-0" onClick={() => props.controlModal(true, props.eventDetails[i])}>{ props.eventDetails[i].name}</Button>
                <Card.Text>
                Description: {(props.eventDetails && props.eventDetails.length) ? props.eventDetails[i].description : ''}
                </Card.Text>
                <Card.Text>
                Date: {(props.eventDetails && props.eventDetails.length) ? props.eventDetails[i].date: ''}
                </Card.Text>
                <Card.Text>
                Time: {(props.eventDetails && props.eventDetails.length) ? props.eventDetails[i].time: ''}
                </Card.Text>
                <Card.Text>
                    Location: {(props.eventDetails && props.eventDetails.length) ? props.eventDetails[i].location: ''}
                </Card.Text>
            </div>
        ))
    } else{
        content = (
        <div>
            <Card.Text>
                No Event added yet
                </Card.Text>
        </div>)

    }
    return (
        <Card bg="light">
            <Card.Header>
            </Card.Header>
            <Card.Body>
            {content}  
            <Modal show={props.openModal} onHide={() => props.controlModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Event Attendees{props.selectedEvent && props.selectedEvent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="pb-2">
                        <li style={{listStyle: 'none'}}>
                            <p className="d-inline font-weight mr-2">Event Name: {props.selectedEvent && props.selectedEvent.name}</p><br/>
                            <ul className="d-inline font-weight mr-2">Location: {props.selectedEvent && props.selectedEvent.location}</ul><br/>
                            <ul className="d-inline font-weight mr-2">Date: {props.selectedEvent && props.selectedEvent.date} </ul> <br/>
                            <ul className="d-inline font-weight mr-2">Time: {props.selectedEvent && props.selectedEvent.time}</ul><br/>
                        </li>
                    </div>                
                    <p className="font-italic">Description</p>{props.selectedEvent && props.selectedEvent.description}   
                </Modal.Body>
                <Modal.Footer>
                {props.success && <Alert variant='success'>
                        Successfully Registered!
                    </Alert>}
                <Button variant="secondary" onClick={() => props.controlModal(false)}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={(e) => { props.saveregisterEvent(e, props.selectedEvent)}}>
                     Register
                </Button>
                </Modal.Footer>
            </Modal>          
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card>
    );  
}



// events.sort(function(a, b) {
//     var keyA = new Date(a.updated_at),
//       keyB = new Date(b.updated_at);
//     // Compare the 2 dates
//     if (keyA < keyB) return -1;
//     if (keyA > keyB) return 1;
//     return 0;
//   });

//events.sort((a, b) => (a.date > b.date) ? 1 : -1)
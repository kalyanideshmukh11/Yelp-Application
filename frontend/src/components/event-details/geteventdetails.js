import React from 'react';
import { Card, Form,Row, Col, Button } from 'react-bootstrap';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import party from '../../assets/party.jpg';
import '../../App.css';
export const GetEventDetails = (props) => {
    let content;
    if(props.eventDetails && props.eventDetails.length ){   
        console.log("from props",props.eventDetails[0]) 
        let events = props.eventDetails;
        content = Object.keys(events).map((key,i) =>(
            <div>
                <Card.Header>
                    Event Info:
                </Card.Header>
                <Card.Text>
                Event Name: {(props.eventDetails && props.eventDetails.length) ? props.eventDetails[0].name : ''}
                </Card.Text>
                <Card.Text>
                Description: {(props.eventDetails && props.eventDetails.length) ? props.eventDetails[0].description : ''}
                </Card.Text>
                <Card.Text>
                Date: {(props.eventDetails && props.eventDetails.length) ? props.eventDetails[0].date: ''}
                </Card.Text>
                <Card.Text>
                Time: {(props.eventDetails && props.eventDetails.length) ? props.eventDetails[0].time: ''}
                </Card.Text>
                <Card.Text>
                    Location: {(props.eventDetails && props.eventDetails.length) ? props.eventDetails[0].location: ''}
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
            <img src={party} alt="party" height="140"/>
            <Card.Header>
            </Card.Header>
            <Card.Body>
            {content}            
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card>
    );  
}


import React from 'react';
import { Button, Card, Badge, Pagination, Row, Col, Dropdown } from 'react-bootstrap';
import PDFViewer from 'pdf-viewer-reactjs';
import party from '../../assets/party.jpg';
import '../../App.css';
export const GetEventDetails = (props) => {
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Pagination.Item key={number} active={number === props.currentPage}>
                {number}
            </Pagination.Item>
        );
    };
    const paginationBasic = (
        <div>
            <Pagination className="float-right pt-2" onClick={ props.pageChanged }>{items}</Pagination>
        </div>
        );
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
                <Button type="button" variant="link" className="p-0" href='/attendeelist'>{ props.eventDetails[i].name}</Button>
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
        <div> 
        <Card bg="light">
            <Card.Header>
            </Card.Header>
            <Card.Body>
            {content}  
            </Card.Body>
        </Card>
        {paginationBasic}
        </div>
    );  
}




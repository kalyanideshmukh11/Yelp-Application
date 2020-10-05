import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { PATH } from '../../config';
import { connect } from 'react-redux';
import { saveEvents, returnEvents, controlModal, registerEvent,saveregisterEvent } from './store/action';
import { EventSearch } from '../../components/event-search/eventsearch';
import { EventList } from '../../components/event/event';
import {EventAttendee} from '../../components/event-attendee/eventattendee'
class Event extends Component {

    filters = [];
    selectedEvent = {};
    eventsRegistered = null;

    componentDidMount() {
        this.getEvents();
    }

    getEvents = () => {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.get(PATH  + "/events/list")
        .then(res => {
            if(res.status === 200){
                if(res.data){
                    console.log(res.data)
                    this.props.saveEvents(res.data);
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
    }

    search = (event) => {
        event.preventDefault();
        let eventList = this.props.eventList.filter(eventlst => {
            return eventlst.name.includes(event.target.elements[0].value)
        });
      this.props.returnEvents(eventList);
    }


    controlModal = (action, eventList) => {
        this.props.controlModal(action);
        this.selectedEvent = eventList;
    }

    registerEvent = () => {
        this.props.registerEvent(true);
        saveregisterEvent

    }
getEventAttendee = () => {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.get(PATH + "/events/register")
        .then(res => {
            if(res.status == 200){
                    saveregisterEvent(res.data)
                    this.props.saveregisterEvent(res.data);  
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
}

updateregisterEvent = (value) => {
        let newInfo = [];
        Object.assign(newInfo, this.props.eventattendee);
        newInfo.push(value);       
        this.props.saveregisterEvent(newInfo);
}
saveregisterEvent = (event) => {
        event.preventDefault();
        console.log("jamtay ka",event.target.elements[0].value)
        const data = {
            "yelping_since": event.target.elements[0].value,            
            "things_love": event.target.elements[1].value,
            "findme_in": event.target.elements[2].value,
            "links": event.target.elements[3].value,
            "headline": event.target.elements[4].value,                     
        }

        axios.post(PATH + "/events/register", data)
        .then(res => {
            if(res.status === 200){
                localStorage.setItem('event_id', data.event_id);
                //this.changeAboutMeMode(false);
                this.getEventAttendee(data);      
            }
        })
        .catch(err=>{
            this.props.authFail(err.response.data.msg);
        })
}


    render() {
        return (            
            <Container className="mt-5 mb-5">
                <h2 class="display-4">Event Search</h2><br/>
                <div className="w-100 bg-light text-dark p-5 shadow rounded">
                <EventSearch submitHandler={this.search}></EventSearch>
                </div>
                <div className="w-100 bg-light text-dark mt-5 p-5 shadow rounded">
                <EventList eventList = { this.props.eventList } searchResults = { this.props.searchResults } selectedEvent = {this.selectedEvent} registerEvent={this.registerEvent} saveregisterEvent={this.props.saveregisterEvent} controlModal = {this.controlModal} openModal = {this.props.openModal} ></EventList>   
                </div>
                <div>
                    <EventAttendee eventattendee={this.props.eventattendee}></EventAttendee>
                </div>
            </Container>  
        )
    };              
};

const mapStateToProps = (state) => {
    return {
        eventList: state.eventSearch.eventList,
        searchResults: state.eventSearch.searchResults,
        openModal: state.eventSearch.openModal,
        success: state.eventSearch.success
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveEvents: (data) => dispatch(saveEvents(data)),
        returnEvents: (data) => dispatch(returnEvents(data)),
        controlModal: (data) => dispatch(controlModal(data)),
        registerEvent: (data) => dispatch(registerEvent(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Event);




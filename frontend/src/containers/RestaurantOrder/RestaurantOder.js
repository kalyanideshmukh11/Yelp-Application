
import React, { Component, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { PATH } from '../../config';
import { OrdersList } from '../../components/orders-list/orderslist';
import { OrderSearch } from '../../components/order-search/ordersearch';
import { saveRestaurantDetails, changeMode, enableSave } from './store/action';

class RestaurantOrder extends Component {
    constructor(){
        super();
        this.updateRestaurantDetails= this.updateRestaurantDetails.bind(this);
    }
    componentDidMount(){
        this.getRestaurantDetails();
    }
// ---------------------------------------------------------
getRestaurantDetails = () => {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
    axios.get(PATH  + "/restaurantprofile/details")
    .then(res => {
        if(res.status === 200){  
                this.props.saveRestaurantDetails(res.data);  
        }
    })
    .catch(err=>{
        //this.props.setError(err.response.data);
    })
}

updateRestaurantDetails = (value) => {
    let newDetails = {};
    Object.assign(newDetails, this.props.restaurantDetails);
    newDetails.push(value);
    this.props.saveRestaurantDetails(newDetails);
}

saveRestaurantDetails = (event) => {
    event.preventDefault();
    const data = {
        //"id": this.props.basicDetails.id,
        "email_id": event.target.elements[2].value,            
        "restaurant_name": event.target.elements[0].value,
        "restaurant_location": event.target.elements[1].value,
        "restaurant_city": event.target.elements[4].value,
        "restaurant_state": event.target.elements[5].value,
        "restaurant_country": event.target.elements[6].value,  
        "restaurant_zip": event.target.elements[7].value, 
        "restaurant_description": event.target.elements[8].value,
        "contact_info": event.target.elements[3].value,
        "timing": event.target.elements[9].value,
        "cousine": event.target.elements[10].value,
         "delivery_method": event.target.elements[11].value,
           
    }
    //Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
    axios.post(PATH + "/restaurantprofile/details", data)
    .then(res => {
        if(res.status === 200){
            localStorage.setItem('id', res.data.id);           
        }
        //this.changeMode(false)
        this.getRestaurantDetails(res.data);
        this.changeMode(false)
    })
    .catch(err=>{
        //this.props.authFail(err.response.data.msg);
    })
}
    changeMode = (event) => {
        if(event.target.innerText === 'Cancel' || event.target.innerText === 'Save'){
            this.props.changeMode(false);
        } else {
            this.props.changeMode(true);
        }
    }

    enableSave = (event) => {
        if(!event){
            this.props.enableSave(false);
        } else {
            this.props.enableSave(true);
        }        
    }
//========================================
    render(){
        // if(this.props.basicDetails && this.props.education && this.props.education.length && this.props.experience && this.props.experience.length){
            return (
                <Container className="mt-5 mb-5">                                           
                    <Row>
                        <Col sm={8} md={8} lg={8}>
                        <OrderSearch restaurantDetails={this.props.restaurantDetails} submitHandler={this.saveRestaurantDetails} modeHandler = {this.changeMode} mode = {this.props.mode}></OrderSearch><br/>
                        <OrdersList restaurantDetails={this.props.restaurantDetails} submitHandler={this.saveRestaurantDetails} modeHandler = {this.changeMode} mode = {this.props.mode}></OrdersList><br/>
                        </Col>
                    </Row>
                </Container>            
            )     
    }
}

const mapStateToProps = (state) => {
    return {
        restaurantDetails: state.restaurant.restaurantDetails,
        mode: state.restaurant.mode,
        save: state.restaurant.save,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveRestaurantDetails: (data) => dispatch(saveRestaurantDetails(data)),
        changeMode: (data) => dispatch(changeMode(data)),
        enableSave: (data) => dispatch(enableSave(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantOrder);
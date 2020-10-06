//rest details
//restaurant images
//menu details
//rest reviews

import React, { Component, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { PATH } from '../../config';
import { RestaurantDetails } from '../../components/restaurant-details/viewonly';
import{GetMenuDetails} from '../../components/menu-details/getmenudetails';
import { RestaurantImages } from '../../components/restaurant-images/restaurantimages';

import { saveRestaurantDetails, changeMode, enableSave, changeImageMode, saveRestaurantImages, saveMenuDetails,
changeMenuMode} from './store/action';

class RestaurantPage extends Component {
    constructor(){
        super();
        this.updateRestaurantDetails= this.updateRestaurantDetails.bind(this);
        this.updateMenuDetails= this.updateMenuDetails.bind(this);
    }
    componentDidMount(){
        this.getRestaurantDetails();
        this.getRestaurantImages();
        this.getMenuDetails();
    }
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
    console.log(data)
    axios.post(PATH + "/restaurantprofile/details", data)
    .then(res => {
        if(res.status === 200){
            localStorage.setItem('id', res.data.id);           
        }
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
getRestaurantImages = () => {
    //var token= 'Bearer '.concat(localStorage.getItem('token'))
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');

    axios.get(PATH + "/customerphoto/profilepic")
    .then(res => {
        if(res.status == 200){
            if(res.data){
                console.log("data received",res.data[0].photo)

                this.props.saveRestaurantImages(PATH +"/"+ res.data[0].photo);
                console.log(res.data.restaurant_image)
            }
            //this.props.saveBasicDetails({...res.data, editMode:false});
        }
    })
    .catch(err=>{
        //this.props.setError(err.response.data);
    })
}
    addRestaurantImage = (event) => {
        event.preventDefault();
        const formData = new FormData();
        const file = event.target.elements[0].files[0];
        formData.append('restaurant_image', event.target.elements[0].files[0]);
        formData.append('id', this.props.id);
        console.log("1")
        axios.post(PATH + "/customerphoto/profilepic", formData, { 
            headers: {
                'content-type':'multipart/form-data'
            }   
        })
        .then(res => {
            if(res.status === 200){
                console.log("posted")
                this.props.saveRestaurantImages(PATH + "/" + file.name);
            }
        })
        .catch(err=>{
            //this.props.authFail(err.response.data.msg);
        })
    }

    changeImageMode = (mode) => {
        this.props.changeImageMode(mode);
        }
//=============================================
getMenuDetails = () => {
    console.log("get of menu")
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
    axios.get(PATH  + "/restaurantprofile/menudetails")
    .then(res => {
        if(res.status === 200){  
            console.log("got the menu")
            console.log(res.data)
                this.props.saveMenuDetails(res.data);
                console.log(res.data)  
        }
    })
    .catch(err=>{
        //this.props.setError(err.response.data);
    })
}

updateMenuDetails = (value) => {
    let newDetails = {};
    Object.assign(newDetails, this.props.menuDetails);
    newDetails.push(value);
    this.props.saveMenuDetails(newDetails);
}

saveMenuDetails = (event) => {
    event.preventDefault();
    const data = {
        //"id": this.props.basicDetails.id,
        "name": event.target.elements[0].value,            
        "description": event.target.elements[1].value,
        "ingredients": event.target.elements[2].value,
        "category": event.target.elements[3].value,
        "price": event.target.elements[4].value,     
    }
    //Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
    axios.post(PATH + "/restaurantprofile/menudetails", data)
    .then(res => {
        if(res.status === 200){
            localStorage.setItem('id', res.data.id);           
        }
        //this.changeMode(false)
        this.getMenuDetails(res.data);
        this.changeMenuMode(false)
    })
    .catch(err=>{
        //this.props.authFail(err.response.data.msg);
    })
}
changeMenuMode = (mode) => {
    this.props.changeMenuMode(mode);
    }

//=============================================
    render(){
        // if(this.props.basicDetails && this.props.education && this.props.education.length && this.props.experience && this.props.experience.length){
            return (
                <Container className="mt-5 mb-5">                                           
                    <Row>
                        <Col sm={8} md={8} lg={8}>
                        <RestaurantDetails restaurantDetails={this.props.restaurantDetails} submitHandler={this.saveRestaurantDetails} modeHandler = {this.changeMode} mode = {this.props.mode}></RestaurantDetails><br/>
                         <GetMenuDetails menuDetails={this.props.menuDetails} menumode = {this.props.menumode}></GetMenuDetails><br/>
                        <RestaurantImages restaurantImages={this.props.restaurantImages} submitHandler={this.addRestaurantImage} changeImageMode = {this.changeImageMode} imagemode = {this.props.imagemode}></RestaurantImages><br/>
                        </Col>
                    </Row>
                </Container>            
            )     
    }
}

const mapStateToProps = (state) => {
    return {
        restaurantDetails: state.restaurant.restaurantDetails,
        restaurant_image: state.restaurant.restaurant_image,
        menuDetails: state.restaurant.menuDetails,
        mode: state.restaurant.mode,
        save: state.restaurant.save,
        imagemode: state.restaurant.imagemode,
        menumode: state.restaurant.menumode,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveRestaurantDetails: (data) => dispatch(saveRestaurantDetails(data)),
        saveMenuDetails: (data) => dispatch(saveMenuDetails(data)),
        changeMode: (data) => dispatch(changeMode(data)),
        enableSave: (data) => dispatch(enableSave(data)),
        changeImageMode: (data) => dispatch(changeImageMode(data)),
        changeMenuMode: (data) => dispatch(changeMenuMode(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);

import React, { Component, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { PATH } from '../../config';
import { OrdersList } from '../../components/orders-list/orderslist';
import { OrderSearch } from '../../components/order-search/ordersearch';
import { saveOrderDetails, changeMode, enableSave } from './store/action';

class RestaurantOrder extends Component {
    // constructor(){
    //     super();
    //     this.updateOrderDetails= this.updateOrderDetails.bind(this);
    // }
    filters = [];
    ordersearchResults = {};
    componentDidMount(){
        this.getOrderDetails();
    }
// ---------------------------------------------------------
getOrderDetails = () => {
    console.log("get of orders")
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
    axios.get(PATH  + "/orders/info")
    .then(res => {
        if(res.status === 200){ 
             console.log("got order data")
                this.props.saveOrderDetails(res.data);  
        }
    })
    .catch(err=>{
        //this.props.setError(err.response.data);
    })
}

// updateOrderDetails = (value) => {
//     let newDetails = {};
//     Object.assign(newDetails, this.props.restaurantDetails);
//     newDetails.push(value);
//     this.props.saveOrderDetails(newDetails);
// }

// saveOrderDetails = (event) => {
//     event.preventDefault();
//     const data = {
//         //"id": this.props.basicDetails.id,
//         "delivery_status": event.target.elements[0].value,            
//         "order_status": event.target.elements[1].value,          
//     }
//     //Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
//     axios.post(PATH + "/orders/status", data)
//     .then(res => {
//         if(res.status === 200){
//             localStorage.setItem('id', res.data.id);           
//         }
//         //this.changeMode(false)
//         this.getOrderDetails(res.data);
//         this.changeMode(false)
//     })
//     .catch(err=>{
//         //this.props.authFail(err.response.data.msg);
//     })
// }
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
                <h2 className="display-4">Order Search</h2><br/>                                         
                    <Row>
                        <Col sm={8} md={8} lg={8}>
                            <OrderSearch></OrderSearch>
                       </Col>
                    </Row>
                </Container>            
            )     
    }
}

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderSearch.orderDetails,
        mode: state.orderSearch.mode,
        save: state.orderSearch.save,
        ordersearchResults: state.orderSearch.ordersearchResults,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveOrderDetails: (data) => dispatch(saveOrderDetails(data)),
        changeMode: (data) => dispatch(changeMode(data)),
        enableSave: (data) => dispatch(enableSave(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantOrder);

//<OrdersList orderDetails={this.orderDetails} submitHandler={this.saveOrderDetails} modeHandler = {this.changeMode} mode = {this.props.mode}></OrdersList><br/>
                        
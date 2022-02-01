import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {Button} from '@mui/material';
import AuthService from "../services/auth.services";
import AppContext  from '../AppContext'
import { displayMsg } from '../subscribe';

import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import styleded from "styled-components";
import {toast} from 'react-toastify';
import Popup from "./Popup";
import Dialog from "./Dialog";

import 'react-toastify/dist/ReactToastify.css';
import "./cartcomponent.css";
import { letterSpacing } from "@mui/system";

toast.configure()
let checkOutClick = true;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: 15,
  },

}));

export default class Cart extends Component{
  static contextType = AppContext;
    constructor(props) {
        super(props);
    
        this.state = {
          redirect: null,
          userReady: false,
          currentCart: [] ,
          currentUser: { username: "" },
          incrementCounter: 0,
          decrementCounter: 0,
          totalQty: 0,
          totalPrice: 0,
          productInCart: [],
          prod: {},
          isLoading: true,
          checkOutClick:true,
          orderId:null,
        };
        
}
state = {
  isOpen: false,
};
 async checkOut (event, currentCart){
  console.log("Current cart before checkout "+currentCart);
  //let cartName ={id:currentCart.cartName.id};
  //let products ={productId:currentCart.products.productId};
 // let productQuantities = {}
 console.log("calling checkout"+JSON.stringify(currentCart));
    localStorage.setItem("cartItem", []);
    console.log("local storage after checkout"+localStorage.getItem("cartItem"));
    const response = await axios.post("http://localhost:8087/cart/" + "checkOut",currentCart)
    console.log("the order id "+JSON.stringify(response.data));
      if(response){
        localStorage.setItem("cartItem", []);
        //localStorage.removeItem("cartItem");
        //console.log("the order id "+JSON.stringify(response.data));
        
        localStorage.setItem("order", JSON.stringify(response.data));
        let orderCart = JSON.parse(localStorage.getItem("order"));
        if(orderCart){
          orderCart.map((data) => ( 
          console.log("Orderid in cart is"+data.orderId)
          ))}
      }

// const res = AuthService.checkOutCart(currentCart);
  
  //let arr= JSON.parse(localStorage.getItem('cartItem'));
 // let order = JSON.parse(localStorage.getItem('order'));
  this.setState({  currentCart: [],checkOutClick:false,totalQty:0,totalPrice:0});
  console.log("Forcing update");
  //this.forceUpdate();     
 
}



async componentDidMount()
{   const currentUser = AuthService.getCurrentUser();
    
    const { totalPrice } = this.state;
    
    
   
    //const response = await fetch('http://localhost:8082/api/auth/user/'+currentUser.id);
    //const currentCart = await response.json();
    let finalQty = 0;
    let finalPrice = 0;
    let localCart=[],prodInCart;
    if(localStorage.getItem('cartItem')){
     localCart = JSON.parse(localStorage.getItem('cartItem'));}
    
   console.log("localcart in cart"+JSON.stringify(localCart))
if(localCart){
   localCart.map((data) => ( 
      console.log("hi in comp"+data.productQuantities),
      finalQty = finalQty +data.productQuantities,
    finalPrice = finalPrice + data.productQuantities*data.products.productPrice
    //this.setState({productInCart: this.state.productInCart.concat(data), totalQty : this.state.totalQty+data.productQuantities, totalPrice: this.state.totalPrice+data.productQuantities*data.products.productPrice})
    
    ))}

    this.setState({currentCart: localCart,isLoading: false,userReady: true, totalQty:finalQty, currentUser: currentUser, totalQty : finalQty, totalPrice: finalPrice,checkOutClick:true})
    let i=0;
    //console.log("local storage in cart cart items"+currentCart);
    console.log("totalQty in cart "+finalQty);
    this.forceUpdate()
    //console.log("data "+this.state.totalQty);
  }

   

  onQuantityChange = (event, productId,productPrice,flag) => {
    

    let newCart =[];
    let arr = this.state.currentCart;
    const changedQuanitity = arr.map((data) => {
      console.log("Inside onQuantityChange "+productId+" data.id "+data.products.productId+"flag "+flag);
        if (data.products.productId === productId) {

          if(flag){
          data.productQuantities = data.productQuantities + 1;
          this.setState({totalQty : this.state.totalQty + 1, totalPrice: this.state.totalPrice+productPrice})
          AuthService.updateCart(data.cartId,data.cartname, data.products,data.productQuantities)
        }
          else 
          {if(data.productQuantities > 0){
            console.log("new product added with product id"+data.products.productId+"and product id"+productId)
          data.productQuantities = data.productQuantities - 1;
          this.setState({totalQty : this.state.totalQty - 1, totalPrice: this.state.totalPrice-productPrice})
          AuthService.updateCart(data.cartId,data.cartname, data.products,data.productQuantities)
          if(data.productQuantities == 0){
            newCart = arr.filter(function(data){
              return data.productQuantities!= 0
            });
            arr = newCart;
          }
        }
      }
          console.log("productQuantities " +data.productQuantities);
         // setQuantity(quantity);
          console.log("Cart after removing"+JSON.stringify(arr));
         localStorage.setItem('cartItem',JSON.stringify(arr));
         this.setState({  currentCart: arr });
            
        }
        return data;
    });
    //console.log("new cart "+JSON.stringify(newCart));
    
}
   
    render(){
      const { currentCart,checkOutClick,orderId } = this.state;
      const { currentUser } = this.state;
      let finalQty=0;
      let finalPrice = 0;
      const notify=()=>{
        <Popup/>
        displayMsg();
        toast.info("sample notification")
      
      }
    console.log("localcart in cart "+localStorage.getItem('cartItem'))
    if(localStorage.getItem('cartItem')){
    let localCart = JSON.parse(localStorage.getItem('cartItem'));
    if(localCart){
    localCart.map((data) => ( 
      //console.log("hi in render"+JSON.parse(localStorage.getItem('cartItem'))),
      
      finalQty = finalQty +data.productQuantities,
    finalPrice = finalPrice + data.productQuantities*data.products.productPrice
    //this.setState({productInCart: this.state.productInCart.concat(data), totalQty : this.state.totalQty+data.productQuantities, totalPrice: this.state.totalPrice+data.productQuantities*data.products.productPrice})
    
    ))}} 
    let orderCart=[];
    if(localStorage.getItem('order')){
      orderCart = JSON.parse(localStorage.getItem("order"));
      
    }
      const {  quantity,setQuantity} = this.context;
      console.log("quantity in cart did mount "+quantity);
      setQuantity(this.state.totalQty);
      console.log("quantity new in cart did mount "+quantity);
      //console.log("onchange new total qty "+this.state.totalQty);
     
      
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }

const { incrementCounter } = this.state;
const { decrementCounter } = this.state;
const { counter } = this.state;
const { prod } = this.state;
const { productInCart } = this.state;

    return (
      <>
      <header>
      <Link to={"/home"}>
      <div className="continue-shopping">
      <img src="./images/arrow.png" alt="arrow" className="arrow-icon" />
            <h3>Continue Shopping</h3>
          </div></Link>
          <div className="cart-icon">
          <Link to={"/cart"}>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={this.state.totalQty} color="primary">
                <ShoppingCartIcon sx={{ fontSize: 27 }} />
              </StyledBadge>
            </IconButton>
          </Link>
          </div>

          <div className="Jumbotron">
            <h3>
              <b>
                <span>{currentUser.username}</span>'s Shopping Cart
              </b>
            </h3>
          </div>
          </header>
          <section className="main-cart-section">
          <div className="cont">
        {this.state.userReady ? (
        <div>
          
          
          <h4>
          {false && <div className="Notification" onClick={notify}>Click me</div>}
          </h4>
          <Dialog
                    isOpen={this.state.isOpen}
                    onClose={(event) => this.setState({ isOpen: false })}
                  >
                    {orderCart && 
            orderCart.map((data) => ( 
            console.log("Orderid in cart is"+data.orderId),
            <center><h3>Orderid in cart is{data.orderId}</h3></center>
            ))}
                  </Dialog>
        <div>
          {currentCart.length === 0 ? 
          (<div class="card-body cart">
          <div class="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3"/>
              <h3><strong>Your Cart is Empty</strong></h3>
              <h4>Add something to make me happy </h4> 
          </div>
      </div>
          ):(<div>
            <h4>
                  <strong>Product</strong></h4></div>
          )}

          
      <ul >
      
      {
       // currentCart.map(({cartName, products, productQuantities, billAmount}, i) => (
         // productInCart.map((products) => ( 
          currentCart.map((data) => (
           
          <li key={data.products.productId} >
            <div className="nav-link">
          <ProductWrapper>  
          
        <div className="row product img-container">
        
        <div className="col-md-2 product-detail">{data.products.productName}</div>
        <div className="col-md-2 card-img-top">
        <img src={data.products.productImage} alt={data.products.productName} height="150" />
      </div>
        <div className="col-md-2 product-detail">{data.products.productType}</div>
        <div className="col-md-1  mb-0 product-detail">{data.products.productPrice}</div>
        
        <div className ="product-detail" ><Button className="col-md-2 " style={{height: '30px', width : '30px',fontSize: 12}} size='small' disableElevation variant='contained' onClick={(event) => this.onQuantityChange(event, data.products.productId,data.products.productPrice,false)}> -1</Button></div>
        <div className ="product-detail"><Display className="col-md-2 " message={data.productQuantities}/> </div>
       <div className ="product-detail"> <Button className="col-md-2 " style={{height: '30px', width : '10px',fontSize: 12}} size='small' disableElevation variant='contained' onClick={(event) => this.onQuantityChange(event, data.products.productId,data.products.productPrice,true)}> +1</Button></div>
       
        </div></ProductWrapper></div>
        
        </li>
          
        ))}
      
        
        </ul>
        
        </div>
        
    </div>
        ): null}
     
     <div className="card-total">
              <h3>
                Cart Total : <span>${this.state.totalPrice}</span>
              </h3>
              {currentCart.length != 0 && <button style={{ width : '163.28px'}} onClick={(e)=> {this.checkOut(e,currentCart);this.setState({ isOpen: true });}}>Checkout</button>}
              {false && currentCart.length != 0 &&<button className="clear-cart" style={{width:'163.28px'}}>Clear Cart</button>}
            </div>
          </div>
        </section> 
        </> 
    );
  }
}

const ProductWrapper = styleded.section`
.card {
  border-color: transparent;
  transition: all 1s linear;
}
.card-footer {
  background: transparent;
  border-top: transparent;
  transition: all 1s linear;
}
&:hover {
  .card {
    border: 0.04rem solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  }
  .card-footer {
    background: rgba(247, 247, 247);
  }
}
.img-container {
  position: relative;
  overflow: hidden;
}
.card-img-top {
  transition: all 1s linear;
}
.cart-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.2rem 0.4rem;
  background: var(--lightBlue);
  border: none;
  color: #6495ed;
  font-size: 1.4rem;
  border-radius: 0.5rem 0 0 0;
  transform: translate(100%, 100%);
  transition: all 1s ease-in-out;
}
.img-container:hover .card-img-top {
  transform: scale(1.2);
}
.img-container:hover .cart-btn {
  transform: translate(0, 0);
}
.cart-btn:hover {
  color: #6495ed;
  cursor: pointer;
}
`;
function Display(props) {
  return (
    <label style={{ marginLeft: '.5rem'}} >{props.message}</label>
  )
}

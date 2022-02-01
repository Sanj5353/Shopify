import React, { Component, useState, useContext, useCallback} from "react";
import { Redirect } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import { ReactiveBase } from '@appbaseio/reactivesearch';

import {Button} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import styleded from "styled-components";

import AuthService from "../services/auth.services";
import { Switch, Route, Link } from "react-router-dom";
import AppContext  from '../AppContext';
import Footer from "./Footer";

import Dialog from './Dialog';
import {SearchBox} from 'sr-lib';

//import SearchBox from "./SearchBox";

//import {intialAppContext} from '../App'
//import Product from "./Product";



/*const list = [];

  function addToCart(username, products, productQuantities) {
    AuthService.addToCart(username, products,productQuantities)
    }*/

    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        fontSize: 15,
      },
    
    }));    
    

export default class Profile extends Component {

  static contextType = AppContext;
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      prods: [],
      productListState:[],
      productSelected:{},
      totalItemsIncart:[],
      searchField: '',
      totalQty: 0,
      checkOutClick:true,
      page: 0,
      
    };
    
    
  }
  state = {
    isOpen: false,
  };
  
  

  handleAddProduct(username, products, productQuantities) {
    alert("Product selected to add to cart");
    AuthService.addToCart(username, products,productQuantities)
    
  }

  addToCart = (event, product,username,productQuantities) => {
    const {  quantity,setQuantity} = this.context;
    event.preventDefault();
    let newlyAddedCart = {};
    let cartName ={id:""};
    let arr = [];
    arr = this.state.prods;
    const prodArray = this.state.productListState;
    let checkFlag = false;
    console.log("enter menthod"+this.state.prods);
    arr.forEach((data) => {
      if (data.products.productId === product.productId) {
        
        data.productQuantities = ++productQuantities;
        AuthService.updateCart(data.cartId,cartName, product,data.productQuantities)
        console.log("Quantity increaed for existing");
        localStorage.setItem("cartItem",JSON.stringify(arr));
        
        this.setState({ prods: arr });
        return checkFlag = true;
        //checkFlag = true;
    }
    });
    if (arr.length === 0 || !checkFlag) {
      //prodArray.forEach((data) => {
      //  if (data.productId === product.productId) {
          cartName.id = username;
      
      const check = AuthService.addToCart(cartName, product,1)
      console.log("check for sathiyamoorthi"+JSON.stringify(check));
    //  newlyAddedCart = JSON.parse(localStorage.getItem('cart'));
      //newlyAddedCart = AuthService.getCartItemAdded();
     
    //  console.log("Quantity increaed for new"+JSON.stringify(newlyAddedCart));
    //  arr.push(newlyAddedCart);
      
  }
  this.setState({totalQty : this.state.totalQty + 1})
  setQuantity(quantity+1);
   // localStorage.setItem("cartItem",JSON.stringify(arr));
  //  console.log("current cart in app js component"+localStorage.getItem('cartItem'));
   // this.setState({ prods: arr });
}

handleCallback = (searchResult) =>{
  console.log("Search result in parent "+JSON.stringify(searchResult))
  this.setState({productListState: searchResult})
}

handleOnChange = async (e) => {
  this.setState({searchField:e.target.value})
  console.log("on click new")
  let productName = e.target.value;
  console.log("on click button"+productName.length)
  if(productName.length>0){
  const response = await fetch('http://localhost:8081/inventory/product/findByProductName/'+productName+'?page='+this.state.page);
  const currentCart = await response.json();
 console.log("onsearch"+JSON.stringify(currentCart));
 this.setState({productListState:currentCart})}
 else{
//  const elasticCart = AuthService.getElasticProduct();
 // this.setState({productListState:elasticCart})}
  const response = await fetch('http://localhost:8081/inventory/product/all?page='+this.state.page);
  const currentCart = await response.json();
 //console.log("onsearch"+JSON.stringify(currentCart));
 this.setState({productListState:currentCart})}

}
handleOnChangePage = async (event, value) => {
  console.log("Page clicked is"+value);
  let page = value-1;
  const response = await fetch('http://localhost:8081/inventory/product/all?page='+page);
  const productList = await response.json();
// return axios.get(API_URL_PRODUCT + "all?"+page).then((response) => { 
 //   console.log("service products " + JSON.stringify(response.data) ) ;productListState 
    localStorage.setItem("productList", JSON.stringify(response.data));
    this.setState({page:page, productListState:productList})
    return JSON.stringify(response.data);
   // });
}
 handleOnSearchClick = async () => {
  //console.log("on click")
  //const elasticCart = AuthService.getElasticProduct();
  //this.setState({productListState:elasticCart})
  let productName = this.state.searchField;
  console.log("on click button")
  const response = await fetch('http://localhost:8081/inventory/product/findByProductName/'+productName+'?page='+this.state.page);
  const currentCart = await response.json();
 console.log("onsearch"+JSON.stringify(currentCart));
  this.setState({productListState:currentCart})
}


  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const productList = AuthService.getProductCart();
    const cart = AuthService.getCurrentCart();
    

    //console.log("cart in comp in profile"+productList);
    //this.context.quantity
   // let itemsFromCart = this.props.totalItems
   // console.log("itemsFromCart in profile "+JSON.stringify(this.props));
    
    let total = 0;
    if(cart){
    cart.map((data) => ( 
      total = total+data.productQuantities
      
      ))}
      //this.setState({ totalQty : total})
      //this.setState({ totalQty : 8})
      //console.log("totalQty in profile "+this.state.totalQty)
      
   // this.context.quantity = this.state.totalQty;
    //console.log("currentUser "+JSON.stringify(currentUser.cartItems));
     
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true, prods: cart,productListState:productList,totalQty : total})
    this.forceUpdate()
    //console.log("prods in profile "+this.state.prods)
  }

  render() {
   // const quantity = this.context;
  //  console.log("quantity in profile did mount "+ JSON.stringify(this.context));
   // let cartQuantity = this.props.quantity;
  //  console.log("cartQty in profile "+ cartQuantity);
  const {quantity, setQuantity} = this.context;
  console.log("intialAppContext setQuantity "+setQuantity+" quantity "+quantity);
  //setQuantity(7);

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    let filteredList=[];
    const { currentUser, productListState,searchField} = this.state;
    //console.log("productlist "+JSON.stringify(productListState))
    if(productListState){
     filteredList = productListState.filter(product => (
      product.productName.toLowerCase().includes(searchField.toLowerCase())
    ))}
    //console.log({currentUser.username});
    return (
      
      <div className="cont">
        {(this.state.userReady) ? 
        <div >
          <div className="cart-icon">
            
          <Link to={"/cart"}>
                <IconButton aria-label="cart" >

                  <StyledBadge badgeContent={quantity} color="primary">

                  <ShoppingCartIcon sx={{ fontSize: 27 }}/>

                  </StyledBadge>

                  </IconButton>
                 

                 </Link></div>
       
        <div className="prodSearch"> <strong>Product Search</strong> &nbsp;</div>
        <div> &nbsp;</div>
      <ul >
      <SearchBox placeholder = "Enter Mobile Name.."  handleChange={(e)=> this.handleOnChange(e)  } />
     
      {filteredList?.map((product) => (
          <li key={product.productId} >
            <div >
            <ProductWrapper>
      <Link to={{pathname:"/product", product:product}} className="nav-link">
      <div className="row product img-container">
      <div className="col-md-2 card-img-top">
        <img src={product.productImage} alt={product.productName} height="150" />
      </div>
        <div className="col-md-2 product-detail">{product.productName}</div>
        
        <div className="col-md-2 product-detail">{product.productType}</div>
        <div className="col-md-2 font-italic mb-0 product-detail">{product.productPrice}</div>
        <div className="col-md-1 cart-btn" ><button onClick={(event) => {this.addToCart(event,product,currentUser.id,1);this.setState({ isOpen: true });
                              }} ><AddShoppingCartIcon style={{width: "20", height: "20" }}/></button></div>
        
        </div></Link></ProductWrapper>     
    </div>
    <Dialog
                    isOpen={this.state.isOpen}
                    onClose={(event) => this.setState({ isOpen: false })}
                  >
                   <center> <h3>Product has been added successfully!!!</h3></center> 
                  </Dialog>
    </li>
          
        )
        
        )}
        
      </ul>
      
      </div>: null}
      <Pagination count={2} size="large" variant="outlined" shape="rounded" page={this.page} onChange={this.handleOnChangePage}/>
      </div>
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
//Profile.contextType = AppContext;

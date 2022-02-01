import React from 'react';
import { Switch, Redirect, Link, useLocation } from "react-router-dom";
//import './App.css';
//import Colors from './components/Colors'
//import DetailsThumb from './components/DetailsThumb';

import AuthService from "../services/auth.services";
import AppContext  from '../AppContext'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import styleded from "styled-components";
import Footer from './Footer';
import "./productpage.component.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: 15,
  },

}));    

class ProductPage extends React.Component{
  static contextType = AppContext;
  state = {
    redirect: null,
      userReady: false,
      currentUser: { username: "" },
      prods: [],
    products: {},
    index: 0,
    totalQty:0,
  };

  myRef = React.createRef();

  /*handleTab = index =>{
    this.setState({index: index})
    const images = this.myRef.current.children;
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };*/

  addToCart = (event, product,username,productQuantities) => {
    const {  quantity,setQuantity} = this.context;
    event.preventDefault();
    let newlyAddedCart = {};
    let cartname ={id:""};
    const arr = this.state.prods;
    let checkFlag = false;
    console.log("enter method product"+product.productId+username+productQuantities);
    arr.forEach((data) => {
        if (data.products.productId === product.productId) {
            data.productQuantities = ++productQuantities;
            AuthService.updateCart(data.cartId,cartname, product,data.productQuantities)
            console.log("Quantity increaed for existing");
            localStorage.setItem("cartItem",JSON.stringify(arr));
            this.setState({ prods: arr });
            return checkFlag = true;
        }
    });
    if (arr.length === 0 || !checkFlag) {
      cartname.id = username;
      AuthService.addToCart(cartname, product,1)
     // newlyAddedCart = JSON.parse(localStorage.getItem('cart'));
     
      console.log("Quantity increaed for new"+newlyAddedCart);
     // arr.push(newlyAddedCart);
    }
    this.setState({totalQty : this.state.totalQty + 1})
    setQuantity(quantity+1);
   // localStorage.setItem('cartItem',JSON.stringify(arr));
    //console.log("current cart in app js component"+localStorage.getItem('cartItem'));
   // this.setState({ prods: arr });
}

  componentDidMount(){
    const {index} = this.state;
    let location = this.props.history.location.product;
    console.log("product page name "+JSON.stringify(location))
    const currentUser = AuthService.getCurrentUser();
    const cart = AuthService.getCurrentCart();
    const productList = AuthService.getProductCart();

    let total = 0;
    if(cart){
    cart.map((data) => ( 
      total = total+data.productQuantities
      
      ))}
      this.setState({ totalQty : total})
   // this.myRef.current.children[index].className = "active";
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true, prods: cart,products:location})
  }


  render(){
    const {quantity, setQuantity} = this.context;
    const {products, index} = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    //console.log({currentUser.username});
    return (
      
      <>
        {(this.state.userReady) ?
        <div >
          <div className="cart-icon">
          <Link to={"/cart"}>
                <IconButton aria-label="cart">

                  <StyledBadge badgeContent={this.state.totalQty} color="primary">

                  <ShoppingCartIcon sx={{ fontSize: 27 }}/>

                  </StyledBadge>

                  </IconButton>
                 

                 </Link>
       </div>
             {/* <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>*/}
        <div className="app">
        
        <div className="details " key={products.productId}>
              <div className="big-img">
              <img src={products.productImage} alt={products.productName} height="150" />
              </div>

              <div className="box">
                <div className="row ">
                <h1>{products.productName}</h1>
                    <h3><span>${products.productPrice}</span></h3>
                </div>
                

                <h3>{products.productType}</h3>
                <br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
                  <h4>
                    Welcome to our Shopify App. Here we are displaying the {products.productName+" "}
                    phone. We have the latest Model of {products.productName}, with all the new features,
                    at a very low price. It's time to add this to your cart and shop away.
                  </h4>

                
                <button className="cart" onClick={(event) => this.addToCart(event,products,currentUser.id,1)}>Add to cart</button>

              </div>
            </div>

        
        </div>
        
        
        
        
        </div>: null}</>
    );
  };
}

const ProductWrapper = styleded.section`
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
.img-container:hover .card-img-top {
  transform: scale(1.2);
}
`;
export default ProductPage;

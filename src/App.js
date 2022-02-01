import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu } from "./components/NavbarElements";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.services";

import Login from "./components/login";
import Signup from "./components/signup";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { unsubscribe } from './subscribe';

import Home from "./components/home.component";
import Profile from "./components/profile.component";

import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import Cart from "./components/cart.component";
import ProductPage from "./components/productpage.component";
import AppContext, { AppProvider , intialAppContext}   from './AppContext';
import EventBus from "./common/EventBus";
import Footer from "./components/Footer";
//import NotificationHandler from "./notificationHandler";
import {toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


toast.configure()


// import AuthVerify from "./common/auth-verify";

//import DetailsProductPage from "./components/DetailsProductPage"


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },

}));

var isSubscribed = false;

//export const AppContext = React.createContext(intialAppContext);

//export const AppProvider = AppContext.Provider;
//export const AppConsumer = AppContext.Consumer;

class App extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      totalQty:0,
      totalItems:[],
      currentCart:[]
     
    };

    

    
  }
   componentDidMount() { 
    const user = AuthService.getCurrentUser();
    const cart = AuthService.getCurrentCart();
    const productList = AuthService.getProductCart();
    console.log("notification from local" + localStorage.getItem("notification"));
    //this.jQueryCode();
    
    
    const {totalQty } = this.state;

    let q=0;
    
     
    console.log("user"+JSON.stringify(user));
    console.log("cart"+JSON.stringify(cart));

    if (user && cart) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        currentCart: cart
      });
      cart.map((data) => ( 
        q=q+data.productQuantities
       
       ))
      this.setState({totalQty: q,totalItems:cart})
      console.log("totalQty in cpom "+this.state.totalQty)
      console.log("product items from new service "+JSON.stringify(productList));
      //console.log("user cart items in app js component"+JSON.stringify(user.cartItems));
      //localStorage.setItem("cartItem",JSON.stringify(user.cartItems));
     // console.log("current cart in app js component"+JSON.stringify(localStorage.getItem('cartItem')));
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
     
      showAdminBoard: false,
      currentUser: undefined,
      totalItems:[],
      currentCart:[]
    });
    
   // unsubscribe();
  }
  
  

  render() {
    const { currentUser,currentCart, showAdminBoard,totalQty,totalItems} = this.state;
    const { quantity, setQuantity, setTotalItemsIncart} = this.context;
    /*const notify=()=>{
      Subscribe.subscribe();
     // const check = 
     // console.log();
      toast.info("sample notification")
    
    }*/
    if (currentUser) {
    setQuantity(totalQty);
    setTotalItemsIncart(currentCart);
    const {totalItemsIncart} = this.context;
    console.log("context quantity in app js "+quantity +"setTotalItemsIncart"+totalItemsIncart);
  
  }
   
    //const quantity = totalQty;
    //this.setState({quantity: totalQty })
    //console.log("context quantity in app js"+this.context.quantity+" "+this.state.quantity);
    //const { setQuantity } = this;
   // console.log("Cart items in render "+JSON.stringify(currentUser.cartItems))
   
   

    return (
      <>
        <AppProvider value={{
          
          intialAppContext,
          //setQuantity: this.setQuantity
          
      }}>
          {this.props.children},
          
      </AppProvider >
      <Router>
          <Nav>
            <NavMenu>
              <NavLink to="/" activeStyle>
                Shopify
              </NavLink>
              {currentUser && (<NavLink to="/home" activeStyle>
                Home
              </NavLink>)}
              {showAdminBoard && (
                <NavLink to="/admin" activeStyle>
                  Admin Board
                </NavLink>
              )}
              {currentUser && (
                <NavLink to="/user" activeStyle>
                  User
                </NavLink>
              )}

              {currentUser ? (
                <div className="navbar-nav ml-auto footCheck">
                  <ul>
                    <li className="nav-item4">
                      <div className="userProfile">
                        {currentUser.username}
                        </div>
                    </li>
                    <li className="nav-item3">
                      <NavLink to="/login" activeStyle onClick={this.logOut}>
                       Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  
                      <NavLink to={"/login"} className="nav-item1" activeStyle >
                        SignIn
                      </NavLink>
                    
                      <NavLink to={"/register"} className="nav-item2" activeStyle >
                        SignUp
                      </NavLink>
                    
                 
                </>
              )}
            </NavMenu>
          </Nav>
          <Switch>
            <Route exact path={["/", "/start"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/home" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/cart" component={Cart} />
            <Route path="/product" component={ProductPage} />
          </Switch>
        </Router>
      <Footer/>
      </>
    );
  }
}

export default App;

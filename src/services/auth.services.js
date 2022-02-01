import axios from "axios";
//import { subscribeUser } from '../subscribe';
//import * as serviceWorker from "../serviceWorker.js"

const API_KAFKA_URL = 'http://localhost:8088/push/';
const API_URL = "http://localhost:8082/api/auth/";
const API_URL_CART = "http://localhost:8087/cart/";
const API_URL_PRODUCT = "http://localhost:8081/inventory/product/";
//const API_URL_REPORT = 


var applicationServerPublicKey = 'BNtVHIU0jcdYoUCrv9TqphnnTUPg30d59GzFqbvRO_J85N0ox0uefTJgd-aa_5X4LRLxyfOH5JkTplStA1SiGeM';

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
         console.log("auyh service "+JSON.stringify(response.data))
         this.getProductList(0);
         this.getElasticProductList(0);
          this.getCartItems(response.data.id);
          //serviceWorker.register();
         // subscribeUser();
        }
        
        return response.data;
      });
  }

  logout() {
    window.localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("cartItem");
    localStorage.removeItem("productList");
    localStorage.removeItem("cart");

  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  getCurrentCart() {
    if(localStorage.getItem('cartItem'))
    return JSON.parse(localStorage.getItem('cartItem'));
    else
    return [];
  }
  getProductCart() {
    return JSON.parse(localStorage.getItem('productList'));
  }
  getElasticProduct() {
    return JSON.parse(localStorage.getItem('productElasticList'));
  }
  setNotification(message){
    console.log("message"+message)
    localStorage.setItem("notification",message)
  }
  getCartItemAdded(){
    return JSON.parse(localStorage.getItem('cart'));
  }

  

  async getCartItems(usrerId) {
console.log("calling get cart items");
    //const response = await fetch('http://localhost:8082/api/auth/user/'+usrerId);
    //const currentCart = await response.json();
    //console.log("service "+response.json());
    //return currentCart;

   // const result = await fetch(API_URL + "user/"+usrerId);
   //   console.log("service " + await result.json);
    return axios.get(API_URL_CART + "user/"+usrerId).then((response) => { 
      console.log("service " + JSON.stringify(response.data) ) ; 
      localStorage.setItem("cartItem", JSON.stringify(response.data));
      return JSON.stringify(response.data);
      });
      
  }

  async getProductList(page) {

    
    return axios.get(API_URL_PRODUCT + "all?"+page).then((response) => { 
      console.log("service products " + JSON.stringify(response.data) ) ; 
      localStorage.setItem("productList", JSON.stringify(response.data));
      return JSON.stringify(response.data);
      });
      
  }

  async getElasticProductList(page) {

    
    return axios.get(API_URL_PRODUCT + "all?"+page).then((response) => { 
      console.log("service products " + JSON.stringify(response.data) ) ; 
      localStorage.setItem("productElasticList", JSON.stringify(response.data));
      return JSON.stringify(response.data);
      });
      
  }

 /* getProductList() {
    axios.get(API_URL + "productCheckout").then((response) => {const posts = response.data
    console.log(posts)})
  }*/

   async addToCart(cartName, products, productQuantities) {
    console.log(JSON.stringify(cartName));
    
    const res = await axios
      .post(API_URL_CART + "cart", {
        cartName,
        products,
        productQuantities
      })
      .then(response => {
        if (response.data) {
          console.log(JSON.stringify(response.data));
          localStorage.setItem('cart', JSON.stringify(response.data));
          let arr = this.getCurrentCart();
          arr.push(JSON.parse(localStorage.getItem('cart')));
          localStorage.setItem("cartItem",JSON.stringify(arr));
        }

        return response.data;
      });
      //console.log(JSON.stringify(res.data));
      //localStorage.setItem("cart", JSON.stringify(res.data));

  }

  updateCart(cartId,cartName, products, productQuantities) {
    console.log(JSON.stringify(cartName));
    return axios
      .patch(API_URL_CART + "Update", {
        cartId,
        cartName,
        products,
        productQuantities
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("cart", JSON.stringify(response.data));
          console.log(JSON.stringify(response.data));
        }

        return response.data;
      });
  }

    async checkOutCart(currentCart) {
    console.log("calling checkout"+JSON.stringify(currentCart));
    localStorage.setItem("cartItem", []);
    console.log("local storage after checkout"+localStorage.getItem("cartItem"));
    const response = await axios.post(API_URL_CART + "checkOut",currentCart)
    //.then(response=> {
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
          return response.data;
        
        //this.getCartItems(localStorage.getItem('user').id);
      }
      
   // });
  }

  subscribe() {
    
  }

  //getCartProducts
}

export default new AuthService();

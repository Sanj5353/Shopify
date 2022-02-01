import React, { useState, useContext, useCallback, useSelector } from 'react';
import { Switch, Route, Link } from "react-router-dom";




export default function Product(props) {

//useSelector(state => state.addToCart || "")
//const [count, addToCart] = useState(0);
//const {addToCart}  = useContext(AppContext);
const {product} = props;

  return (
    <div>
      <Link to={"/profile"} className="nav-link">
      <div className="row product">
        <div className="col-md-2 product-detail">{product.productName}</div>
        <div className="col-md-2">
        <img src={product.productImage} alt={product.productName} height="150" />
      </div>
        <div className="col-md-2 product-detail">{product.productType}</div>
        <div className="col-md-2 product-price">{product.productPrice}</div>
        <div className="col-md-2 product-price" ><button  >Add</button></div>
        
        </div></Link>
    </div>
  )
}

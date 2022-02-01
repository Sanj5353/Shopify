import React from 'react'
/*export const intialCartContext = {
    isAuthenticated: false,
    books: [],
    makeupList: [],
    addProductToCart: [],
    quantity: 8,
  
  }*/

  export const intialAppContext = {
    quantity: 0,
    totalItemsIncart:0,
    setQuantity:(qty)=> {intialAppContext.quantity = qty},
    setTotalItemsIncart: (items) => { intialAppContext.totalItemsIncart = items },
    /*get setTotalItemsIncart() {
        return this.setTotalItemsIncart
    },
    set setTotalItemsIncart(value) {
        this.setTotalItemsIncart = value
    },*/
    
  }

const AppContext = React.createContext(intialAppContext)

  export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer

export default AppContext

 /* export default function AppContextProvider {
    state = {
        quantity: 0,
        totalItemsIncart:0,
        setQuantity:(qty)=> {intialAppContext.quantity = qty}
        
    };
    

   /* addToCart = (event, product) => {
        event.preventDefault();
        const arr = this.state.prods;
        let checkFlag = false;
        console.log("enter menthod");
        arr.forEach((data) => {
            if (data.products.productId === product.productId) {
                data.productQuantities = ++data.productQuantities;
                console.log("Quantity increaed for existing");
                return checkFlag = true;
            }
        });
        if (arr.length === 0 || !checkFlag) {
            arr.push(product);
            console.log("Quantity increaed for new");
        }
        this.setState({ prods: arr });
    }
    render() {
        const quantity =9;
        return (
            
    <AppContext.Provider value={{
        quantity
        
        //..addToCart: this.addToCart
        //removeFromCart: this.removeFromCart,
    }}>
        {this.props.children}
    </AppContext.Provider >

    )
}

}*/

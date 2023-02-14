import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



function Products(props){
    
    return(
        <div className="product-container" >
            <div className="img-container">
                <img src={props.data.image} alt={props.data.product}></img>
            </div>

            <div>
                <h3>{props.data.product}</h3>
            </div>
            <div>
                <h4 style={{color: "white"}}>
                    Price:{props.data.price}
                </h4>
            </div>

            <div style={{marginTop: 10}}>
                <Link style={{color: "white"}} to="/product" state={props.data}>More....</Link>
            </div>
        </div>
    )
}


export default Products;
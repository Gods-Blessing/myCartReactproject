import React, { useEffect, useState } from "react";
import Products from "./Products/Products";
import Navbar from "../navbar/Navbar";


const Main = ()=>{
    const [list, setList] = useState([]);
    useEffect(()=>{
        document.title = "Home";

        async function getdata(){
            const ans = await fetch("https://my-json-server.typicode.com/Gods-Blessing/gods-blessings/products");
            const answer =await ans.json();
            const arr = [...answer];
            // console.log(arr);
            setList([...arr]);
        }

        getdata();

    }, []);
    return(
    <>
        <Navbar/>
        
        <div className="main-product-container">
            {/* rendering the all the products on the page and passingthe data as props */}
            {list.map((data)=><Products key={data.id} data={data}/>)}
        </div>
    </>
    )
}

export default Main;
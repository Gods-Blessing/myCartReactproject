import React,{useEffect, useState} from "react"
import { useSelector,useDispatch } from "react-redux";
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { db } from "../../firestore";
import { Link } from "react-router-dom";
import { themechange } from "../../reducers/themeReducer";

const Navbar = ()=>{
    // count for the count of products added to the cart
    const [count, setCount] = useState('0')

    // state for the theme of the navbar
    const place = useSelector((state)=>state.theme)
    const dispatch = useDispatch();

    // gettin the snapshot of the data from the backend
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "favouritescart", "fav"), (doc) => {
            const mast = [];
            doc.data().favouritesarr.map((item)=>{
                mast.push(item);
            })

            // console.log(mast.length);
            setCount(mast.length);
           
        });

        return ()=>{
            unsub();
        }
    }, [])
    // console.log(place)
    return(
        <div className="nav-container" style={{
            backgroundColor: place? "black":"white",
            color: place? "white":"black",
            // transition:"500ms"
        }}>

            <h1>MYcart</h1>
            <div className="ball-container" style={{
                borderColor: place? "white": "black",
            }}>

                <div onClick={()=>dispatch(themechange())} className="ball" style={{
                    marginLeft: place ? "17px": "0px",
                    backgroundColor: place? "white":"black",
                    
                    }}></div>
            </div>

            <div style={{display: "flex", width: "50%", justifyContent: "space-between"}}>
            <h3 className="links">
                <Link style={{color:"orange", margin:10}} to="/">Home</Link>  
            </h3>
            <h3 className="links">
                <Link style={{color:"orange"}} to="/cart"> Cart </Link>    
            </h3>
            </div>

            <div className="cartcount">
                <img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" alt="cart"/>
                <h4>{count}</h4>
            </div>

        </div>
    )
}


export default Navbar;
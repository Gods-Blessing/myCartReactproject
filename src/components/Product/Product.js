import React,{useEffect,useState} from "react"
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
// import { db, app } from "../../../firestore";
import { db, app } from "../../firestore";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";



function Product(){
    const ans = useLocation();

    const [incart, setIncart] = useState(false);

    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "favouritescart", "fav"), (doc) => {
            const mast = [];
            doc.data().favouritesarr.map((item)=>{
                mast.push(item);
            })

            // console.log(mast);
            mast.forEach(element => {
                if(ans.state.id === element.id){
                    setIncart(true);
                    return;
                }
            });
        });

        return ()=>{
            unsub();
        }
    }, [])


    async function addingtocart(product){
        alert("item added to cart")
        const washingtonRef = doc(db, "favouritescart", "fav");
        // console.log(product)
            // Atomically add a new region to the "regions" array field.
            await updateDoc(washingtonRef, {
                favouritesarr: arrayUnion(product)
            });
            setIncart(true);
    }

    async function removingfromcart(product){
        // console.log(product)
        const washingtonRef = doc(db, "favouritescart", "fav");
        await updateDoc(washingtonRef, {
            favouritesarr: arrayRemove(product)
        });
       
        setIncart(false);
    }

    // console.log(ans.state);
    return(
        <>
        <Navbar/>
        <div className="product-view-container">
            <h1>
                <u>
                    Product
                </u>
            </h1>
            <div className="detailsdiv">
                <img src={ans.state.image} alt=""/>
                <h2>{ans.state.product}</h2>
            </div>
            <div className="buttons-div">
                {incart ? <button onClick={()=>removingfromcart(ans.state)} className="product-button">Remove from Cart</button>:<button onClick={()=>addingtocart(ans.state)} className="product-button">Add to Cart</button> }
                
                
            </div>

        </div>
        </>
    )
}

export default Product;
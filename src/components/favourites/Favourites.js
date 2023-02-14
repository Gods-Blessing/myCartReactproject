import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firestore";
import Navbar from "../navbar/Navbar";
import { updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";


function Favourites(){
    const [arr, setArr] = useState([]);
    // const [sort, setSort] = useState(false);

    useEffect(()=>{
        document.title= "Cart";
            const unsub = onSnapshot(doc(db, "favouritescart", "fav"), (doc) => {
                const mast = [];
                doc.data().favouritesarr.map((item)=>{
                    mast.push(item);
                })

                setArr(mast);
            });

            // cleanup function
            return ()=>{
                unsub();
            }
    }, []);


    function handleSortdec(){
        const mast = [...arr];
            mast.sort((a,b)=>{
                return b.price - a.price;
            })
            setArr(mast);
    }

    function handleUnsort(){
            const unsub = onSnapshot(doc(db, "favouritescart", "fav"), (doc) => {
            const mast = [];
            doc.data().favouritesarr.map((item)=>{
                mast.push(item);
            })

            setArr(mast);
        });
    }


    async function removingfromcart(product){
        // console.log(product)
        const washingtonRef = doc(db, "favouritescart", "fav");
        await updateDoc(washingtonRef, {
            favouritesarr: arrayRemove(product)
        });
       
    }

    return(
        <div>
            <Navbar/>
            <div>
                <button className="sorting-btn" onClick={handleSortdec}>Sort</button>
                <button className="sorting-btn" onClick={handleUnsort}>Unsort</button>
            </div>

            <div className="cartcontainer">
                {arr.length < 1 ? <h2>Empty...</h2>: arr.map((data)=>{
                    return (
                    <div key={data.id} className="product-content">
                        <img src={data.image}></img>
                        <div>
                            <h3>{data.product}</h3>
                            <h4>Price: {data.price}</h4>
                        </div>
                        <button onClick={()=>removingfromcart(data)} className="product-button">Remove from Cart</button>
                    </div>
                    )
                })} 
                

            </div>
        </div>
    )
}

export default Favourites;
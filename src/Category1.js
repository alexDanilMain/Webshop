import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Category1({ category, products }) {
  
    function displayImg(data) {
        return <img className="mw-75" width={1000} height={200} alt="test" src={`data:image/png;base64,${data}`} />
    }


    function displayProducts(products) {

        if (products) {

            const prods = products.map(({ id, prodCat, prodName, prodImg, price }) =>
                <Link className="mx-1 my-1 pt-3 d-flex justify-content-center align-items-center flex-direction-column bg-light w-30 " to={'/' + prodCat + '/' + prodName + id}>

                    {displayImg(prodImg)}
                    <p className="pt-2 text-black">{prodName}</p>
                    <p className="text-black">{price + ' kr'}</p>

                </Link>
            )
            return (prods)
        } else {
            return (<p className="text-center"> Loading....</p>)
        }
    }

    return (
        <>
  


                    <div className="col-lg-10 col-12 overflow-auto">

                        <div className="d-flex w-full m-0 flex-wrap ">

                            {displayProducts(products)}
                        </div>


                    </div>







        </>

    );


}

export default Category1;

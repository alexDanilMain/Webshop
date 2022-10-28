import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Category1 from "./Category1";

function Category2({ category }) {

    const [filteredArray, setFilteredArray] = useState([1, 2, 3])
    const [cats, setCats] = useState(null)

    const getCats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/getCat')
            setCats(response.data)
        } catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        if (!cats) {
            getCats()
        }

    }, [])

    const [products, setProducts] = useState(null);


    const getProd = async () => {
        try {

            const response = await axios.get('http://localhost:8000/getProdCat/' + category)
            setProducts(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!products) {
            getProd()
        }

    }, [])


    const filterArrayHighToLow = (arr) => {
        var temp = arr;
        var y;
        for (var i = 0; i < arr.length; i++) {
            for (var x = i + 1; x < arr.length; x++) {
                if (Number(temp[i].price) < Number(temp[x].price)) {
                    y = temp[i]
                    temp[i] = temp[x]
                    temp[x] = y
                }
            }
        }
        return (temp)

    }

    const filterArrayLowToHigh = (arr) => {
        var temp = arr;
        var y;
        for (var i = 0; i < arr.length; i++) {
            for (var x = i + 1; x < arr.length; x++) {
                if (Number(temp[i].price) > Number(temp[x].price)) {
                    y = temp[i]
                    temp[i] = temp[x]
                    temp[x] = y
                }
            }
        }
        return (temp)
    }

    const filterArrayAss = (arr) => {
        var temp = arr;
        var y;
        for (var i = 0; i < arr.length; i++) {
            for (var x = i + 1; x < arr.length; x++) {
                if (temp[i].prodName.charCodeAt(0) > temp[x].prodName.charCodeAt(0)) {
                    y = temp[i]
                    temp[i] = temp[x]
                    temp[x] = y
                }
            }
        }
        return (temp)
    }


    const filterArrayDes = (arr) => {
        var temp = arr;
        var y;
        for (var i = 0; i < arr.length; i++) {
            for (var x = i + 1; x < arr.length; x++) {
                if (temp[i].prodName.charCodeAt(0) < temp[x].prodName.charCodeAt(0)) {
                    y = temp[i]
                    temp[i] = temp[x]
                    temp[x] = y
                }
            }
        }
        return (temp)
    }


    function displayCats(cats) {
        if (cats) {
            for(var i = 0; i < cats.length; i++){
                if (cats[i].products.length === 0){
                  cats.splice(i,1)
                }
              }
            const categories = cats.map(({ id, catName, catDesc, color, products }) =>


                <li className="list-group-item d-flex justify-content-between align-items-center cursor-pointer">
                    <Link className="text-black" to={"/" + catName + id} onClick={() => window.reload()}>
                        {catName}
                    </Link>

                </li>


            )
            return (
                <ul className="list-group list-group-flush">

                    {categories}

                </ul>)
        } else {
            return (<p className="text-center"> Loading....</p>)
        }
    }

    const handleChange = (e) => {
        if (e.target.value === "1") {
            setProducts(filterArrayHighToLow(products))
            setFilteredArray([...filteredArray])
        }
        if (e.target.value === "2") {

            setProducts(filterArrayLowToHigh(products))
            setFilteredArray([...filteredArray])
        }

    }

    const handleChange1 = (e) => {
        if (e.target.value === "3") {

            setProducts(filterArrayAss(products))
            setFilteredArray([...filteredArray])
        }
        if (e.target.value === "4") {

            setProducts(filterArrayDes(products))
            setFilteredArray([...filteredArray])
        }
    }

    return (

        <>
            <div className="container w-full mx-auto">
                <div className="w-100 d-flex flex-wrap justify-content-center align-items-center ps-3">

                    Filter by :
                    <select className="form-select w-25 m-2" aria-label="Default select example" onChange={(e) => handleChange(e)}>
                        <option>Price</option>
                        <option value="1">High - Low</option>
                        <option value="2">Low - High</option>
                    </select>

                    <select className="form-select w-25 m-2" aria-label="Default select example" onChange={(e) => handleChange1(e)}>
                        <option>Name</option>
                        <option value="3"> A - Z</option>
                        <option value="4"> Z - A</option>
                    </select>
                </div>
                <div className="row">
                    <div className="col-2 d-lg-block d-none">
                        {displayCats(cats)}
                    </div>

                    <Category1 category={category} products={products}></Category1>

                </div>

            </div>
        </>
    )
}

export default Category2;

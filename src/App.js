import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,

} from "react-router-dom";

import Navbar from './Navbar';
import Category from './Category';
import Footer from './Footer';
import Category2 from './Category2';
import ProductPage from './ProductPage';
import Addcat from './Addcat';
import Addproduct from './Addproduct';
import Editcat from "./Editcat";
import Editcatsingle from "./Editcatsingle";
import Editprod from "./Editprod";
import Editprodsingle from "./Editprodsingle";
import Search from "./Search";
import Cart from "./Cart";


function App() {

  const [cats, setCats] = useState(null)
  const [testArr, setTestArr] = useState(null)
  const getCats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getCat')

      setCats(response.data)

    } catch (err) {
      console.log(err)
    }
  }

  const getCats1 = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getCat')
      setTestArr(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!cats) {
      getCats()
    }

  }, [cats])

  useEffect(() => {
    if (!testArr) {
      getCats1()
    }

  }, [testArr])


  const [products, setProducts] = useState(null);


  const getProd = async () => {
    try {

      const response = await axios.get('http://localhost:8000/getProd')
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
  function displayCats(arr) {

    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].products.length === 0) {
          arr.splice(i, 1)
        }
      }
      const categories = arr.map(({ id, catName, catDesc, color, products }) =>

        <Link className="link" to={"/" + catName + id}>
          <Category name={catName} desc={catDesc} color={color} img1={products[0]} img2={products[1] ? products[1] : products[0]} img3={products[2] ? products[2] : products[0]} />
        </Link>
      )
      return (categories)

    } else {
      return (<p className="text-center"> Loading....</p>)
    }

  }

  function displayLinks(cats) {
    if (cats) {
      const links = cats.map(({ id, catName, products }) =>
        <Route exact path={'/' + catName + id} element={
          <>
            <Navbar />

            <Category2 category={catName} />

            <Footer />
          </>
        } />
      )
      return (
        links
      )
    }
  }

  function displayLinksEdit(cats1) {
    if (cats1) {
      const links = cats1.map(({ id, catName }) =>
        <Route exact path={'/backend/' + catName + id} element={
          <>

            <Editcatsingle id={id} />

          </>
        } />
      )
      return (
        links
      )
    }
  }


  function displayLinksEditProd(prod) {
    if (prod) {
      const links = prod.map(({ id, prodName }) =>
        <Route exact path={'/backend/' + prodName.replaceAll(' ', '%20') + id} element={
          <>

            <Editprodsingle id={id} />

          </>
        } />
      )
      return (
        links
      )
    }
  }

  function displayLinksProd(products) {
    if (products) {
      const links = products.map(({ id, prodName, prodDesc, price, prodImg, prodCat }) =>
        <Route exact path={'/' + prodCat + '/' + prodName.replaceAll(' ', '%20') + id} element={
          <>
            <Navbar />

            <ProductPage id={id} name={prodName} desc={prodDesc} price={price} img={prodImg} catName={prodCat} />

            <Footer />
          </>
        } />
      )
      return (
        links
      )
    }
  }

  return (
    <>

      <Router>
        <Routes>
          <Route exact path="/" element={
            <>
              <Navbar />
              <Search />
              {displayCats(testArr)}

              <Footer />
            </>

          } />

          {displayLinksEdit(cats)}
          {displayLinks(cats)}


          {displayLinksEditProd(products)}
          {displayLinksProd(products)}

          <Route exact path='/backend/add-cat' element={
            <>
              <Addcat />
            </>
          } />


          <Route exact path='/backend/add-product' element={
            <>
              <Addproduct />
            </>
          } />



          <Route exact path='/backend/edit-cat' element={
            <>
              <Editcat />
            </>
          } />

          <Route exact path='/backend/edit-prod' element={
            <>
              <Editprod />
            </>
          } />

          <Route exact path="/cart" element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>

          } />

        </Routes>



      </Router>

    </>
  );
}

export default App;

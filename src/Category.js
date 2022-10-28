import axios from "axios";
import React, { useState, useEffect } from "react";
function Category({ name, desc, color, img1, img2, img3 }) {
    function displayImg (data) {
       return <img className="mx-3 w-25" alt="test" src={`data:image/png;base64,${data}`} />
    } 

    function loading(item){
        if(item){
           return displayImg(item[0].prodImg)
        }
        return <p className="text-center"> Loading ...</p>
    }

    const [prodImg, setProdImg] = useState(null)
    const [prodImg1, setProdImg1] = useState(null)
    const [prodImg2, setProdImg2] = useState(null)


    const getProdImage = async (img) => {
        try {
            const response = await axios.get('http://localhost:8000/getProd/' + img)
            setProdImg(response.data)
        } catch (err) {
            console.log(err)
        }
    }


    const getProdImage1 = async (img) => {
        try {
            const response = await axios.get('http://localhost:8000/getProd/' + img)
            setProdImg1(response.data)
        } catch (err) {
            console.log(err)
        }
    }


    const getProdImage2 = async (img) => {
        try {
            const response = await axios.get('http://localhost:8000/getProd/' + img)
            setProdImg2(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!prodImg) {
            getProdImage(img1)
        }

        if (!prodImg1) {
            getProdImage1(img2)

        }

        if (!prodImg2) {
            getProdImage2(img3)
        }
    }, [])


    return (
        <div className="Category mt-4">

            <div className='d-flex flex-direction-column w-100' style={{ height: "300px", backgroundColor: color }}>
                <div className="d-flex justify-content-center w-100">
                    <h1 className="text-black">{name}</h1>
                </div>

                <div className="d-flex flex-direction-column-sm justify-content-evenly align-items-center w-100 h-75">
                    <div className="d-flex w-md-50 w-100 justify-content-center">
                        <p className="text-black">{desc}</p>
                    </div>

                    <div className="d-flex w-md-50 w-100 flex-direction-column-sm justify-content-end align-items-center h-75">
                        <div className="d-flex justify-content-center w-100 w-md-75 h-100">
                        {loading(prodImg)}
                        {loading(prodImg1)}
                        {loading(prodImg2)}

                        </div>
                        <div className="d-flex justify-content-center justify-content-lg-start align-items-center text-black h-100 view-more"> VIEW MORE {">>"}</div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Category;

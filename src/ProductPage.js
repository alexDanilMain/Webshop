import {
  RiStarFill,
  RiStarHalfFill,
  RiStarLine
} from "react-icons/ri";




function ProductPage({ id, name, desc, price, img, catName }) {
  function displayImg(data) {
    return <img className="mw-100" width={1000} height={600} alt="test" src={`data:image/png;base64,${data}`} />
  }
  if (!(JSON.parse(sessionStorage.getItem("myCart")))) {
    cart = []
  } else {
    var cart = JSON.parse(sessionStorage.getItem("myCart"));
  }

  const handleCart = async () => {
    if (cart.length > 0){
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].productId === id) {
          cart[i].amount++
          break
        } else {
          var cartItem = {
            productId: id,
            productName: name,
            productImage: img,
            productPrice: price,
            amount: 1
          }
          cart.push(cartItem)
          break
  
        }
      }

    }else {
      var cartItem = {
        productId: id,
        productName: name,
        productImage: img,
        productPrice: price,
        amount: 1
      }
      cart.push(cartItem)
    }


    alert('Item Added to Cart')
    window.location.reload()
    sessionStorage.setItem("myCart", JSON.stringify(cart));
  }


  function getCart() {
    var test = sessionStorage.getItem("myCart");
    console.log(JSON.parse(test));
  }

  return (
    <>

      <div className='d-flex'>
        <div className=" w-100 d-flex flex-direction-column-sm justify-content-center align-items-center">
          <div className="w-md-50 w-100 p-5">
            {displayImg(img)}
          </div>
          <div className="w-md-50 w-100 bg-light h-100 p-5 mt-5">
            <div className="w-full d-flex flex-direction-column align-items-center">
              <h2 className="text-center">{catName}</h2>
              <h3 className="text-center"> {name} </h3>
              <div className="d-flex w-full justify-content-center pt-3">
                <RiStarFill size={30} />
                <RiStarFill size={30} />
                <RiStarFill size={30} />
                <RiStarHalfFill size={30} />
                <RiStarLine size={30} />
              </div>
              <p className="pt-3">
                {desc}
              </p>
              <p className="text-center">{price} kr</p>
              <button className="btn btn-outline-secondary w-75" onClick={handleCart}> Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;

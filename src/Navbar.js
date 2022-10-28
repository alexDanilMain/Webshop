import { BsCart4 } from "react-icons/bs";
import "./index.css";
import { Link } from "react-router-dom";

function Navbar() {

  function displayCart(){

    if(cart){
      var sum = 0;
      var cartArr = JSON.parse(cart)
      for(var i = 0; i < cartArr.length; i++){
        sum = sum + cartArr[i].amount

      }
      return sum
    }
    else{
      return '0'
    }
  }
  var cart = sessionStorage.getItem("myCart");

  return (
    <div className="Navbar">
      <div className='d-flex justify-content-between bg-light' style={{ height: "150px" }} >

        <div className="d-flex justify-content-center w-xs-75 w-sm-25 h-100 align-items-center" >
          <Link to='/' className="text-black">
            <h2 className="pt-4 ps-4 ps-lg-5">Fitness Store</h2>
          </Link>
        </div>
        <div className=" d-flex w-50 h-100 align-items-center justify-content-center flex-direction-column">

            
        </div>
        <div className="d-flex justify-content-end w-25 h-100 ">
          <div className="d-flex flex-direction-column justify-content-center align-items-center pe-5">

            <Link to="/cart" className="btn border border-dark w-100"> Cart [ {displayCart()} ]</Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
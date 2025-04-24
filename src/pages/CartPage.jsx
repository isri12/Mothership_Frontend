import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import "./cart.css"
import CartItemCard from "../components/CartItemCard";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom"


function CartPage() {
  const { products, totalQuantity, totalPrice } = useSelector(state => state.cart)
  const navigate = useNavigate()
  
  return (
    <div className="cart-page-container">
      <div className="cart-card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="cart-page-title">
              <div className="row">
                <div className="col"><h4><b>Shopping Cart</b></h4></div>
                <div className="col align-self-center text-right text-muted">{totalQuantity} items</div>
              </div>
            </div>
            {
              products.map(product => (
                <CartItemCard name={product.name} id={product.id} quantity={product.quantity} price={product.price} key={product.id} image={product.image} />
              ))
            }
         
            <div className="back-to-shop" onClick={()=>navigate("/")}><a href="#">&larr;</a><span className="text-muted">Back to Shop</span></div>
          </div>
          <div className="col-md-4 summary">
            <div><h5><b>Summary</b></h5></div>
            <hr />
          
            <form>
              <p>SHIPPING</p>
              <select><option className="text-muted">Standard-Delivery- 5.00 $</option></select>
              <p>GIVE CODE</p>
              <input id="code" placeholder="Enter your code" />
            </form>
            <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">{totalPrice} $</div>
            </div>
            <ButtonComponent desc="Checkout"/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartPage
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineStar} from  'react-icons/ai'
// import img from './assets/images/black-friday-elements-assortment'
function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [show, setShow] = useState("Man & Woman Fashion")
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([])
  console.log("cartItems", cartItems)
  useEffect(() => {
    axios.get(" https://fakestoreapi.com/products").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setShow(event.target.value)
  };
  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };
  const filteredProducts = products.filter(
    (product) =>
      (category === "" || product.category === category) &&
      (searchTerm === "" ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const handleAddToCart =(product) =>{
    console.log("products",product)
    setCartItems((prevItems) => [...prevItems, product]);
  }
  return (
    <div className="App">
      <div className="banner">
      <div className="content">
        <h2 style={{fontSize:'55px', color:'#fff', fontWeight:'bold'}}>Get Start</h2>
        <h2 style={{fontSize:'55px', color:'#fff',fontWeight:'bold'}}> Your Favriot shopping!</h2>
      </div>
    
      <div className="filters">
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="electronics">electronics</option>
          <option value="jewelery">jewelery</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      </div>
      <div class="item">
      <h2 className="text-center" style={{fontSize:'55px', color:'#000', fontWeight:'bold'}}>{show}</h2>
        <div className="row">
        {filteredProducts.map((product) => {
          const textLength = product.title;
          const maxLength = 15;
          const limitedText = textLength.substring(0, maxLength);
          return (
            <>
            <div className="col-md-4">
              <div className="container mx-auto">
                <div class="card">
                  <div class="content-1">
                    <div class="logo-img">
                      {/* <img src="https://i.postimg.cc/vBJtjtRC/nike-logo.png" alt=""/> */}
                    </div>
                    <img src={product.image} alt="" />
                  </div>
                  <div class="content-2">
                    <div class="branding mt-1">
                      <span>{limitedText}</span>
                     
                    </div>
                    <div class="ratings">
                      <span>
                      <AiOutlineStar style={{color:'yellow', fontSize:'25px'}}/>
                      </span>
                      <span>
                      <AiOutlineStar style={{color:'yellow', fontSize:'25px'}}/>

                      </span>
                      <span>
                      <AiOutlineStar style={{color:'yellow', fontSize:'25px'}}/>

                      </span>
                      <span>
                      <AiOutlineStar style={{color:'yellow', fontSize:'25px'}}/>

                      </span>
                      <span>
                      <AiOutlineStar style={{color:'yellow', fontSize:'25px'}}/>

                      </span>
                    </div>
                   
                    <div class="price mt-5">
                      <span>₹{product.price}</span>
                    </div>
                  
                  </div>
                </div>
              </div>
              </div>
              {/* </div> */}
            </>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default App;

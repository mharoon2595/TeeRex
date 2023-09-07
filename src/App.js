
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products"
import Checkout from './components/Checkout';


export const teeAPI = { endpoint:'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'};


function App() {
  return (
    <div>
    <Routes>
      <Route path="/checkout" element={<Checkout/>}/>
    </Routes>
    <Routes>
      <Route path="/" element={<Products/>}/>
    </Routes>

    </div>
  );
}

export default App;

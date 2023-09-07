import Header from "./Header";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Cart from "./Cart";
import { teeAPI } from '../App'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { CartQty } from "./Cart";


const TotalCost = ({ allTees, teeData, cartQuantity }) => {
  let sum = 0;

  allTees.forEach((items) => {
    if (teeData[items.id]) {
      sum += (cartQuantity[items.id] * (items.price))
    }
  })
  console.log("sum---->", sum)
  return sum
}

const Checkout = () => {
  const [allTees, setAllTees] = useState([]);
  const [teeData, setTeeData] = useState({});
  const [cartQuantity, setCartQuantity] = useState({});

  const localStorageInCart = localStorage.getItem('InCart');
  const localStorageItemQuantity = localStorage.getItem('CartQty');

  const inCart = localStorageInCart ? JSON.parse(localStorageInCart) : {};
  const itemQuantity = localStorageItemQuantity ? JSON.parse(localStorageItemQuantity) : {};



  useEffect(() => {


    (async () => {
      try {
        let res = await axios.get(teeAPI.endpoint);
        console.log(res.data);
        setAllTees(res.data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      }


      let temp1 = itemQuantity
      setCartQuantity(temp1)

      let temp2 = inCart
      setTeeData(temp2)

    })();

  }, [])

  useEffect(() => {
    console.log("allTees from Checkout-->", allTees)

  }, [allTees])


  useEffect(() => {

    if (teeData && Object.keys(teeData).length != 0) {
      localStorage.setItem('InCart', JSON.stringify((teeData)));
    }

  }, [teeData])

  useEffect(() => {

    if (cartQuantity && Object.keys(cartQuantity).length != 0) {
      localStorage.setItem('CartQty', JSON.stringify(cartQuantity));
    }

  }, [cartQuantity])


  if (Object.keys(inCart).length != 0) {
    return (
      <>
        <Header hideCart />
        <Container>
          <Box sx={{ marginTop: '110px' }}>
            <h1>Checkout</h1>
            <Box>
              {allTees.map((items) => {
                return (
                  <Cart items={items} inCart={teeData} itemQuantity={cartQuantity}
                    key={items.id}
                    onAdd={() => {
                      setCartQuantity((prevState) => ({
                        ...prevState,
                        [items.id]: prevState[items.id] + 1,
                      }))
                    }}

                    onRemove={() => {
                      setCartQuantity((prevState) => ({
                        ...prevState,
                        [items.id]: prevState[items.id] - 1,
                      }))
                    }}

                    deleteFromCart={() => {
                      const { [items.id]: deletedItem, ...newState } = teeData
                      setTeeData(newState)
                      if (Object.keys(newState).length == 0) {
                        localStorage.setItem('InCart', JSON.stringify({}))
                      }
                      const { [items.id]: deletedItem1, ...newState1 } = cartQuantity
                      setCartQuantity(newState1)
                      if (Object.keys(newState1).length == 0) {
                        localStorage.setItem('CartQty', JSON.stringify({}))
                      }
                    }}
                  />
                )
              }
              )}
              {Object.keys(teeData).length != 0 ? <h3>Order total: ₹ <TotalCost teeData={teeData}
                cartQuantity={cartQuantity} allTees={allTees} /></h3> : ''}
            </Box>
          </Box>
        </Container>
      </>
    )
  }
  else if (Object.keys(inCart).length == 0) {
    return (
      <>
        <Header hideCart />

        <Box sx={{
          marginTop: '100px',
          padding: '50px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <h1>Cart is empty</h1>
        </Box>
      </>
    )
  }
}

export default Checkout;
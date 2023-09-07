import * as React from 'react';
import Box from '@mui/material/Box';
import "./Products.css"
import Header from './Header.js';
import Container from '@mui/material/Container';
import { teeAPI } from '../App'
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cards from './Cards'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Filters from './Filters';
import Search from './Search';
import Checkout from './Checkout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';



const Products = () => {
  const [allTees, setAllTees] = useState([]);
  const [teeData, setTeeData] = useState([]);
  const [teeFilters, setTeeFilters] = useState([]);
  const [clickCart, setClickCart] = useState({})
  const [cartItemQty, setCartItemQty] = useState({})
  const [totalCartQuantity, setTotalCartQuantity] = useState(0)
  const [colorFilterChecked, setColorFilterChecked] = useState(null)
  const [genderFilterChecked, setGenderFilterChecked] = useState(null)
  const [typeFilterChecked, setTypeFilterChecked] = useState(null)
  const [priceFilterChecked, setPriceFilterChecked] = useState(null)
  const [whenFilterChecked, setWhenFilterChecked] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const prevColorFilter = useRef()
  const prevGenderFilter = useRef()
  const prevTypeFilter = useRef()
  const prevPriceFilter = useRef()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    

    (async () => {
      try {
        let res = await axios.get(teeAPI.endpoint);
        setTeeData(res.data);
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

    })();

    (() => {
      if (localStorage.getItem('InCart')) {
        let temp1 = JSON.parse(localStorage.getItem('InCart'));
        setClickCart(temp1);
      }
      if (localStorage.getItem('CartQty')) {
        let temp2 = JSON.parse(localStorage.getItem('CartQty'));
        setCartItemQty(temp2);
      }
    })();

  }, [])



  useEffect(() => {
    console.log("color check/uncheck")
  }, [colorFilterChecked])



  useEffect(() => {
    console.log("gender check/uncheck")
  }, [genderFilterChecked])



  useEffect(() => {
    console.log("type check/uncheck")
  }, [typeFilterChecked])



  useEffect(() => {
    console.log("price check/uncheck")
  }, [priceFilterChecked])




  useEffect(() => {


    if (teeFilters.length == 0 && (colorFilterChecked || genderFilterChecked || typeFilterChecked || priceFilterChecked)) {
      setColorFilterChecked(null);
      setGenderFilterChecked(null);
      setPriceFilterChecked(null);
      setTypeFilterChecked(null);

      enqueueSnackbar("No products found", {
        variant: 'error'
      })
    }

  }, [teeFilters])



  useEffect(() => {

    if (clickCart && Object.keys(clickCart).length != 0) {
      localStorage.setItem('InCart', JSON.stringify((clickCart)));
    }

  }, [clickCart])

  useEffect(() => {


    if (cartItemQty && Object.keys(cartItemQty).length != 0) {
      localStorage.setItem('CartQty', JSON.stringify(cartItemQty));
      let sum = 0;
      let arr = Object.keys(cartItemQty);
      arr.forEach((qty) => {
        sum += cartItemQty[qty]
      })
      setTotalCartQuantity(sum)
    }

  }, [cartItemQty])




  useEffect(() => {

    if (Boolean(localStorage.getItem('TotalQty')) == false) {
      localStorage.setItem('TotalQty', totalCartQuantity);
    }
    else {
      localStorage.setItem('TotalQty', totalCartQuantity);
    }

  }, [totalCartQuantity])





  useEffect(() => {

    const filtersChanged =
      colorFilterChecked !== prevColorFilter.current ||
      genderFilterChecked !== prevGenderFilter.current ||
      priceFilterChecked !== prevPriceFilter.current ||
      typeFilterChecked !== prevTypeFilter.current;


    if (filtersChanged) {

      let filteredData = teeData;


      if (colorFilterChecked !== null) {
        filteredData = filteredData.filter((item) => item.color === colorFilterChecked);
      }


      if (genderFilterChecked !== null) {
        filteredData = filteredData.filter((item) => item.gender === genderFilterChecked);
      }


      if (priceFilterChecked !== null) {
        filteredData = filteredData.filter((item) => {
          if (priceFilterChecked == 'price1') {

            return item.price <= 250

          }
          else if (priceFilterChecked == 'price2') {

            return item.price > 251 && item.price <= 450
          }

          else if (priceFilterChecked == 'price3') {

            return item.price >= 450
          }

        }
        )
      }


      if (typeFilterChecked !== null) {
        filteredData = filteredData.filter((item) => item.type === typeFilterChecked);
      }


      if (filteredData != '') {
        setTeeFilters(filteredData);
        setWhenFilterChecked(filteredData)
      }
      else {
        setTeeFilters('')
        setWhenFilterChecked('')
      }
    }
    else {

      if (teeData)
        setTeeFilters(teeData);
      setWhenFilterChecked(teeData)
    }


    prevColorFilter.current = colorFilterChecked;
    prevGenderFilter.current = genderFilterChecked;
    prevPriceFilter.current = priceFilterChecked;
    prevTypeFilter.current = typeFilterChecked;

  }, [colorFilterChecked, genderFilterChecked, priceFilterChecked, typeFilterChecked]);


  useEffect(() => {
    console.log("when filter checked-->", whenFilterChecked)
  }, [whenFilterChecked])




  if (teeFilters.length == 0) {
    return (

      <div>
        <Header TotalQuantity={totalCartQuantity} />

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box>
            <Search onType={(e) => {
              if (e.target.value == "") {
                setTeeData(allTees)
              }
              else if (e.target.value != "") {
                setTeeData(allTees.filter((item) => {
                  if (item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.color.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.type.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return item
                  }
                }))
              }
            }
            } />
          </Box>
          <Box className="filterButton">
            <FilterAltIcon size="large" onClick={handleClick} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            ><Filters handleColorChange={(e) => {
              setColorFilterChecked(e.target.name == colorFilterChecked ? null : e.target.name)


            }}

              handleGenderChange={(e) => {
                setGenderFilterChecked(e.target.name == genderFilterChecked ? null : e.target.name)
              }}

              handleTypeChange={(e) => {
                setTypeFilterChecked(e.target.name == typeFilterChecked ? null : e.target.name)
              }}

              handlePriceChange={(e) => {
                setPriceFilterChecked(e.target.value == priceFilterChecked ? null : e.target.value)
              }}

              colorFilterChecked={colorFilterChecked}

              genderFilterChecked={genderFilterChecked}

              typeFilterChecked={typeFilterChecked}

              priceFilterChecked={priceFilterChecked}
              />
            </Menu>
          </Box>
        </Box>

        <Grid container>


          <Grid item md={3}>
            <Box className="hideFilterBox">
              <Filters

                handleColorChange={(e) => {
                  setColorFilterChecked(e.target.name == colorFilterChecked ? null : e.target.name)


                }}

                handleGenderChange={(e) => {
                  setGenderFilterChecked(e.target.name == genderFilterChecked ? null : e.target.name)
                }}

                handleTypeChange={(e) => {
                  setTypeFilterChecked(e.target.name == typeFilterChecked ? null : e.target.name)
                }}

                handlePriceChange={(e) => {
                  setPriceFilterChecked(e.target.value == priceFilterChecked ? null : e.target.value)
                }}

                colorFilterChecked={colorFilterChecked}

                genderFilterChecked={genderFilterChecked}

                typeFilterChecked={typeFilterChecked}

                priceFilterChecked={priceFilterChecked}



              />
            </Box>
          </Grid>

          <Grid item sm={12} md={9}>
            <Grid container spacing={2}>
              {

                teeData.map((items) => (

                  <Grid item xs={6} md={4} key={items.id}>
                    <Box sx={{
                      margin: '2rem'
                    }}>

                      <Cards items={items}
                        addedToCart={clickCart}
                        onAddtoCart={() => {
                          setClickCart((prevState) => ({ ...prevState, [items.id]: true }))
                          setCartItemQty((prevState) => ({ ...prevState, [items.id]: 1 }))
                        }}

                        itemQty={cartItemQty}

                        onRemove={() => {
                          setCartItemQty((prevState) => ({
                            ...prevState,
                            [items.id]: prevState[items.id] - 1,
                          }))
                        }}

                        onAdd={() => {
                          setCartItemQty((prevState) => ({
                            ...prevState,
                            [items.id]: prevState[items.id] + 1,
                          }))
                        }}

                        deleteFromCart={() => {
                          const { [items.id]: deletedItem, ...newState } = clickCart
                          setClickCart(newState)
                          if (Object.keys(newState).length == 0) {
                            localStorage.setItem('InCart', JSON.stringify({}))
                          }
                          const { [items.id]: deletedItem1, ...newState1 } = cartItemQty
                          setCartItemQty(newState1)
                          if (Object.keys(newState1).length == 0) {
                            localStorage.setItem('CartQty', JSON.stringify({}))
                          }
                          setTotalCartQuantity(prevValue => prevValue - 1)
                        }}

                      />
                    </Box>
                  </Grid>
                ))}

            </Grid>
          </Grid>

        </Grid>
      </div>

    )
  }

  else if (teeFilters.length != 0) {
    return (

      <div>
        <Header TotalQuantity={totalCartQuantity} />

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box>

            <Search onType={(e) => {

              if (e.target.value == "") {
                if (colorFilterChecked || genderFilterChecked || priceFilterChecked || typeFilterChecked) {
                  setTeeFilters(whenFilterChecked)
                }
                else {
                  setTeeFilters(allTees)
                }
              }

              else if (e.target.value != "") {
                setTeeFilters(teeFilters.filter((item) => {
                  if (item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.color.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.type.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return item
                  }
                }))
              }
            }
            } />
          </Box>
          <Box className="filterButton">
            <FilterAltIcon size="large" onClick={handleClick} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            ><Filters handleColorChange={(e) => {
              setColorFilterChecked(e.target.name == colorFilterChecked ? null : e.target.name)


            }}

              handleGenderChange={(e) => {
                setGenderFilterChecked(e.target.name == genderFilterChecked ? null : e.target.name)
              }}

              handleTypeChange={(e) => {
                setTypeFilterChecked(e.target.name == typeFilterChecked ? null : e.target.name)
              }}

              handlePriceChange={(e) => {
                setPriceFilterChecked(e.target.value == priceFilterChecked ? null : e.target.value)
              }}

              colorFilterChecked={colorFilterChecked}

              genderFilterChecked={genderFilterChecked}

              typeFilterChecked={typeFilterChecked}

              priceFilterChecked={priceFilterChecked}

              onReset={() => {
                setColorFilterChecked(null)
                setGenderFilterChecked(null)
                setTypeFilterChecked(null)
                setPriceFilterChecked(null)
                setTeeFilters('');
                enqueueSnackbar("Filters cleared", {
                  variant: 'success'
                })
              }}
              />
            </Menu>
          </Box>
        </Box>

        <Grid container>


          <Grid item md={3}>
            <Box className="hideFilterBox">
              <Filters


                handleColorChange={(e) => {
                  setColorFilterChecked(e.target.name == colorFilterChecked ? null : e.target.name)

                }}

                handleGenderChange={(e) => {
                  setGenderFilterChecked(e.target.name == genderFilterChecked ? null : e.target.name)
                }}

                handleTypeChange={(e) => {
                  setTypeFilterChecked(e.target.name == typeFilterChecked ? null : e.target.name)
                }}

                handlePriceChange={(e) => {
                  setPriceFilterChecked(e.target.value == priceFilterChecked ? null : e.target.value)
                }}

                colorFilterChecked={colorFilterChecked}

                genderFilterChecked={genderFilterChecked}

                typeFilterChecked={typeFilterChecked}

                priceFilterChecked={priceFilterChecked}

                onReset={() => {
                  setColorFilterChecked(null)
                  setGenderFilterChecked(null)
                  setTypeFilterChecked(null)
                  setPriceFilterChecked(null)
                  setTeeFilters('');
                  enqueueSnackbar("Filters cleared", {
                    variant: 'success'
                  })
                }}

              />
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {

                teeFilters.map((items) => (

                  <Grid item xs={6} md={4} key={items.id}>
                    <Box sx={{
                      margin: '2rem'
                    }}>

                      <Cards items={items}
                        addedToCart={clickCart}
                        onAddtoCart={() => {
                          setClickCart((prevState) => ({ ...prevState, [items.id]: true }))
                          setCartItemQty((prevState) => ({ ...prevState, [items.id]: 1 }))
                        }}

                        itemQty={cartItemQty}

                        onRemove={() => {
                          setCartItemQty((prevState) => ({
                            ...prevState,
                            [items.id]: prevState[items.id] - 1,
                          }))
                        }}

                        onAdd={() => {
                          setCartItemQty((prevState) => ({
                            ...prevState,
                            [items.id]: prevState[items.id] + 1,
                          }))
                        }}

                        deleteFromCart={() => {
                          const { [items.id]: deletedItem, ...newState } = clickCart
                          setClickCart(newState)
                          const { [items.id]: deletedItem1, ...newState1 } = cartItemQty
                          setCartItemQty(newState1)
                          setTotalCartQuantity(prevValue => prevValue - 1)
                        }}

                      />
                    </Box>
                  </Grid>
                ))}


            </Grid>
          </Grid>

        </Grid>
      </div>

    )
  }
}

export default Products;
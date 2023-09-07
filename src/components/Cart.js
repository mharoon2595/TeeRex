import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import './Cart.css'
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete
}) => {


  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
}



const Cart = ({
  items, inCart, itemQuantity, onAdd, onRemove, deleteFromCart
}) => {
  const { enqueueSnackbar } = useSnackbar();


  const exceedQuantity = () => {
    if (itemQuantity[items.id] >= items.quantity) {
      enqueueSnackbar("Added maximum available quantity of this item to cart", {
        variant: 'warning'
      })
    }
    else {
      onAdd()
    }
  }

  const removeFromCart = () => {
    if (itemQuantity[items.id] <= 1) {
      enqueueSnackbar("Click the delete button to remove item", {
        variant: 'error'
      })
    }
    else {
      onRemove()
    }
  }


  console.log("heres the stuff", items, inCart)
  return (
    <div>
      {inCart[items.id]
        ? <Box className='cart'>
          <Box display="flex" alignItems="flex-start" padding="1rem">
            <Box className="image-container">
              <img
                src={items.imageURL}
                alt="alt text"
                width="100%"
                height="100%"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="6rem"
              paddingX="1rem"
            >
              <div>{items.name}</div>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ItemQuantity

                  value={itemQuantity[items.id]}

                  handleAdd={exceedQuantity}


                  handleDelete={removeFromCart}

                />

                <Box padding="0.5rem" fontWeight="700">
                  ₹ {items.price}
                </Box>
              </Box>
              <Button variant="contained" color="error" size="small" onClick={deleteFromCart}>Delete</Button>
            </Box>
          </Box>
        </Box>
        : null
      }

    </div>

  )
}

export default Cart
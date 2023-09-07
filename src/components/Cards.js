import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSnackbar } from "notistack";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import "./Cards.css"


const Cards = ({ items, onAddtoCart, addedToCart, itemQty, onAdd, onRemove, deleteFromCart }) => {
  const { enqueueSnackbar } = useSnackbar()

  const exceedQuantity = () => {
    if (itemQty[items.id] >= items.quantity) {
      enqueueSnackbar("Added maximum available quantity of this item to cart", {
        variant: 'warning'
      })
    }
    else {
      onAdd()
    }
  }

  const removeFromCart = () => {
    if (itemQty[items.id] <= 1) {
      deleteFromCart()
    }
    else {
      onRemove()
    }
  }



  if (Object.keys(addedToCart).length == 0) {
    return (


      <Card className="card" >
        <CardMedia
          sx={{ height: 250 }}
          image={items.imageURL}
          title={items.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {items.name}
          </Typography>

          <Box
            className="responsiveCard"
          >
            <Typography gutterBottom variant="h5" component="div">
              ₹ {items.price}
            </Typography>

            <Button variant="contained" color='success' onClick={onAddtoCart}>Add to cart</Button>

          </Box>
        </CardContent>
      </Card>
    );
  }

  else if (Object.keys(addedToCart).length != 0) {

    return (


      <Card className="card" >
        <CardMedia
          sx={{ height: 250 }}
          image={items.imageURL}
          title={items.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {items.name}
          </Typography>

          <Box className="responsiveCard">
            <Typography gutterBottom variant="h5" component="div">
              ₹ {items.price}
            </Typography>


            {addedToCart[items.id]
              ? <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                backgroundColor: 'silver',
                padding: '6px',
                height: ''
              }}>
                <><IconButton size="small" onClick={removeFromCart}>
                  <RemoveOutlined />
                </IconButton></>
                <Box sx={{ padding: '5px', fontSize: '1rem' }}>{itemQty[items.id]}</Box>
                <><IconButton size="small" onClick={exceedQuantity}>
                  <AddOutlined />
                </IconButton></>
              </Box>
              : <Button variant="contained" color='success' onClick={onAddtoCart}>Add to cart</Button>
            }


          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default Cards;



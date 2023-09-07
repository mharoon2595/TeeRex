import * as React from 'react';
import Box from '@mui/material/Box';
import "./Filters.css"
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const Filters = ({ handleColorChange, colorFilterChecked, handleGenderChange, genderFilterChecked,
  handleTypeChange, typeFilterChecked, handlePriceChange, priceFilterChecked, onReset }) => {



  return (
    <Box className="filterCard">
      <Box className="innerBox">



        <FormGroup>
          <FormLabel >Color</FormLabel>
          <FormControlLabel
            control={
              <Checkbox checked={'Red' == colorFilterChecked} onChange={handleColorChange} name="Red" value="color" />
            }
            label="Red"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'Blue' == colorFilterChecked} onChange={handleColorChange} name="Blue" value="color" />
            }
            label="Blue"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'White' == colorFilterChecked} onChange={handleColorChange} name="White" value="color" />
            }
            label="White"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'Black' == colorFilterChecked} onChange={handleColorChange} name="Black" value="color" />
            }
            label="Black"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'Grey' == colorFilterChecked} onChange={handleColorChange} name="Grey" value="color" />
            }
            label="Grey"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'Purple' == colorFilterChecked} onChange={handleColorChange} name="Purple" value="color" />
            }
            label="Purple"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'Green' == colorFilterChecked} onChange={handleColorChange} name="Green" value="color" />
            }
            label="Green"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'Pink' == colorFilterChecked} onChange={handleColorChange} name="Pink" value="color" />
            }
            label="Pink"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel >Gender</FormLabel>
          <FormControlLabel
            control={
              <Checkbox checked={'Men' == genderFilterChecked} onChange={handleGenderChange} name="Men" value="gender" />
            }
            label="Men"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'Women' == genderFilterChecked} onChange={handleGenderChange} name="Women" value="gender" />
            }
            label="Women"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel >Price</FormLabel>
          <FormControlLabel
            control={
              <Checkbox checked={'price1' == priceFilterChecked} onChange={handlePriceChange} name="0-₹250" value="price1" />
            }
            label="0-₹250"
          />
          <FormControlLabel
            control={
              <Checkbox checked={"price2" == priceFilterChecked} onChange={handlePriceChange} name="₹251-₹450" value="price2" />
            }
            label="₹251-₹450"
          />
          <FormControlLabel
            control={
              <Checkbox checked={"price3" == priceFilterChecked} onChange={handlePriceChange} name=">₹450" value="price3" />
            }
            label=">₹450"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel >Type</FormLabel>
          <FormControlLabel
            control={
              <Checkbox checked={'Polo' == typeFilterChecked} onChange={handleTypeChange} name="Polo" value="type" />
            }
            label="Polo"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'Hoodie' == typeFilterChecked} onChange={handleTypeChange} name="Hoodie" value="type" />
            }
            label="Hoodie"
          />
          <FormControlLabel
            control={
              <Checkbox checked={'Basic' == typeFilterChecked} onChange={handleTypeChange} name="Basic" value="type" />
            }
            label="Basic"
          />
        </FormGroup>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Button variant="contained" color="error" onClick={onReset}>
            Reset filters
          </Button>
        </Box>

      </Box>
    </Box>
  )
}


export default Filters
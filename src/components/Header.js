import * as React from 'react';
import Box from '@mui/material/Box';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import "./Header.css"
import { useNavigate } from "react-router-dom";

const Header = ({TotalQuantity, hideCart})=> {

const navigate=useNavigate();

 return (
   
    <div>
        <Box className="titleBar"> 
          <Box className="title" onClick={()=>{
            navigate("/")
          }}>
            TeeRex Store
          </Box>
          {hideCart
          ?''
         :<Box className="shoppingIcon" onClick={()=>{
          navigate("/checkout")
        }}> 
          <ShoppingCartOutlinedIcon sx={{ fontSize:40}}/><sup className='superScript'><div className='num'>{TotalQuantity}</div></sup>
       </Box>
          }
        </Box>
    </div>

 )

}

export default Header;
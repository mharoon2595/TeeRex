import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./Search.css"


const Search = ({ onType }) => {

    return (

        <Box sx={{
            marginTop: '10rem',
            marginBottom: '5rem',
            marginLeft:'0',
            marginRight:'0'
        }}
        className="searchBox">
                <TextField fullWidth id="outlined-basic" label="Search for products" variant="outlined" onInput={onType} />
        </Box>
    )
}


export default Search;

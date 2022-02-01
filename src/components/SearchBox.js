import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';


const SearchBox = (props) => {

    return (
      <div>
        <TextField
            
            placeholder={props.placeholder} 
        onChange={props.handleChange}
        
            InputProps={{
             endAdornment: (
          <InputAdornment >
          <IconButton>
            
          </IconButton>
         </InputAdornment>
            )
          }}
       /><SearchIcon />
      </div>
      
    );

  }

  export default SearchBox;
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ReviewTitle = (props) => {

const handleChange = (event)=>{
  props.setEnteredTitle(event.target.value);
};
  return (
    <>
    <TextField 
      onChange={handleChange}
      label="Input title of the Review" 
      error={props.error}
      value = {props.enteredTitle}
      />
    </>
  );
}

export default ReviewTitle;
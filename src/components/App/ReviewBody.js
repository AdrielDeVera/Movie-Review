import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const ReviewBody = (props) => {

const handleChange = (event)=>{
  props.setEnteredReview(event.target.value);
};

  return (
    <>
    <TextField 
        sx={{
          width: { sm: 500, md: 600 },
          "& .MuiInputBase-root": {
              height: 100
          }
      }}
          
          id="outlined-multiline-flexible"
          label="Input title of the Review"
          multiline
          maxRows={4}
          inputProps={{ maxLength: 200 }}
          onChange={handleChange}
          error={props.error}
          value = {props.enteredReview}
        />

    </>
  );
}

export default ReviewBody;
import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const ReviewRating = (props) => {

const handleChange = (event)=>{
  props.setSelectedRating(event.target.value);
};

  return (
    <>

 
    <FormLabel>Select the Rating</FormLabel>
    <br />
    <RadioGroup 

    label= "Select the Rating"  
    value={props.selectedRating} 
    onChange={handleChange}row
    >
          <div style={{ display: 'flex' }}></div>
      <FormControlLabel value="1" control={<Radio />} label="1" />
      <FormControlLabel value="2" control={<Radio />} label="2" />
      <FormControlLabel value="3" control={<Radio />} label="3" />
      <FormControlLabel value="4" control={<Radio />} label="4" />
      <FormControlLabel value="5" control={<Radio />} label="5" />
    </RadioGroup>

    </>
  );
}

export default ReviewRating;
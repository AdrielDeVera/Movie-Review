import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const MovieSelection = (props) => {

  const handleChange = (event)=>{
    props.setSelectedMovie(event.target.value);
  };
  //ERROR
  const {movies} = props;
  // console.log(props.movie)
  
  return (
    <>
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth error={props.error}>
        <InputLabel id="demo-simple-select-label">Pick A Movie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Pick A Movie"
          onChange={handleChange}
        >
          {movies.map((movie) => (
            <MenuItem key={movie.id} value={movie}>
              {movie.name}
            </MenuItem>
          ))}
  
  
        </Select>
      </FormControl>
    </Box>
    </>
  );
}

export default MovieSelection;
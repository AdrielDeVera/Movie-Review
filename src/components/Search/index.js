import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

 
const Search = () => {

  const [movieName, setMovieName] = React.useState("");
  const [movieNameErr, setMovieNameErr] = React.useState('');

  const [actorFirstName, setActorFirstName] = React.useState("");
  const [actorLastName, setActorLastName] = React.useState("");
  const [actorNameErr, setActorNameErr] = React.useState('');

  const [directorFirstName, setDirectorFirstName] = React.useState("");
  const [directorLastName, setDirectorLastName] = React.useState("");
  const [directorNameErr, setDirectorNameErr] = React.useState('');

  const [movies, setMovies] = React.useState([]);

  const serverURL = "";

  const navigate = useNavigate();

  const actorNameOnChange = (event) => {
    let name = event.target.value;
    let actorFirstName = name.split(" ")[0];
    let actorLastName = "";

    if (name.split(" ").length > 1) {
      actorLastName = name.split(" ")[1];
    }
    setActorFirstName(actorFirstName);
    setActorLastName(actorLastName);
  };

  const directorNameOnChange = (event) => {
    let name = event.target.value;
    let directorFirstName = name.split(" ")[0];
    let directorLastName = "";

    if (name.split(" ").length > 1) {
      directorLastName = name.split(" ")[1];
    }

    setDirectorFirstName(directorFirstName);
    setDirectorLastName(directorLastName);
  };


const submitCheck = () =>{

console.log("DISTANCE")
    setActorNameErr("");
    if(actorLastName === ""||actorFirstName === ""){
      setActorNameErr("Enter the Actor's Full Name")
    
    }
    if(actorLastName !== ""&&actorFirstName !== ""){
      setActorNameErr("")
      console.log("DISTANCE CLEARNED 2")
    }

    setDirectorNameErr("");
    if(directorLastName === ""||directorFirstName === ""){
      setDirectorNameErr("Enter the Director's Full Name")
 
    }
    if(directorLastName !== ""&&directorFirstName !== ""){
      setDirectorNameErr("")

    }

    setMovieNameErr("");
    if(movieName=== ""){
      setMovieNameErr("Enter a Movie")

    }
    if(movieName!== ""){
      setMovieNameErr("")

    }

      if (movieName && directorLastName && directorFirstName ) {
        setActorNameErr("");

      var searchData = {
        movieName: movieName,
        actorFirstName: actorFirstName,
        actorLastName: actorLastName,
        directorFirstName: directorFirstName,
        directorLastName: directorLastName
      };
      searchMovies(searchData);


    }

  }


  const searchMovies = async (searchData) => {
    const response = await fetch(serverURL + "/api/getSearchedMovies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    });
    console.log(response);
    const body = await response.json();
    console.log(body);
    setMovies(body.express);
    if (response.status !== 200) throw Error(body.message);
    return body.express;
  };


  return (
    <>
  <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
  
            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/')}
            >
                <Typography variant="h6" color="inherit" noWrap sx={{ mx: 2 }}>
                    Landing
                </Typography>
            </Link>
  
            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/Review')}
            >
                <Typography variant="h6" color="inherit" noWrap sx={{ mx: 2 }}>
                    Review
                </Typography>
            </Link>
  
            <Link 
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => navigate('/MyPage')}
            >
              <Typography variant="h6" color="inherit" noWrap sx={{ mx: 2 }}>
                  MyPage
              </Typography>
          </Link>
            
            <Button color="inherit" sx={{ ml: 'auto' }}>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

{/* DIVIDER */}

<Box sx={{ alignItems:"center",display: 'flex', justifyContent:"center" }}>
      <img src="images/searching.jpg" alt="Shrek" style={{ width: '300px', marginRight: 100}} />
      </Box>


<Box sx={{ textAlign: 'center', mx: 2, my: 2 }}>
          <Typography variant="h2">Search Page</Typography>
          <Typography variant="body1">Input Details to find review info about a Movie</Typography>
  </Box>
      
<Box
        sx={{
          display: "flex",
          // flexDirection: "column", 
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >


        <TextField
        name="movieTitle"
        onChange={(event) => {
          setMovieName(event.target.value);
        }}
        label="Movie Title"
        variant="outlined"
        sx={{ mt: 2, width: '60%', mx: 'auto' }}
      />

      <TextField
        name="actorName"
        onChange={actorNameOnChange}
        label="Actor's Name"
        variant="outlined"
        sx={{ mt: 2, width: '60%', mx: 'auto' }}
      />

      <TextField
        name="directorName"
        onChange={directorNameOnChange}
        label="Director's Name"
        variant="outlined"
        sx={{ mt: 2, width: '60%', mx: 'auto' }}
      />

      <Button
        variant="contained"
        color="success"
      onClick = {submitCheck}
        // onClick={searchMovies}
        sx={{ mt: 2, width: '30%', mx: 'auto' }}
      >
        Search
      </Button>
    </Box>
    <Box
        sx={{
          display: "flex",
          flexDirection: "column", 
          alignItems:"center",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: '5'
        }}
      >
{actorNameErr && <Typography variant="h2" color="error">{actorNameErr}</Typography>}
{directorNameErr && <Typography variant="h2" color="error">{directorNameErr}</Typography>}
{movieNameErr && <Typography variant="h2" color="error">{movieNameErr}</Typography>}


</Box>
    
    <Box
      sx={{
        display: "flex",
        
        flexDirection: "column",
        justifyContent: "center",
        margin: "30px",
      }}
    >
      {movies.map((movie, index) => (
        <Box
          key={index}
          sx={{
            my: 2,
            width: "60%",
            mx: "auto",
            p: 2,
            border: "1px solid #ccc",
          }}
        >
          <Typography variant="h6">{movie.name}</Typography>
          <Typography variant="subtitle1">Director: {movie.director}</Typography>
          {movie.reviewContents ? (
            <Typography variant="subtitle1">
              Reviews:
              <ul>
                {movie.reviewContents.split("|||").map((review, reviewIndex) => (
                  <li key={reviewIndex}>{review}</li>
                ))}
              </ul>
            </Typography>
          ) : (
            <Typography variant="subtitle1">Reviews: N/A</Typography>
          )}
          {movie.avg_review ? (
            <Typography variant="subtitle1">Rating: {movie.avg_review}</Typography>
          ) : (
            <Typography variant="subtitle1">Rating: N/A</Typography>
          )}

        </Box>
      ))}
    </Box>
    </>
  );
};

export default Search;

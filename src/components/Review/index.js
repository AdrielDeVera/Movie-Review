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
import {Grid, Item} from '@mui/material';


import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';

const Review = () => {
  const navigate = useNavigate();
  //const navigate = useNavigate();
  const serverURL = "";


  const [movie,setMovie] = React.useState([]);
  const [review, setReview] = React.useState({
    selectedMovie: '',
    enteredTitle: '',
    enteredReview: '',
    selectedRating: 0,
  });
  const [sentReview, setSentReview] = React.useState({
    enteredTitle: '',
    enteredReview: '',
    selectedRating: '',
    selectedMovieID: 0,
    userID: 1
  });

  const [selectedMovie, setSelectedMovie]= React.useState({});
  const [selectedMovieErr, setSelectedMovieErr]= React.useState('');
  
  const [enteredReview, setEnteredReview]= React.useState('');
  const [enteredReviewErr, setEnteredReviewErr] = React.useState('');

  const [selectedRating, setSelectedRating]= React.useState('');
  const [selectedRatingErr, setSelectedRatingErr] = React.useState('');

  const [enteredTitle, setEnteredTitle]= React.useState('');
  const [enteredTitleErr, setEnteredTitleErr] = React.useState('');

  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [finalMsg, setFinalMsg] = React.useState('');


  const getMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed);
        setMovie(parsed);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
      
  }

  const callApiGetMovies= async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log(response);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found movies: ", body);
    return body;
    
  }

  const callApiAddReview = async (reviewData) => {
    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData)
    });

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body.message);
    return body;
  }

  const addReview = (reviewData) => {
    callApiAddReview(reviewData)
      .then(res => {
        console.log("callApiAddReview returned: ", res)
      })
      .catch(error => {
        console.error("Error addingReview:", error);
      });
  }
    
    React.useEffect(() => {
      getMovies();
    }, []);


  const submitCheck = () =>{
    setSelectedMovieErr("");
    if(selectedMovie === ""){
      setSelectedMovieErr("Select your Movie")
    }
    if(selectedMovie !== ""){
      setSelectedMovieErr("")
    }

    setEnteredReviewErr("");
    if(enteredReview === ""){
      setEnteredReviewErr("Enter your Review")
    }
    if(enteredReview !== ""){
      setEnteredReviewErr("");
    }

    setSelectedRatingErr("")
    if(selectedRating === ""){
      setSelectedRatingErr("Select the Rating")
    }
    if(selectedRating !== ""){
      setSelectedRatingErr("")
    }

    setEnteredTitleErr("")
    if(enteredTitle === ""){
      setEnteredTitleErr("Enter your Review Title")
    }
    if(enteredTitle !== ""){
      setEnteredTitleErr("")
    }


    if (selectedMovie && enteredTitle && enteredReview && selectedRating) {
      setFormSubmitted(true);
    
      setReview({
        selectedMovie: selectedMovie.name,
        enteredTitle: enteredTitle,
        enteredReview: enteredReview,
        selectedRating: selectedRating,
      })
      var reviewData = {
        enteredTitle: enteredTitle,
        enteredReview: enteredReview,
        selectedRating: selectedRating,
        selectedMovieID: selectedMovie.id,
        userID: 1
      };
      addReview(reviewData);
  
      setFinalMsg('Your review has been received!');
      setSelectedMovie('');
      setEnteredTitle('');
      setEnteredReview('');
      setSelectedRating('');
    }
  }

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
              onClick={() => navigate('/Search')}
          >
              <Typography variant="h6" color="inherit" noWrap sx={{ mx: 2 }}>
                  Search
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

    <Box sx={{ alignItems:"center",display: 'flex', justifyContent:"center" }}>
      <img src="images/writing2.jpg" alt="Shrek" style={{ width: '500px', marginRight: 100}} />
      </Box>



      <Grid container spacing={2}>

      <Typography variant="h3">
        Review a Movie
      </Typography>

      <Grid item xs={12}>
   
        <MovieSelection movies={movie} setSelectedMovie={setSelectedMovie} selectedMovie = {selectedMovie} />
        {selectedMovieErr && <Typography color="error">{selectedMovieErr}</Typography>}
      </Grid> 

      <Grid item xs={12}>
        <ReviewTitle setEnteredTitle={setEnteredTitle}  enteredTitle = {enteredTitle}/>
        {enteredTitleErr && <Typography color="error">{enteredTitleErr}</Typography>}
      </Grid>

      <Grid item xs={12}>
        <ReviewBody setEnteredReview={setEnteredReview} enteredReview = {enteredReview} />
        {enteredReviewErr && <Typography color="error">{enteredReviewErr}</Typography>}
      </Grid>

      <Grid item xs={12}>
        <ReviewRating setSelectedRating={setSelectedRating}  selectedRating = {selectedRating}/>
        {selectedRatingErr && <Typography color="error">{selectedRatingErr}</Typography>}
      </Grid>

        <Grid item xs={12}>
        <Button onClick={submitCheck} variant="contained"  sx={{ width: '75%' }} >
          Submit
        </Button>
      </Grid>

      {formSubmitted && (
  <Grid item md={12}>
    <Typography variant="h6" gutterBottom color='green'>
      {finalMsg}
    </Typography>

    <Grid container spacing={2} direction="column">
      <Grid item md={12}>
        <Typography variant="subtitle2">Movie: {review.selectedMovie.name}</Typography>
      </Grid>

      <Grid item md={12}>
        <Typography variant="subtitle2">Title: {review.enteredTitle}</Typography>
      </Grid>

      <Grid item md={12}>
        <Typography variant="subtitle2">Body: {review.enteredReview}</Typography>
      </Grid>

      <Grid item md={12}>
        <Typography variant="subtitle2">Rating: {review.selectedRating}</Typography>
      </Grid>
  </Grid>
</Grid>
)}
      </Grid>
    </>
  );
}

export default Review;
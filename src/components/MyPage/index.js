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


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Divider from '@mui/material/Divider';
import MovieSelection from './MovieSelection';

import {Grid, Item} from '@mui/material';

import 'bootstrap/dist/css/bootstrap.min.css';


const MyPage = () => {


  const [selectedMovie, setSelectedMovie]= React.useState({});
  const [selectedMovieErr, setSelectedMovieErr]= React.useState('');

  const [watchList, setWatchList] = React.useState({
    selectedMovie: ''
  });
  
  const navigate = useNavigate();
  const serverURL = "";
const [ranking,setRanking] = React.useState([]);
const [movie,setMovie] = React.useState([]);

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

React.useEffect(() => {
  getMovies();
}, []);

  const getRankings = () => {
    callApiGetRankings()
      .then(res => {
        console.log("callApiGetRankings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetRankings parsed: ", parsed);


        setRanking(parsed);
      })
      .catch(error => {
        console.error("Error fetching Rankings:", error);
      });
      
  }

  const callApiGetRankings= async () => {
    const url = serverURL + "/api/getRankings";
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
    console.log("Found Rankings: ", body);
    return body;
    
  }

  React.useEffect(() => {
    getRankings();
  }, []);




  const [viewWatchList,setViewWatchList] = React.useState([]);
  const getViewWatchList = () => {
    callApiGetViewWatchList()
      .then(res => {
        console.log("callApiGetRankings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetRankings parsed: ", parsed);


        setViewWatchList(parsed);
      })
      .catch(error => {
        console.error("Error fetching Rankings:", error);
      });
      
  }

  const callApiGetViewWatchList= async () => {
    const url = serverURL + "/api/getMoviesList";
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
    console.log("Found Rankings: ", body);
    return body;
    
  }

  React.useEffect(() => {
    getViewWatchList();
  }, []);


  const callApiAddWatchList = async (watchListData) => {

    const url = serverURL + "/api/addWatchList";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchListData)
    });

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body.message);
    return body;
  }

  const addWatchList = (watchListData) => {
    callApiAddWatchList(watchListData)
      .then(res => {
        console.log("callApiAddWatchList returned: ", res)
      })
      .catch(error => {
        console.error("Error addingWatchList:", error);
      });
  }

  const addMovies = () =>{
    
    setWatchList({
        selectedMovie: selectedMovie.name,
      })
      var watchListData = {
  
        selectedMovieID: selectedMovie.id,
        userID: 1
      };
      addWatchList(watchListData);

  }



const submitCheck = () =>{
  setSelectedMovieErr("");
  if(selectedMovie === ""){
    setSelectedMovieErr("Select your Movie")
  }
  if(selectedMovie !== ""){
    setSelectedMovieErr("")
  }
  if (selectedMovie ) {

    const add_Movies = addMovies()
    setSelectedMovie('');

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
              onClick={() => navigate('/Review')}
          >
              <Typography variant="h6" color="inherit" noWrap sx={{ mx: 2 }}>
                  Review
              </Typography>
          </Link>
          
          <Button color="inherit" sx={{ ml: 'auto' }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>

{/* divider */}

<Box sx={{ alignItems:"center",display: 'flex', justifyContent:"center" }}>
      <img src="images/thinking.jpg" alt="Shrek" style={{ width: '300px', marginRight: 100}} />
      </Box>


<Typography variant="h2">Top 10 Reviewed Movies</Typography>
<TableContainer>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Movie Name</TableCell>
     
                <TableCell align="right"></TableCell>
                <TableCell align="center"> Average Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranking.map((row,index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
            
                  <TableCell align="right">{row.reviewTitle}</TableCell>
                  <TableCell align="center">{row.averageReviewScore}</TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid item xs={12}>


 </Grid> 
 <Divider>Add Movies onto WatchList</Divider>
 <Divider>(Refresh Browser to see Updated List)</Divider>



 <Box
        sx={{
          display: "flex",
          // flexDirection: "column", 
          justifyContent: "center",
          marginTop: "60px",
          // marginBottom: "50px",
        }}
      >

      
   <MovieSelection movies={movie} setSelectedMovie={setSelectedMovie} selectedMovie = {selectedMovie} />

   </Box>

   <Box
      
      sx={{
        display: "flex",
        // flexDirection: "column", 
        justifyContent: "center",
        // marginTop: "50px",
        marginBottom: "-50px",
      }}>
      {selectedMovieErr && <Typography variant="h2" color="error">{selectedMovieErr}</Typography>}
      </Box>


   <Box
      
      sx={{
        display: "flex",
     
        justifyContent: "center",
        marginTop: "50px",
        marginBottom: "50px",
      }}>
   <Button
        variant="contained"
        color="secondary"
        
        onClick={submitCheck}
        sx={{ mt: 2, width: '30%'}}
      >
        Add Movie
      </Button>

 

      </Box>
      <Divider>User Watch List</Divider>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "30px",
      }}
    >
      {viewWatchList.map((movie, index) => (
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
  

        </Box>
      ))}
    </Box>

    
</>

  );
}

export default MyPage;
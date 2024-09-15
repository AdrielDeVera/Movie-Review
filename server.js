import mysql from "mysql";
import config from "./config.js";
import fetch from "node-fetch";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT * FROM movies`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		console.log(string)

		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/getRankings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT DISTINCT M.name, CAST(AVG(R.reviewScore) AS DECIMAL(10,2)) AS averageReviewScore
  FROM movies M
  INNER JOIN movies_directors MD ON M.id = MD.movie_id
  INNER JOIN directors D ON MD.director_id = D.id
  INNER JOIN roles RO ON RO.movie_id = M.id
  INNER JOIN actors A ON A.id = RO.actor_id
  LEFT JOIN Review R ON R.movieID = M.id
  GROUP BY M.name, D.first_name, D.last_name, A.first_name, A.last_name
  ORDER BY averageReviewScore DESC
  LIMIT 10
  `;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		console.log(string)
		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/getMoviesList', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT DISTINCT M.name
  FROM movies M
  LEFT JOIN watch_List R ON R.movieID = M.id
  WHERE R.movieID IS NOT NULL;
  `;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		console.log(string)
	
		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/addReview', (req, res) => {
    var {enteredTitle, enteredReview, selectedRating, selectedMovieID, userID} = req.body;
    var query = 'INSERT INTO Review (reviewTitle, reviewContent, reviewScore, movieID, userID) VALUES (?, ?, ?, ?, ?)';
    var vars = [enteredTitle, enteredReview, selectedRating, selectedMovieID, userID];
	console.log(selectedMovieID);

    let connection = mysql.createConnection(config);

    connection.query(query, vars, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
      }
      res.status(200).json({ status: 'ok', data: 'Review Added' });
    });
    connection.end();
  });

  app.post("/api/getSearchedMovies", (req, res) => {
    let connection = mysql.createConnection(config);
    let movieName = req.body.movieName;
    let actorFirstName = req.body.actorFirstName;
    let actorLastName = req.body.actorLastName;
    let directorFirstName = req.body.directorFirstName;
    let directorLastName = req.body.directorLastName;
  

    let sql = 'SELECT M.name, GROUP_CONCAT(DISTINCT R.ReviewContent SEPARATOR "|||") AS reviewContents, AVG(R.ReviewScore) AS avg_review, GROUP_CONCAT(DISTINCT CONCAT(D.first_name, " ", D.last_name) SEPARATOR \', \')AS director FROM movies M INNER JOIN movies_directors MD ON M.id = MD.movie_id INNER JOIN directors D ON MD.director_id = D.id INNER JOIN roles RO ON RO.movie_id = M.id INNER JOIN actors A ON A.id = RO.actor_id LEFT JOIN Review R ON R.movieID = M.id WHERE M.name like ? AND D.first_name like ? AND D.last_name like ? AND A.first_name like ? AND A.last_name like ? GROUP BY M.id, M.name, D.first_name, D.last_name ORDER BY M.name ASC';
    let data = [
      movieName + "%",
      directorFirstName + "%",
      directorLastName + "%",
      actorFirstName + "%",
      actorLastName + "%",
    ];
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      let string = JSON.stringify(results);
      let obj = JSON.parse(string);
      res.send({ express: obj });
    });
  });

  app.post('/api/addWatchList', (req, res) => {
    var {selectedMovieID,userID} = req.body;
     var query = 'INSERT INTO watch_List (movieID, userID) VALUES ( ?, ?)';
    var vars = [selectedMovieID, userID];
	console.log(selectedMovieID);
    let connection = mysql.createConnection(config);

    connection.query(query, vars, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
      }
      res.status(200).json({ status: 'ok', data: 'watchList Added' });
    });
    connection.end();
  });
  
  

app.listen(port, () => console.log(`Listening on port ${port}`)); 

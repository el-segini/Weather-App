// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express()



/*Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/




//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
let port = 3000
app.listen(port,()=>{
console.log(`the server is running on port ${port}`)
       })



/*post middleware*/
app.post("/saveWeatherData", (req, res) => {
  projectData = { ...req.body };
  console.log(projectData);
  res.end()
});

/*get middleware*/
app.get("/getWeatherData",   (req, res) => {
  res.send(projectData);
});






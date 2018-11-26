const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 5000;

let EBAY_URL = "http://svcs.ebay.com/services/search/FindingService/v1"
    EBAY_URL += "?OPERATION-NAME=findItemsByKeywords"
    EBAY_URL += "&SERVICE-VERSION=1.0.0"
    EBAY_URL += "&SECURITY-APPNAME=TomDrape-epidash-PRD-3c22b8256-c1a615b5"
    EBAY_URL += "&GLOBAL-ID=EBAY-US"
    EBAY_URL += "&RESPONSE-DATA-FORMAT=JSON"
    EBAY_URL += "&REST-PAYLOAD"
    EBAY_URL += "&paginationInput.entriesPerPage=50"

//Bodyparser Middelware - tells express to accept both JSON and urlencoded values
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });

  socket.on('request_to_ebay_api', function(keyword){
        EBAY_URL += `&keywords=${keyword}`
        axios.get(EBAY_URL).then(res => {
            socket.emit('response_received', res.data)
        }).catch(err => console.log(err))
  });

});

http.listen(9000);

// DB Config
const db = require('./config/keys').devDB

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

//connect api routes
//NB: you can add multiple routes here later by copying the line below and replacing  the path
require('./server/routes/api/signin')(app)

app.listen(port, () => console.log(`Server started on port ${port}`));

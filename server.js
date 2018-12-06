const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const mongoose = require('mongoose');
const uuid = require('uuid')
const app = express();

const port = process.env.PORT || 5000;

let EBAY_URL = "http://svcs.ebay.com/services/search/FindingService/v1"
    EBAY_URL += "?OPERATION-NAME=findItemsByKeywords"
    EBAY_URL += "&SERVICE-VERSION=1.13.0"
    EBAY_URL += "&SECURITY-APPNAME=TomDrape-epidash-PRD-3c22b8256-c1a615b5"
    EBAY_URL += "&GLOBAL-ID=EBAY-AU"
    EBAY_URL += "&RESPONSE-DATA-FORMAT=JSON"
    EBAY_URL += "&REST-PAYLOAD"
    EBAY_URL += "&paginationInput.entriesPerPage=100"
    EBAY_URL += "&itemFilter(0).name=LocatedIn&itemFilter(0).value=AU"
    EBAY_URL += "&itemFilter(1).name=HideDuplicateItems&itemFilter(1).value=false"
    EBAY_URL += "&itemFilter(2).name=AvailableTo&itemFilter(2).value=AU"

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

  socket.on('request_to_ebay_api', function(keywords){

    let response = { 
      ebay: [], 
      ali: [], 
      totalEbayEntries: 0,
      totalAliEntries: 0,
      ebayRes: {},
      aliRes: {}
    }

    EBAY_URL += `&keywords=${keywords}`

    //Get current service version for ebay FIndingService api endpoint
    axios.get('http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=getVersion&SERVICE-VERSION=1.2.0&SECURITY-APPNAME=TomDrape-epidash-PRD-3c22b8256-c1a615b5&RESPONSE-DATA-FORMAT=JSON')
      .then(res => console.log(res.data.getVersionResponse[0].version))

    let promise1 = axios.get(EBAY_URL).then(res => {
      let ebayList = []

      response.totalEbayEntries = totalEbayEntries = res.data.findItemsByKeywordsResponse[0].paginationOutput[0].totalEntries
      response.ebayRes = res.data

      if(res.data.findItemsByKeywordsResponse[0].searchResult[0].item){
        ebayList = res.data.findItemsByKeywordsResponse[0].searchResult[0].item.map(item => {
          return ({
              'imageUrl': (item.galleryURL),
              'title': (item.title),
              'lotSize': 1,
              'price': {
                  'currency': item.sellingStatus[0].currentPrice[0]['@currencyId'],
                  'value': item.sellingStatus[0].currentPrice[0]['__value__']
              },
              'id': item.itemId          
          })
  
      })
      response.ebay = ebayList
      }
    }).catch(err => console.log(err))

    let promise2 = axios({
      method: 'post',
      url: 'https://api.aliseeks.com/v1/search',
      data: {
          text: keywords
      },
      headers: {
          'X-Api-Client-Id': 'FPVNMCTQKJOSZPCL'
      }
    }).then(res => {
      response.totalAliEntries = res.data.aggregation.totalCount
      response.aliRes = res.data
      response.ali = res.data.items
    }).catch(err => console.log(err))

    Promise.all([promise1, promise2]).then(() => { 
      console.log("Socket sending search results")
      socket.emit('response_received', response)
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

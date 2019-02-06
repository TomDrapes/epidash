const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//Modules needed for file uploads
const fileUpload = require('express-fileupload')
const cors = require('cors')

const port = process.env.PORT || 5000;

//Bodyparser Middelware - tells express to accept both JSON and urlencoded values
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(cors())
app.use(fileUpload())

//Added for heroku deployment
app.use(express.static(path.resolve(__dirname, 'client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

//Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });
})

http.listen(9000);

//Heroku server
const server = createServer(app)
server.listen(port, err => {
  if(err) throw err;
  console.log('server started')
})

// DB Config
const db = require('./config/keys').mongoURI

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

//connect api routes
//NB: you can add multiple routes here later by copying the line below and replacing  the path
require('./server/routes/api/signin')(app)
require('./server/routes/api/updateShortList')(app)
require('./server/routes/api/aliExpress')(app)
require('./server/routes/api/ebay')(app)
require('./server/routes/api/fileUpload')(app)

//app.listen(port, () => console.log(`Server started on port ${port}`));

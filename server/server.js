const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const podcasts = require('./routes/podcasts');
const advertisers = require('./routes/advertisers');
const path = require('path');


const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('cookie-session');

// serving static files
app.use(express.static('client'))
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());


//routes
app.use('/podcasts', podcasts);
app.use('/advertisers', advertisers);


// forms handling

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


app.get('/', function(req, res){
  console.log('things are happening ...');
  //you can do this
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// routes not found
app.use((req, res) => {
  res.sendStatus(404);
});

// internal server errors
app.use((err, req, res, next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
  console.error(err.stack);
  res.sendStatus(500);
});

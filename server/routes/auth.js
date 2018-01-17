const express = require('express');
const router = express.Router();
const knex = require ('../db/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');






// router.post('/signup')

router.post('/login', (req, res) => {
  console.log('hi' ,req.body);
  // First check to see if we have a req.body
  // If no body is passed in, respond with a 400.
  if (!req.body || !req.body.email || !req.body.password || !req.body.loginType) {
    res.sendStatus(400);
    // this is the long hand version of the line of code above : => res.status(400).send({})
  }

  // We do have the data we need to login a user!
  if (req.body.loginType === 'advertiser') {
    // Make knex call to advertisers table to grab advertiser with email sent from frontend.
    knex('advertisers').where('email', req.body.email).first()
    .then((advertiser) => {
      // Now we want to compare the password from the frontend to the hashed_password stored in the table.
      // This is the callback implementation of the compare function.
      bcrypt.compare(req.body.password, advertiser.hashed_password, (err, success) => {
        if (err) {
          // The passwords do not match, respond with a 401
          res.sendStatus(401);
        }
        // Yay, passwords match, user can be signed in!

        // create token that has advertiser id, secret key (use dotenv)

        // send token over with advertiser information
        res.send('yay')

      })
    })
  }
  else if (req.body.loginType === 'podcaster') {
    // Make knex call to podcasts table to grab podcaster with email sent from frontend.
    knex('podcasts').where('email', req.body.email).first()
    .then((podcaster) => {
      bcrypt.compare(req.body.password, podcaster.hashed_password, (err, success) => {
        if (err) {
          // The passwords do not match, respond with a 401
          res.sendStatus(401);
        }
        // Yay, passwords match, user can be signed in!
        if (success) {
          // go into database and
          let token = jwt.sign({type: req.body.loginType, id: podcaster.id}, 'secerdt key')  // topken info
          res.send({
            token: token,
            podcaster: podcaster
          })
        }

      })
    })
  }

});

router.post('/verifypodcast', (req, res) => {
  var decoded;
  try {
    decoded = jwt.verify(req.body.token, 'secerdt key');
    let userId = decoded.id;
    knex('podcasts').where('id', userId)
      .then( result => {
        let podcast = result[0];
        res.json({
          email: podcast.email,
          summary: podcast.summary,
          tags: podcast.tags,
          name: podcast.name,
          genre: podcast.genre,
          itunes_url: podcast.itunes_url,
          website: podcast.website,
          reader: podcast.reader,
          profile_image: podcast.profile_image,
          contact: podcast.contact,
          subject: podcast.subject,
          demo: podcast.demo,
          loginType: podcast.loginType,
          images: podcast.images
        })
      })
  } catch(err) {
    console.log(err);
    res.send('fail')
  }
  // res.send(decoded)
})

router.post('/verifyadvertiser', (req, res) => {
  var decoded;
  try {
    decoded = jwt.verify(req.body.token, 'secerdt key');
    let userId = decoded.id;
    knex('advertisers').where('id', userId)
      .then( result => {
        let advertiser = result[0];
        res.json({
          email: advertiser.email,
          summary: advertiser.summary,
          tags: advertiser.tags,
          name: advertiser.name,
          genre: advertiser.genre,
          itunes_url: advertiser.itunes_url,
          website: advertiser.website,
          reader: advertiser.reader,
          profile_image: advertiser.profile_image,
          contact: advertiser.contact,
          subject: advertiser.subject,
          demo: advertiser.demo,
          loginType: advertiser.loginType,
          images: advertiser.images
        })
      })
  } catch(err) {
    console.log(err);
    res.send('fail')
  }
  // res.send(decoded)
})

module.exports = router;

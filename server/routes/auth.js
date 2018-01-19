const express = require('express');
const router = express.Router();
const knex = require ('../db/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');






// router.post('/signup')

router.post('/login', (req, res) => {
  console.log(">>>>>>", req.body);

  // console.log('hi' ,req.body);
  // First check to see if we have a req.body
  // If no body is passed in, respond with a 400.
  if (!req.body || !req.body.email || !req.body.password || !req.body.loginType) {
    res.sendStatus(400);
    // this is the long hand version of the line of code above : => res.status(400).send({})
  }

  // We do have the data we need to login a user!
  if (req.body.loginType === 'advertiser') {
    console.log(req.body);
    // Make knex call to advertisers table to grab advertiser with email sent from frontend.
    knex('advertisers').where('email', req.body.email).first()
    .then((advertiser) => {
      console.log(advertiser);
      bcrypt.compare(req.body.password, advertiser.hashed_password, (err, success) => {
        if (err) {
          // The passwords do not match, respond with a 401
          res.sendStatus(401);
        }
        // Yay, passwords match, user can be signed in!
        if (success) {
          // go into database and
          let token = jwt.sign({type: req.body.loginType, id: advertiser.id}, 'secerdt key')  // topken info
          res.send({
            token: token,
            advertiser: advertiser
          })
        }

      })
    })
  }

  else if (req.body.loginType === 'podcaster') {
    // Make knex call to podcasts table to grab podcaster with email sent from frontend.
    // console.log(' accessing podcaster ');
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

router.post('/verify', (req, res) => {
  var decoded;
  try {
    decoded = jwt.verify(req.body.token, 'secerdt key');
    let userId = decoded.id;
    // console.log(decoded);
    if (decoded.type === 'podcaster') {
      // console.log('decoded');
      knex('podcasts').where('id', userId)
      .then( result => {
        let podcast = result[0];
        // console.log(podcast);
        res.json({
          id: decoded.id,
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
          loginType: decoded.type,
          images: podcast.images
        })
      })
    } else {
      knex('advertisers').where('id', userId)
      .then( result => {
        let advertiser = result[0];
        res.json({
          id: advertiser.id,
          email: advertiser.email,
          name: advertiser.name,
          website: advertiser.website,
          location: advertiser.location,
          summary: advertiser.summary,
          demo: advertiser.demo,
          profile_image: advertiser.profile_image,
          contact: advertiser.contact,
          tags: advertiser.tags,
          loginType: decoded.type,
          images: advertiser.images
        })
      })
    }
  } catch(err) {
    // console.log(err);
    res.send('fail')
  }
  // res.send(decoded)
})

module.exports = router;

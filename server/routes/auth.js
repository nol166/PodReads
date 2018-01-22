require('dotenv').config()
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
          let token = jwt.sign({type: req.body.loginType, id: advertiser.id}, process.env.SECRETKEY)  // topken info
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
          let token = jwt.sign({type: req.body.loginType, id: podcaster.id}, process.env.SECRETKEY)  // topken info
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
    decoded = jwt.verify(req.body.token, process.env.SECRETKEY);
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
          email: decoded.email,
          summary: decoded.summary,
          tags: decoded.tags,
          name: podcast.name,
          genre: decoded.genre,
          itunes_url: decoded.itunes_url,
          website: decoded.website,
          reader: decoded.reader,
          profile_image: decoded.profile_image,
          contact: decoded.contact,
          subject: decoded.subject,
          demo: decoded.demo,
          loginType: decoded.type,
          images: decoded.images
        })
      })
    } else {
      knex('advertisers').where('id', userId)
      .then( result => {
        let advertiser = result[0];
        res.json({
          id: decoded.id,
          email: decoded.email,
          name: advertiser.name,
          website: decoded.website,
          location: decoded.location,
          summary: decoded.summary,
          demo: decoded.demo,
          profile_image: decoded.profile_image,
          contact: decoded.contact,
          tags: decoded.tags,
          loginType: decoded.type,
          images: decoded.images
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

const express = require('express');
const router = express.Router();
const knex = require ('../db/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// route to get list of advertisers
router.get('/', (req, res) => {
  knex('advertisers')
    .then((advertisers) => {
      res.send(advertisers)
      });
});

// route to create a advertiser
router.post('/', (req, res, next) => {
  console.log('you cliked submit on the advertiser form');
  // console.log("The request body is: ", req);
  // console.log("REQUEST BODY IS: ", req.body);

  // // add bcrypt thing to create password hash from req.body.password
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash){
      // store password in password db
      knex('advertisers')
      .insert(params(req, hash))
      .returning('*')
      .then(advertisers => {
        let advertiser = advertisers[0];
        let token = jwt.sign({type: req.body.loginType, id: advertiser.id}, process.env.SECRETKEY)  // topken info
        res.send({
          token: token
        })
      })
      .catch(err => next(err))
    })
  })
})

// route to get a single podcast
router.get('/:id', (req, res, next) => {
  knex('advertisers')
    .where({id: req.params.id})
    .first()
    .then(advertiser => res.json(advertiser))
    .catch(err => next(err))
})

// route to edit a podcast
router.patch('/:id', (req, res, next) => {
  // verify token req.body.token
  console.log('hello', req.body);
  knex('advertisers')
    .update({
      id: req.body.advertiser.id,
      email: req.body.advertiser.email,
      name: req.body.advertiser.name,
      website: req.body.advertiser.website,
      location: req.body.advertiser.location,
      summary: req.body.advertiser.summary,
      demo: req.body.advertiser.demo,
      profile_image: req.body.advertiser.profile_image,
      contact: req.body.advertiser.contact,
      tags: req.body.advertiser.tags,
      loginType: req.body.advertiser.loginType,
      images: req.body.advertiser.images
    })
    .where({
      id: req.params.id
    })
    .returning('*')
    .then(advertisers => res.json(advertisers[0]))
    .catch(err => next(err))
})

// route to delete a podcast
router.delete('/:id', (req, res, next) => {
  knex('advertisers')
    .del()
    .where({id: req.params.id})
    .then(() => res.send("deleted the item"))
    .catch(err => next(err))
})



function params(req, hash) {
  return {
    name: req.body.name,
    website: req.body.itunes_url,
    summary: req.body.summary,
    location: req.body.location,
    demo: req.body.demo,
    // subject: req.body.subject,
    profile_image: req.body.profile_image,
    contact: req.body.contact,
    tags: req.body.tags,
    email: req.body.email,
    loginType: req.body.loginType,
    hashed_password: hash
  }
}


// function to validate the information coming in the body of a request
function validate(req, res, next) {
  const errors = [];
  ['name', 'website', 'location', 'summary', 'demo', 'profile_image', 'contact', 'tags', 'email', 'password'].forEach(field => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({field: field, messages: ["cannot be blank"]})
    }
  })
  if (errors.length) return res.status(422).json({errors})
  next()
}


module.exports = router;

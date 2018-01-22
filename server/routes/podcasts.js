const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// route to get list of podcasts
router.get('/', (req, res) => {
  knex('podcasts')
    .then((podcasts) => {
      res.send(podcasts)
    });
});

// route to get a single podcast
router.get('/:id', (req, res, next) => {
  knex('podcasts')
    .where({
      id: req.params.id
    })
    .first()
    .then(podcast => res.json(podcast))
    .catch(err => next(err))
})

// route to edit a podcast

router.patch('/:id', (req, res, next) => {
  // verify token req.body.token
  console.log('hello', req.body);
  knex('podcasts')
    .update({
      name: req.body.podcast.name,
      itunes_url: req.body.podcast.itunes_url,
      summary: req.body.podcast.summary,
      demo: req.body.podcast.demo,
      subject: req.body.podcast.subject,
      profile_image: req.body.podcast.profile_image,
      contact: req.body.podcast.contact,
      tags: req.body.podcast.tags,
      email: req.body.podcast.email,
      loginType: req.body.podcast.loginType,
    })
    .where({
      id: req.params.id
    })
    .returning('*')
    .then(podcasts => res.json(podcasts[0]))
    .catch(err => next(err))
})

// route to delete a podcast
router.delete('/:id', (req, res, next) => {
  knex('podcasts')
    .del()
    .where({
      id: req.params.id
    })
    .then(() => res.send("deleted the item"))
    .catch(err => next(err))
})

// add a new podcast
// THIS IS SIGN UP
router.post('/', (req, res, next) => {
  console.log(">>>>>>", req.body);

  // console.log("The request body is: ", req);
  // console.log("REQUEST BODY IS: ", req.body);

  // // add bcrypt thing to create password hash from req.body.password
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      // store password in password db

      // crate thie jwt

      knex('podcasts')
        .insert(params(req, hash))
        .returning('*')
        .then(podcasts => {
          console.log('login type is: ', req.body.loginType);
          let podcaster = podcasts[0];
          let token = jwt.sign({type: req.body.loginType, id: podcaster.id}, process.env.SECRETKEY)  // topken info
          res.send({
            token: token
          })
        })
        .catch(err => next(err))
    })
  })

})

router.put('/login', (req, res, next) => {
  // console.log("The request body is: ", req);
  // console.log("REQUEST BODY IS: ", req.body);
  knex('podcasts')
    .where({
      email: req.body.email
    })
    .then(() => {
      bcrypt.compare(req.body.password, res.body.hashed_password, function(err, result) {
        if (result) {} else {
          return res.status(401).send()
        }
      })
    })

  // // add bcrypt thing to create password hash from req.body.password

})

// function to clean up the body of the request for easy slotting into the db
function params(req, hash) {
  return {
    name: req.body.name,
    itunes_url: req.body.itunes_url,
    summary: req.body.summary,
    demo: req.body.demo,
    subject: req.body.subject,
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
  ['name', 'itunes_url', 'summary', 'demo', 'subject', 'profile_image', 'contact', 'tags', 'email', 'password'].forEach(field => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({
        field: field,
        messages: ["cannot be blank"]
      })
    }
  })
  if (errors.length) return res.status(422).json({
    errors
  })
  next()
}

module.exports = router;

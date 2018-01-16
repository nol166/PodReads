const express = require('express');
const router = express.Router();
const knex = require ('../db/knex');
const bcrypt = require('bcryptjs');

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
    .where({id: req.params.id})
    .first()
    .then(podcast => res.json(podcast))
    .catch(err => next(err))
})

// route to edit a podcast
router.patch('/:id', validate, (req, res, next) => {
  knex('podcasts')
    .update(params(req))
    .where({id: req.params.id})
    .returning('*')
    .then(podcasts => res.json(podcasts[0]))
    .catch(err => next(err))
})

// route to delete a podcast
router.delete('/:id', (req, res, next) => {
  knex('podcasts')
    .del()
    .where({id: req.params.id})
    .then(() => res.send("deleted the item"))
    .catch(err => next(err))
})

// add a new podcast
router.post('/', (req, res, next) => {
  // console.log("The request body is: ", req);
  // console.log("REQUEST BODY IS: ", req.body);

  // // add bcrypt thing to create password hash from req.body.password
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash){
      // store password in password db
      knex('podcasts')
      .insert(params(req, hash))
      .returning('*')
      .then(podcasts => res.json(podcasts[0]))
      .catch(err => next(err))
    })
  })

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
    hashed_password: hash
  }
}

// function to validate the information coming in the body of a request
function validate(req, res, next) {
  const errors = [];
  ['name', 'itunes_url', 'summary', 'demo', 'subject', 'profile_image', 'contact', 'tags', 'email', 'password'].forEach(field => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({field: field, messages: ["cannot be blank"]})
    }
  })
  if (errors.length) return res.status(422).json({errors})
  next()
}

module.exports = router;

const express = require('express');
const router = express.Router();
const knex = require ('../db/knex')

// route to get list of podcasts
router.get('/', (req, res) => {
  knex('advertisers')
    .then((advertisers) => {
      res.send(advertisers)
      });
});

// route to create a advertiser
router.post('/', (req, res, next) => {
  knex('advertisers')
    .insert(params(req))
    .returning('*')
    .then(advertisers => res.json(advertisers[0]))
    .catch(err => next(err))
})

// route to get a single adver
router.get('/:id', (req, res, next) => {
  knex('advertisers')
    .where({id: req.params.id})
    .first()
    .then(advertiser => res.json(advertiser))
    .catch(err => next(err))
})

// route to edit a podcast
router.patch('/:id', validate, (req, res, next) => {
  knex('advertisers')
    .update(params(req))
    .where({id: req.params.id})
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



function params(req) {
  return {
    name: req.body.name,
    website: req.body.website,
    location: req.body.location,
    summary: req.body.summary,
    demo: req.body.demo,
    profile_image: req.body.profile_image,
    contact: req.body.contact,
    tags: req.body.tags,
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

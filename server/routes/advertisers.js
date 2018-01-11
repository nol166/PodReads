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

// route to create a podcast
router.post('/', (req, res, next) => {
  knex('advertisers')
    .insert(params(req))
    .returning('*')
    .then(advertisers => res.json(advertisers[0]))
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

module.exports = router;

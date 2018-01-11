const express = require('express');
const router = express.Router();
const knex = require ('../db/knex')

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

// route to delete a podcast
router.delete('/:id', (req, res, next) => {
  knex('podcasts')
    .del()
    .where({id: req.params.id})
    .then(() => res.end())
    .catch(err => next(err))
})

// add a new podcast
router.post('/', (req, res, next) => {
  console.log("The request body is: ", req);
  console.log("REQUEST BODY IS: ", req.body);
  knex('podcasts')
    .insert(params(req))
    .returning('*')
    .then(podcasts => res.json(podcasts[0]))
    .catch(err => next(err))
})

function params(req) {
  return {
    name: req.body.name,
    itunes_url: req.body.itunes_url,
    summary: req.body.summary,
    demo: req.body.demo,
    subject: req.body.subject,
    profile_image: req.body.profile_image,
    contact: req.body.contact,
    tags: req.body.tags
  }
}

module.exports = router;

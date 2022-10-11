const express = require('express');
const Contact = require('../models/contact');
const contactRouter = express.Router();

contactRouter.route('/')
.get((req, res, next) => {
  Contact.find()
  .then(contacts => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(contacts);
  })
  .catch(err => next(err));
})
.post((req, res, next) => {
  Contact.create(req.body)
  .then(contact => {
    console.log('Contact created', contact);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(contact);
  })
  .catch(err => next(err));
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('Put - Update is not supported on Contacts');
})
.delete((req, res, next) => {
  Contact.deleteMany()
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

contactRouter.route('/:contactId')
.get((req, res, next) => {
  Contact.findById(req.params.contactId)
  .then(contact => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(contact);
  })
  .catch(err => next(err));
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('Post operation is not supported on Contacts with Id');
})
.put((req, res, next) => {
  Contact.findByIdAndUpdate(req.params.contactId, { $set: req.body}, {new: true})
  .then(contact => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(contact);
  })
  .catch(err => next(err));
})
.delete((req, res, next) => {
  Contact.findByIdAndDelete(req.params.contactId)
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

module.exports = contactRouter;
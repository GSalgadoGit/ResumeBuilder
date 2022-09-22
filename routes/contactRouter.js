const express = require('express');
const contactRouter = express.Router();

contactRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  next();
})
.get((req, res) => {
  res.end('Will send all the Contact information');
})
.post((req, res) => {
  res.end(`Will add the Contact Name: ${req.body.name}, Phone: ${req.body.phone} and Email: ${req.body.email}`)
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('Put - Update is not supported here');
})
.delete((req, res) => {
  res.end('Deleting all Contact information');
});

module.exports = contactRouter;
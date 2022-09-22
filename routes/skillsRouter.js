const express = require('express');
const skillsRouter = express.Router();

skillsRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  next();
})
.get((req, res) => {
  res.end('Will send all the skills information');
})
.post((req, res) => {
  res.end(`Will add the skills Name: ${req.body.name}`)
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('Put - Update is not supported here');
})
.delete((req, res) => {
  res.end('Deleting all skills information');
});

module.exports = skillsRouter;
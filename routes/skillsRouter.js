const express = require('express');
const Skill = require('../models/skill');
const skillRouter = express.Router();

skillRouter.route('/')
.get((req, res, next) => {
  Skill.find()
  .then(skills => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(skills);
  })
  .catch(err => next(err));
})
.post((req, res, next) => {
  Skill.create(req.body)
  .then(skill => {
    console.log('Contact created', skill);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(skill);
  })
  .catch(err => next(err));
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('Put - Update is not supported on Skills');
})
.delete((req, res, next) => {
  Skill.deleteMany()
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

skillRouter.route('/:skillId')
.get((req, res, next) => {
  Skill.findById(req.params.skillId)
  .then(skill => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(skill);
  })
  .catch(err => next(err));
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('Post operation is not supported on Skill with Id');
})
.put((req, res, next) => {
  Skill.findByIdAndUpdate(req.params.skillId, { $set: req.body}, {new: true})
  .then(skill => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(skill);
  })
  .catch(err => next(err));
})
.delete((req, res, next) => {
  Skill.findByIdAndDelete(req.params.skillId)
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

// to push Abilities into skills
skillRouter.route('/:skillId/abilities')
.get((req, res, next) => {
  Skill.findById(req.params.skillId)
  .then(skill => {
    if (skill) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(skill.abilities);
    } else {
      err = new Error(`Skill ${req.params.skillId} not found`);
      err.status = 404;
      return next(err);
    }
  })
  .catch(err => next(err));
})
.post((req, res, next) => {
  Skill.findById(req.params.skillId)
  .then(skill => {
    if (skill) {
      skill.abilities.push(req.body);
      skill.save()
      .then(skill => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(skill);
      })
      .catch(err => next(err));
    } else {
      err = new Error(`Skill ${req.params.skillId} not found`);
      err.status = 404;
      return next(err);
    }
  })
  .catch(err => next(err));
})
.put((req, res) => {
  res.statusCode = 403;
  res.end(`PUT operation not supported on /skills/${req.params.skillId}/abilities`);
})
.delete((req, res, next) => {
  Skill.findById(req.params.skillId)
  .then(skill => {
    if (skill) {
      for (let i = (skill.abilities.length-1); i >= 0; i--) {
        skill.abilities.id(skill.abilities[i]._id).remove();
      }
      skill.save()
      .then(skill => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(skill);
      })
      .catch(err => next(err));
    } else {
      err = new Error(`Skill ${req.params.skillId} not found`);
      err.status = 404;
      return next(err);
    }
  })
  .catch(err => next(err));
});

// to handle individual Abilities from skills
skillRouter.route('/:skillId/abilities/:abilityId')
.get((req, res, next) => {
  Skill.findById(req.params.skillId)
  .then(skill => {
    if (skill && skill.abilities.id(req.params.abilityId)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(skill.abilities.id(req.params.abilityId));
    } else if (!skill) {
      err = new Error(`Skill ${req.params.skillId} not found`);
      err.status = 404;
      return next(err);
    } else {
      err = new Error(`Ability ${req.params.abilityId} not found`);
      err.status = 404;
      return next(err);
    }
  })
  .catch(err => next(err));
})
.post((req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /skills/${req.params.skillId}/abilities/${req.params.abilityId}`);
})
.put((req, res, next) => {
  Skill.findById(req.params.skillId)
  .then(skill => {
    if (skill && skill.abilities.id(req.params.abilityId)) {
      if (req.body.description) {
        skill.abilities.id(req.params.abilityId).description = req.body.description; 
      }
      skill.save()
      .then (skill => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(skill);
      })
      .catch(err => next(err));
    } else if(!skill) {
      err = new Error(`Skill ${req.params.skillId} not found`);
      err.status = 404;
      return next(err);
    } else {
      err = new Error(`Ability ${req.params.abilityId} not found`);
      err.status = 404;
      return next(err);
    }
  })
  .catch(err => next(err));
})
.delete((req, res, next) => {
  Skill.findById(req.params.skillId)
  .then(skill => {
    if (skill && skill.abilities.id(req.params.abilityId)) {
      skill.abilities.id(req.params.abilityId).remove(); 
      skill.save()
      .then (skill => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(skill);
      })
      .catch(err => next(err));
    } else if(!skill) {
      err = new Error(`Skill ${req.params.skillId} not found`);
      err.status = 404;
      return next(err);
    } else {
      err = new Error(`Ability ${req.params.abilityId} not found`);
      err.status = 404;
      return next(err);
    }
  })
  .catch(err => next(err));

});
module.exports = skillRouter;
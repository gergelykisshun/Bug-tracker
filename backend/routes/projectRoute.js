const { Router } = require('express');
const router = Router();
const Project = require('../database/schemas/project');
const User = require('../database/schemas/auth');


router.post('/new', (req, res) => {
  if(!req.user.role === 'manager'){
    return res.status(403).json({msg: 'You are not authorized!'});
  }
  try {
    const {name, description, assignedTo} = req.body;
    if(!name || !description) res.status(400).json({msg: 'Please enter name and description!'});
    Project.create({name, description, assignedTo}, (err, doc) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({doc: doc});
    })
  } catch (err) {
    res.status(400).json({msg: err})
  }
});

router.get('/my-projects', (req, res) => {
  // console.log(req.user.username)
  if(!req.user) res.status(403).json({msg: 'Not authorized!'});

  //maybe I should change to _id
  Project.find({"assignedTo.username": req.user.username}, (err, docs) => {
    if(err) res.json({msg: err})
    res.json({projects: docs})
  })
});

router.post('/new-ticket', (req, res) => {
  if(!req.user) res.status(403).json({msg: 'Unauthorized'})
  const ticketObj = {
    title: req.body.title,
    priority: req.body.priority,
    description: req.body.description
  }
  Project.findByIdAndUpdate({_id: req.body.projectId}, {$push: {tickets: ticketObj}}, (err, doc) => {
    if(err) res.status(400).json({fail: err})
    res.status(200).json({success: 'Ticket added to the project!'});
  })
});

module.exports = router;

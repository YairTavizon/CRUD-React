const express = require('express');
const router = express.Router();


// User Model
const User = require('../models/User');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });
  
  // GET all Tasks
  router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
  });
  
  // ADD a new task
  router.post('/', async (req, res) => {
    const { name, lastName, sex } = req.body;
    const user = new User({name, lastName, sex});
    await user.save(); 
    res.json({status: 'User Saved'});
  });
  
  // UPDATE a new task
  router.put('/:id', async (req, res) => {
    const { name, lastName, sex } = req.body;
    const newUser = {name, lastName, sex};
    await User.findByIdAndUpdate(req.params.id, newUser);
    res.json({status: 'User Updated'});
  });
  
  router.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'User Deleted'});
  });
  



module.exports = router;
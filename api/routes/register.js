import express from 'express'
import jwt from 'jsonwebtoken'
import MongoClient from 'mongodb'
import bcrypt from 'bcrypt'

var router = express.Router();
const client = require('../database/db');
const url = "mongodb://localhost:27017"



router.post ('/auth/login', async (req, res) => {
    try {
    const { email, password } = req.body;
    const db = client.db('zuum');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const token = jwt.sign({ email },
    'secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
    res.json({ message: 'Login successful' });
    client.close();
    }
    catch(err){
        res.status(500) 
    }
})

router.get('/auth/logout', (req, res) => {
    res.clearCookie('token')
    res.send({ message: 'Logout successful' })
})

router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const db = client.db('zuum');
      const usersCollection = db.collection('users');
  
      const userExist = await usersCollection.findOne({ email: email });
      if (userExist) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { name, email, password: hashedPassword };
      await usersCollection.insertOne(user);
      res.json({ message: 'Registration successful' });
      client.close();
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message });
    }
  });
  
// post, get etc

module.exports = router
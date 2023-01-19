import express from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser';
import MongoClient from 'mongodb'

const cookieParser = require('cookie-parser')
const router = express();


router.use(cookieParser())
router.post ('/auth/login', async (req, res) => {
    const { email, password } = req.body
    try{
        if (email === 'bonnetmarvinpro@gmail.com' && password === 'adminadmin') {
            /*const token = jwt.sign({ email
            },
            'secret', { expiresIn: '1h' })
            res.cookie('token', token, { httpOnly: true })
            res.send({ token })*/
            console.log('test')
        }
    }
    catch(err){
        res.status(500) 
    }
})

router.get('/auth/logout', (req, res) => {
    res.clearCookie('token')
    res.send({ message: 'Logout successful' })
})

router.use(bodyParser.json())
const uri = "'mongodb://localhost:27017';"

router.post('/register', async (req, res) => {
    const { name,email, password } = req.body // get data from body
    const user = { name, email, password } // create user object
    try{
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db('Database')
        const result = await db.collection('users').insertOne(user)
        res.status(201).send(result.ops[0])
    }
    catch(err){
        res.status(500).send(err)
        console.log(err)
    }
})
// post, get etc

module.exports = router
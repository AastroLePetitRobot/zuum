import express from 'express'
import jwt from 'jsonwebtoken'
const cookieParser = require('cookie-parser')

const router = express();

router.use(cookieParser())
router.post ('/auth/login', (req, res) => {
    const { email, password } = req.body
    if (email === 'bonnetmarvinpro@gmail.com' && password === 'adminadmin') {
        const token = jwt.sign({ email
        },
        'secret', { expiresIn: '1h' })
        res.cookie('token', token, { httpOnly: true })
        res.send({ token })
    }
})
// post, get etc

module.exports = router
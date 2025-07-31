require('./models/db')
const express = require('express')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'koza'
const User = require('./models/User')
const verifyToken = require('./middleware/verifyToken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'OK' })
})

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const user = new User({ username, email, password: hashedPassword })

        await user.save()
        res.status(201).json({ message: 'User created'})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials'})
        }

        const token = jwt.sign(
            {id: user._id, username: user.username},
            JWT_SECRET,
            { expiresIn: '3h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ message: 'Logged in!' })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

app.get('/api/user-data', verifyToken, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
})

app.get('/api/users/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'})
    }
})

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ error: 'User id not found' })
        }
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format or database error' })
    }
})

app.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await User.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({ message: 'User deleted' })
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format or database error' })
    }
})

app.post('/api/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

app.post('/api/change-password', async (req, res) => {
    try {
        const token = req.cookies.token

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        const isMatch = await bcrypt.compare(req.body.oldPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect'})
        }

        const newHashedPassword = await bcrypt.hash(req.body.newPassword, saltRounds)
        user.password = newHashedPassword
        await user.save()

        res.json({ message: "Password changed"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

const port = 1338
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

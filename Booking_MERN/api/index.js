
const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("./models/User")
require("dotenv").config()
const bcryptsalt = bcrypt.genSaltSync(10)
const jwtSecret = 'SUI'
const jwt = require("jsonwebtoken")
var cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader');
const multer = require('multer')
const fs = require("fs")
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
mongoose.connect(process.env.MONGO_URL)

mongoose.set('strictQuery', false);

app.get("/test", (req, res) => {
    res.json("test ok")
})

//fNzvzYqeegFzQaAY

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptsalt),
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }


})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.status(404).json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ name, email, _id })
        })
    } else {
        res.json(null)
    }

})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })
    res.json(newName)

})

const photoMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles)
})



app.listen(4000);
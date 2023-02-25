
const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("./models/User")
require("dotenv").config()
app.use(express.json())
const bcryptsalt = bcrypt.genSaltSync(10)
const jwtSecret = 'SUI'
const jwt = require("jsonwebtoken")

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))


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


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        userDoc = await User.findOne({ email })
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password)
            if (passOk) {
                jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => { res.cookie("token", token).json('pass ok') })


            } else {
                res.status(422).json("pass not ok")
            }
        } else {
            res.json("not found")
        }
    } catch (e) {
        res.status(422).json(e)
    }


})



app.listen(4000);
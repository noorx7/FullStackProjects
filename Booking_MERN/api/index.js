
const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("./models/User")
require("dotenv").config()
app.use(express.json())
const bcryptsalt = bcrypt.genSaltSync(10)


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))


mongoose.connect(process.env.MONGO_URL)

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

app.listen(4000);
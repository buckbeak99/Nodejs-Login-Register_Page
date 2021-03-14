const express = require("express")
const mysql = require("mysql")
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require("cookie-parser")

dotenv.config({path:'./.env'})
const app = express()

// creating connection with MySQL database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname,'./publc')
//console.log(__dirname)
app.use(express.static(publicDirectory))

// Parse URL encoded bodies
app.use(express.urlencoded({extended:false}))

// Parse JSON bodies
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'hbs')

// Database Conncection with MySQL
db.connect((error) => {
    if(error){
        console.log(error)
    } else {
        console.log("MySQL Database Connected")
    }
})

// server set up
// define routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.listen(5000, ()=> {
    console.log("Server started on Port 5000")
})
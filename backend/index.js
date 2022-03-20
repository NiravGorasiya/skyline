require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const cors =require("cors")
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
//database connection
const { dbConnection } = require("./db/server")
const errorController = require("./middleware/errorController")
app.use(errorController)
dbConnection()
const user = require("./router/user")
const book = require("./router/book")
const prefix = process.env.PREFIX

app.use(prefix + "/user", user)
app.use(prefix + "/book", book)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//not found this page
app.all("*", (req, res) => {
  res.status(404).json({ isSuccess: false, status: 404, message: "page not found" })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 5000}`)
})
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const tasks = require('./routes/tasks')

//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(errorHandlerMiddleware)

//routes

app.use('/api/v1/tasks', tasks)
app.use(notFound)


//app.get('api/v1/tasks')
//app.post('api/v1/tasks')
//app.get('api/v1/tasks/:id')
//app.patch('api/v1/tasks/:id')
//app.delete('api/v1/tasks/:id')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, ()=>{
    console.log(`server is listening on port ${port}...`)})
  } catch (error) {
    console.log(error)
  }
}

start()

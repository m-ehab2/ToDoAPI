const express = require("express");
const morgan = require("morgan");
const connect = require("./Config/db");
const errorHandler = require("./Middlewares/errorHandler");
const app = express();
const authRoutes = require('./Routes/auth')

//----------------------------------Load Env Variables
require('dotenv').config();

//----------------------------------MiddleWare
//----------------------------------Body Parser
app.use(express.json())

//----------------------------------Morgan
app.use(morgan('dev'))

//----------------------------------Routes
app.use('/', authRoutes)


//----------------------------------Error Handler
app.use(errorHandler);

connect(process.env.URI_Local)
app.listen(process.env.PORT, () => {
    console.log('Server Started');
})
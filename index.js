const express = require("express");
const morgan = require("morgan");
const connect = require("./Config/db");
const errorHandler = require("./Middlewares/errorHandler");
const app = express();
const authRoutes = require('./Routes/auth');
const userRouter = require('./Routes/User')
const { checkRole } = require("./Middlewares/rbac");

//----------------------------------Load Env Variables
require('dotenv').config();

//----------------------------------MiddleWare
//----------------------------------Body Parser
app.use(express.json())

//----------------------------------Morgan
app.use(morgan('dev'))

//----------------------------------Routes
app.use('/', authRoutes)
app.use('/profile', checkRole('User'), userRouter)

//----------------------------------Error Handler
app.use(errorHandler);

connect(process.env.URI_Local)
app.listen(process.env.PORT, () => {
    console.log('Server Started');
})
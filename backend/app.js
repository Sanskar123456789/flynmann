const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv/config');                       // env folder import
const mongoose = require('mongoose');           // mongoDb import 
mongoose.set("strictQuery", true);

// cors setting
const cors = require('cors');
app.use(cors());
app.options('*' , cors());

//Environment imports
const api = process.env.api_url;                // global api
const PORT = process.env.PORT || 3000;          // Server port
const Connect = process.env.ConnectionString    // MongoDb con string

// routers imports
const UserRouter = require('./routers/user');
const TopicRouter = require('./routers/topic');

// MiddleWares
app.use(morgan('tiny'));                        // Middleware to tell res speed
app.use(express.json());                        // Middleware to convert req body to JSON

// Routers in main app
app.use(`${api}/user`,UserRouter);
app.use(`${api}/topic`,TopicRouter);

// DataBase Connection
mongoose.connect(Connect)
.then(()=>{
    console.log('Database Connected')
}).catch(err => console.log(err));

// setting port for the server
app.listen(PORT,()=>{
    console.log('Listening on port 3000')
});
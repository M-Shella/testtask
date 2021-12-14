import router from './routes'
import express, { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
config()
// Create express app
var app = express()

// Start server
app.listen(process.env.PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", process.env.PORT.toString()))
});

if (process.env.NODE_ENV == 'development') app.use(morgan('dev'))
if (process.env.NODE_ENV == 'production') app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});


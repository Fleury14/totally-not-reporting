import * as express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { initAPI } from './api/api';
import * as bodyParser from 'body-parser';
import * as db from './db/db'


dotenv.config();

// init app/port
const app:express.Application = express();
const port:number = 8080;



// middleware
app.use(bodyParser.json());


// cors
app.use( (req:express.Request, res:express.Response, next:express.NextFunction) => {
    var allowedOrigins = ['http://192.168.99.100:4200', 'http://localhost:4200']; // origin whitelist
    var origin:any = req.headers.origin;
    if(Array.isArray(origin)) {origin = origin[0];}
    if(allowedOrigins.indexOf(origin) > -1){
         res.header('Access-Control-Allow-Origin', origin);
    }
    // res.header("Access-Control-Allow-Origin", "http://192.168.99.100:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

initAPI(app);

console.log('Testing server file');

app.listen(port, () => { console.log(`Server is listening on port ${port}. Current date is ${new Date()}`); });
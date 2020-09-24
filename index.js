//npm run devstar
import Express from "express";
import products from "./products.js";
import bodyParser from "body-parser";
import createError from 'http-errors';
import passport from 'passport';


import authRouter from "./routes/auth.js";
import tasksRouter from "./routes/tasks.js";
import mongoose from './lib/mongoose.js'; //так нада.
import cors from 'cors';
import runPassport from './middleware/passport.js';
runPassport(passport);



const app = Express();
const port = 3001;



app.use(cors());
app.use(passport.initialize());

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/auth', authRouter);
app.use('/tasks', passport.authenticate('jwt', { session:false }), tasksRouter);







app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server is listening on port ${port}`)
})
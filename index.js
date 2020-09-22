//npm run devstar
import Express from "express";
import products from "./products.js";
import bodyParser from "body-parser";
import createError from 'http-errors';

import authRouter from "./routes/auth.js";
import tasksPouter from "./routes/tasks.js"
import mongoose from './lib/mongoose.js'; //так нада.
import cors from 'cors';


const app = Express();
const port = 3001;

app.use(cors());

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/auth', authRouter);
app.use('/tasks', tasksPouter);

function mid(req, res, next) {
    console.log(req.query);
    console.log(req.params);
    next();
}


app.get("/products/:id", mid, (req, res) => {
    // res.send(req.params.id);
    res.json(products.find((product) => {
        return +req.params.id === product.id
    }));
    // res.send("Hello");
})

app.post("/add", (req, res) => {
    res.send(req.body);
})

app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server is listening on port ${port}`)
})
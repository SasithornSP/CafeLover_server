require('dotenv').config();
const express = require('express');
const Cors = require('cors');
const morgan = require('morgan');

const handlerError = require('./Middlewares/error');
const app = express();

//Routes import
const authRoute = require('./routes/auth-route')
const categoryRoute = require('./routes/category-route')
const productRoute = require('./routes/product-route')
const userRoute = require('./routes/user-route');


//Middlewares
app.use(express.json());
app.use(Cors());
app.use(morgan('dev'));


//Use Routes
app.use("/", authRoute);
app.use("/category",categoryRoute)
app.use("/products",productRoute)
app.use('/',userRoute)

app.use(handlerError)

//Start server
const PORT = 8900;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
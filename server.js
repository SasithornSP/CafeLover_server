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
const paymentRoute =require('./routes/payment-route')

//Middlewares
app.use(express.json());
//ปิดให้เซิร์ฟเวอร์รับและแปลงข้อมูล JSON จาก request body
app.use(Cors());
// เปิดใช้งาน CORS เพื่ออนุญาตให้เว็บอื่นเข้าถึง API
app.use(morgan('dev'));
// ใช้ morgan แสดง log การทำงานของ API ในรูปแบบ dev


//Use Routes
app.use("/", authRoute);
app.use("/category",categoryRoute)
app.use("/products",productRoute)
app.use('/',userRoute)
app.use('/',paymentRoute)

app.use(handlerError)

//Start server
const PORT = 8900;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
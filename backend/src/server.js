const express=require('express')
const cors=require('cors')

import config from "../config"
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
// import express from 'express'
const app=express()
import path from 'path'
const port=2500
import mongoose from 'mongoose'
import userRoute from './routes/UserRoute'
import ProdUser from './routes/ProdUser'
import uploadRoute from './routes/Uploads'
import OrderRoute from './routes/OrderRoute'



dotenv.config();

const mongodbURL=config.MONGODB_URL

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
mongoose.connect(mongodbURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex:true
})
.then(() => console.log('DB Connected!'))
.catch(error=>console.log(error.reason))


app.use('/user/api/createUserAdm',userRoute)
app.use('/user/api',userRoute)
app.use('/product/api',ProdUser)
app.use('/api/uploads', uploadRoute);
app.use('/api/orders',OrderRoute)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))) 
// app.use(express.static(path.join(__dirname, '/../frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
// });


app.listen(port,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})

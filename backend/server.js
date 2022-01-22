import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import uploadRoute from './routes/uploadRoute';
import orderRoute, { newOrderCreated } from './routes/orderRoute';
require('dotenv').config();

const cors = require('cors')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const nodemailer = require('nodemailer');
//const { sendEmail } = require('mail');


const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

const razorpay = new Razorpay({
  key_id: 'rzp_live_mJjejLztXul8W1',
  key_secret: 'NPErEJd7mJaJLEqYnETq2kwU'
})

app.post('/razorpay', async (req, res) => {
  const payment_capture = 1
  const amount = newOrderCreated.totalPrice
  const currency = 'INR'

  const options = {
    amount: amount*100,
    currency,
    receipt: shortid.generate(),
    payment_capture
  }
try{
  const response = await razorpay.orders.create(options)
  console.log(response)
  res.json({
    id: response.id,
    amount: response.amount,
    currency: response.currency
  })
}catch(error){
  console.log(error)
}

})

// email

// app.post('/api/sendmail', (req,res)=>{

//   let data=req.body;
  
//   let smtpTransport = nodemailer.createTransport({
//      service:'gmail' ,
//      //port:465,
//      auth:{
//       user:'',
//       pass:''
//      }
//   });
  
//   let mailOptions={
//     from:'nadeemansariz2000@gmail.com',
//     to:"mohammednadeem010@gmail.com",
//     subject:`Message from ${data.name}`,
//     html:`
    
//     <h3>Informations</h3>
//     <ul>
//       <li>Name: ${data.name}</li>
//       <li>Lastname: ${data.lastname}</li>
//       <li>Email: ${data.email}</li>
    
//     </ul> 
//     <h3>Message</h3> 
//     <p>${data.message}</p>  
    
//     `

// };
//   smtpTransport.sendMail(mailOptions, (error, response)=>{
  
//     if(error){
//         res.send(error)
//         console.log(error)
//     }
//     else{
//       console.log('Email sent');
//         res.send('Success')
//     }

//     smtpTransport.close();
// });
// })



app.listen(5000, () => {
  console.log('Server started at http://localhost:6000');
});
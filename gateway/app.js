import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import proxy from 'express-http-proxy';

dotenv.config();

const app = express();

//middlewares
app.use(express.json()); //Send respones in json fomrat
app.use(morgan('tiny')); //log requests
app.use(cors());

app.use('/api/course/', proxy(process.env.COURSE_SERVICE_URL));
app.use('/api/user/', proxy(process.env.USER_SERVICE_URL));
app.use('/api/enrollment/', proxy(process.env.LEARNING_SERVICE_URL));
app.use('/api/payment/', proxy(process.env.PAYMENT_SERVICE_URL));
app.use('/api/notification/', proxy(process.env.NOTIFICATION_SERVICE_URL));

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

//server config
const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  try {
    console.log(`Gateway is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

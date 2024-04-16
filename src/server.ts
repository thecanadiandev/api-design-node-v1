import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
// allows client to send JSON 
app.use(express.json());
// allows client to send query string parameters
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' });
});

app.use('/api', protect, router);
app.post('/user', createNewUser)
app.post('/signin', signin)

// error handling comes last 
app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized' })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' })
  } else {
    res.status(500).json({ message: 'oops. something went wrong' })
  }
})

export default app;

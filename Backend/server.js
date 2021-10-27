// @ts-nocheck

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
//const auth = require ("./routes/auth")
//import auth from './routes/auth';

const App = express();

App.use(helmet());
App.use(cors());
App.use(express.json());


//App.use('/auth', auth);

App.listen(3000, () => {
    console.log('server is running!')
})
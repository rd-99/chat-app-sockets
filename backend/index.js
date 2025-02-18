import express from 'express';
const app = express();
const port = 3000;
import connectDB  from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption)); 

app.listen(port, () => {
    connectDB();
    console.log(`listening at http://localhost:${port}`);
})


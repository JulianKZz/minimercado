import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './Routes/CiudadRoute.js';
import { getConnection } from './Config/Connection.js';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get('/listarc', router);
app.listen(process.env.PORT, ()=> {
    getConnection();
    console.log(`COnectados a traves del puerto ${process.env.PORT}`)
})
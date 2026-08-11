import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { general_ruter } from './ruteri/general_ruter';
import { login_ruter } from './ruteri/login_ruter';
import { admin_ruter } from './ruteri/admin_ruter';
import admin_kontroler from './kontroleri/admin_kontroler';

const PORT = process.env.PORT || 4000
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

console.log(__dirname)
app.use(['/', '/svi_oglasi', '/admin', '/roba', '/pregled','/portal','/dodaj_oglas','/edit_oglas'],express.static(__dirname + '/public/browser'))

app.get('/',(req,res)=>{
    res.sendFile('public/browser/index.html',{root:__dirname});
})
app.get('/svi_oglasi',(req,res)=>{
    res.sendFile('public/browser/index.html',{root:__dirname});
})
app.get('/admin',(req,res)=>{
    res.sendFile('public/browser/index.html',{root:__dirname});
})
app.get('/roba',(req,res)=>{
    res.sendFile('public/browser/index.html',{root:__dirname});
})
app.get('/pregled',(req,res)=>{
    res.sendFile('public/browser/index.html',{root:__dirname});
})
app.get('/portal',(req,res)=>{
    res.sendFile('public/browser/index.html',{root:__dirname});
})
app.get('/dodaj_oglas',(req,res)=>{
    res.sendFile('public/browser/index.html',{root:__dirname});
})
app.get('/edit_oglas',(req,res)=>{
    res.sendFile('public/browser/index.html',{root:__dirname});
})

mongoose.connect('mongodb://localhost:27017/butik');

const connection = mongoose.connection;
connection.once('open',()=>console.log('mongo ok'));

const ruter = express.Router();

ruter.use('/general',general_ruter)
ruter.use('/login', login_ruter)
ruter.use('/admin', (req,res,next)=>
    {
        
        new admin_kontroler().autentikacija(req,res,next);
     
    },admin_ruter);
app.use('/', ruter);
//app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
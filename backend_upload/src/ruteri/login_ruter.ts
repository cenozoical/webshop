import express from 'express'
import general_kontroler from '../kontroleri/general_kontroler';
import login_kontroler from '../kontroleri/login_kontroler';

export const login_ruter = express.Router();


login_ruter.route("/").post((req,res)=>
    {
        new login_kontroler().login(req,res);
       
    })

import express from 'express'
import general_kontroler from '../kontroleri/general_kontroler';

export const general_ruter = express.Router();


general_ruter.route("/get_background").get((req,res)=>
    {
        
        new general_kontroler().get_background(req,res);
       
    })
general_ruter.route("/get_news").get((req,res)=>
        {
            new general_kontroler().get_news(req,res);
           
        })
general_ruter.route("/get_categories").get((req,res)=>
            {
                new general_kontroler().get_categories(req,res);
               
            })
general_ruter.route("/get_products").get((req,res)=>
                {
                    new general_kontroler().get_products(req,res);
                   
                })
                general_ruter.route("/get_products").post((req,res)=>
                    {
                        new general_kontroler().get_products_alt(req,res);
                       
                    })

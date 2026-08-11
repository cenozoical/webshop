import express from 'express'
import admin_kontroler from '../kontroleri/admin_kontroler';

export const admin_ruter = express.Router();


admin_ruter.route("/add_news").post((req,res)=>
    {
        new admin_kontroler().add_news(req,res);
       
    });
    
    admin_ruter.route("/remove_news").post((req,res)=>
        {
            new admin_kontroler().remove_news(req,res);
           
        })
        admin_ruter.route("/add_category").post((req,res)=>
            {
                new admin_kontroler().add_category(req,res);
               
            })
            admin_ruter.route("/remove_category").post((req,res)=>
                {
                    new admin_kontroler().remove_category(req,res);
                   
                })
                admin_ruter.route("/add_product").post((req,res)=>
                    {
                        new admin_kontroler().add_product(req,res);
                       
                    })
                    admin_ruter.route("/update_product").post((req,res)=>
                        {
                            new admin_kontroler().update_product(req,res);
                           
                        })
                        admin_ruter.route("/remove_product").post((req,res)=>
                            {
                                new admin_kontroler().remove_product(req,res);
                               
                            })
    

import express from 'express';
import { obavestenje_model } from '../modeli_za_bazu/obavestenje';
import { user_model } from '../modeli_za_bazu/user';
import { kategorija_model } from '../modeli_za_bazu/kategorija';
import { oglas_model } from '../modeli_za_bazu/oglas';



export default class admin_kontroler
{


add_news(request:express.Request,response:express.Response)
{
    
    let news = new obavestenje_model(request.body.data);
    news.save().then((povratak)=>
        {
          
           if(povratak == news)
          {
           response.json(povratak);
          }
        })
}
remove_news(request:express.Request,response:express.Response)
{
    let news = new obavestenje_model(request.body.data);
    news.deleteOne().then((povratak)=>
        {
            
           if(povratak["deletedCount"] == 1)
           response.json({"poruka":"uspeh"});
          
        })
}
add_category(request:express.Request,response:express.Response)
{
    let category = new kategorija_model({"kategorija":request.body.data});
    category.save().then((povratak)=>
        {
           if(povratak == category)
          {
           response.json(povratak);
          }
        })
}
remove_category(request:express.Request,response:express.Response)
{
    let category = new kategorija_model(request.body.data);
    category.deleteOne().then((povratak)=>
        {
          
           if(povratak["deletedCount"] == 1)
           response.json({"poruka":"uspeh"});
          
        })
}
add_product(request:express.Request,response:express.Response)
{
    let oglas = new oglas_model(request.body.data);
    oglas.save().then((povratak)=>
        {
           if(povratak == oglas)
          {
           response.json(povratak);
          }
        })
}
update_product(request:express.Request,response:express.Response)
{
    oglas_model.findByIdAndUpdate(request.body.data._id,request.body.data,{returnNewDocument: true }).then((povratak)=>
    {
        
             response.json(povratak);
            
    })
        
   
}
remove_product(request:express.Request,response:express.Response)
{
    let oglas = new oglas_model(request.body.data);
    oglas.deleteOne().then((povratak)=>
        {
            if(povratak["deletedCount"] == 1)
                response.json({"poruka":"uspeh"});
        })
        
   
}
autentikacija(req,res,next) 
    {
     
        user_model.findOne({username:req.body.username,password:req.body.password}).then((rez)=>
        {
           
            if(rez == null) return res.json({"null":"null"});
            else next(); 
        })
    }

}

import express from 'express';
import { general_model } from '../modeli_za_bazu/general';
import { obavestenje_model } from '../modeli_za_bazu/obavestenje';
import { kategorija_model } from '../modeli_za_bazu/kategorija';
import { oglas_model } from '../modeli_za_bazu/oglas';
export default class general_kontroler
{


get_background(request:express.Request,response:express.Response)
{
    
general_model.findOne({}).then((res)=>
{
    
    if(res)
        {
            response.json(res);
        }
    
})



}
get_news(request:express.Request,response:express.Response)
{
obavestenje_model.find({}).then((res)=>
{
    if(res)
        {
           // console.log(res);
            response.json(res);
        }
    
})



}
get_categories(request:express.Request,response:express.Response)
{
kategorija_model.find({}).then((res)=>
{
    if(res)
        {
           // console.log(res);
            response.json(res);
        }
    
})



}
get_products(request:express.Request,response:express.Response)
{
oglas_model.find({}).then((res)=>
{
    if(res)
        {
           // console.log(res);
            response.json(res);
        }
    
})
}
get_products_alt(request:express.Request,response:express.Response)
{
    // console.log(request.body)
    let category = request.body.category;
    let start = request.body.start;
    let count = request.body.count;
    let sort_d = request.body.sort_num;
    let sort_ind = (sort_d%2)*2 -1;
    
    let pipeline = new Array();
    if(!(category ==='')) pipeline.push({$match:{"kategorija":category}});
    // if(sort_d == 0)
    // {
    //    pipeline.push({$sort:{"datum":-1}})
    // }
    // else if(sort_d ==1){
    //     pipeline.push({$sort:{"datum":-1}})

    // }
    // else if(sort_d ==2){
    //     pipeline.push({$sort:{"cena":-1}})

    // }
    // else if(sort_d ==3){
    //     pipeline.push({$sort:{"cena":1}})

    // }
    pipeline.push({$skip:start})
    pipeline.push({$limit:count})
    oglas_model.aggregate(pipeline,{allowDiskUse:true}).then((povratak)=>
    {
        // console.log(povratak)
        response.json(povratak)
    })
    
    
}

}

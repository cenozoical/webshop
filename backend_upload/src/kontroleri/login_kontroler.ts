import express from 'express';
import { user_model } from '../modeli_za_bazu/user';

export default class general_kontroler
{


login(request:express.Request,response:express.Response)
{
user_model.findOne({"username":request.body.username,"password":request.body.password}).then((res)=>
{
    if(res)
        {
            //  console.log(res);
            response.json(res);
        }
    else response.json(null)
})



}

}

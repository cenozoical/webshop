
import  mongoose  from 'mongoose'


const Schema =  mongoose.Schema;  

let User = new Schema(

    {
        username:String,
        password:String
        

    }
    
    
    )
    const user_model = mongoose.model("user_model",User,"users");
    export {user_model};
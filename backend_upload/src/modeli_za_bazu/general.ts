
import  mongoose  from 'mongoose'


const Schema =  mongoose.Schema;  

let General = new Schema(

    {slika:String,
        

    }
    
    
    )
    const general_model = mongoose.model("general_model",General,"general");
    export {general_model};
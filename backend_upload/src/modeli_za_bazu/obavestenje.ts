
import  mongoose  from 'mongoose'


const Schema =  mongoose.Schema;  

let Obavestenje = new Schema(

    {text:String,
        datum:Number,
        datum_string:String
        

    }
    
    
    )
    const obavestenje_model = mongoose.model("obavestenje_model",Obavestenje,"obavestenja");
    export {obavestenje_model};
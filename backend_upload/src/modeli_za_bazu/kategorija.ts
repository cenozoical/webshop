
import  mongoose  from 'mongoose'


const Schema =  mongoose.Schema;  

let Kategorija = new Schema(

    {kategorija:String
        

    }
    
    
    )
    const kategorija_model = mongoose.model("kategorija_model",Kategorija,"kategorije");
    export {kategorija_model};

import  mongoose  from 'mongoose'


const Schema =  mongoose.Schema;  

let Oglas = new Schema(

    { naziv:String,
        cena:Number,
        nova_cena:Number,
        datum:Number,
        datum_snizenja:Number,
        datum_string:String,
        datum_snizenja_string:String,
        opis:String,
        slike:Array,
        kategorija:String
        

    }
    
    
    )
    const oglas_model = mongoose.model("oglas_model",Oglas,"oglasi");
    export {oglas_model};
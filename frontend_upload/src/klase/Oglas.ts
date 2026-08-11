
export class Oglas
{
    _id:string;
    naziv:string;
    cena:number;
    nova_cena:number;
    datum:number
    datum_snizenja:number;
    datum_string:string;
    datum_snizenja_string:string;
    opis:string;
    slike:string[];
    kategorija:string;


    constructor()
    {
        this.slike = new Array()
        this.nova_cena = 0
        this.datum_snizenja = 0
    }
    copy(a:Oglas)
    {
        this._id = a._id;
        this.naziv = a.naziv;
        this.cena = a.cena;
        this.nova_cena = a.nova_cena;
        this.datum = a.datum;
        this.datum_snizenja = a.datum_snizenja;
        this.datum_string = a.datum_string;
        this.datum_snizenja_string = a.datum_snizenja_string;
        this.opis = a.opis;
    
        for(var i = 0 ; i < a.slike.length ; i ++)
        {
            this.slike.push(a.slike[i]);
        }
        this.kategorija = a.kategorija;
    }
    static  inside(niz:Oglas[], element:Oglas) : boolean
    {
        return niz.find((obj)=>
        {
            obj._id === element._id
        }) !== undefined
    }


}
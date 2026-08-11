
export class Obavestenje
{
    datum:number;
    text:string;
    datum_string:string;

    kopija ():Obavestenje
    {
        let temp = new Obavestenje();
        temp.datum = this.datum;
        temp.text = this.text;
        temp.datum_string = this.datum_string;
        return temp;
    }
}
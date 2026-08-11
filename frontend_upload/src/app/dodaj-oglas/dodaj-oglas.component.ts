import { Component } from '@angular/core';
import { Oglas } from '../../klase/Oglas';
import { Kategorija } from '../../klase/Kategorija';
import { GeneralService } from '../../servisi/general.service';
import { AdminService } from '../../servisi/admin.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-oglas',
  templateUrl: './dodaj-oglas.component.html',
  styleUrl: './dodaj-oglas.component.css'
})
export class DodajOglasComponent {

oglas:Oglas;
datum:string;
kategorije:Kategorija[]
slika_path_2:string
pending: boolean
constructor(private gs:GeneralService, private as:AdminService, private router:Router)
{
 this.pending = false;
  this.oglas = new Oglas()
  this.kategorije = new Array()
  if(this.gs.kategorije == null)
  gs.get_categories().subscribe((povratak)=>
  {
    if(povratak)
      {
        this.kategorije = <any[]>povratak;
        this.kategorije.sort((a:any,b:any)=>
        {
         return -a._id +b._id;
        })
        
      }
  })
  else
  {
    this.kategorije = this.gs.kategorije;
  }

}
ukloni_sliku(i:number)
{
this.oglas.slike.splice(i,1);
}
registracija_slike(event:Event,i:number)
  {
    
    let file = (<HTMLInputElement>(event.target)).files[0];
    
    if(file)
    {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ()=>
      {
     // console.log(this.slika_path);
       
          if(i == 1) this.slika_path_2 = null;
         
         var image = new Image();
         image.src = reader.result.toString();
         image.onload = ()=>
         {
           
         
      //    if(image.width <100 || image.width>300||image.height<100||image.height>300)
      //    {
      //    alert("Uneta slika mora ne sme biti manja od 100x100 ili veca od 300x300 pixela");
         
      //  if(i == 0)
      //  { 
      //    //this.radionica.glavna_slika = null;
      // // this.slika_path = null;;
      // }
      //  else if(i == 1) {this.oglas.slike.pop();}
      
      //    }
         }
         let a:string[] = reader.result.toString().split(',');
      //  if(i == 0) ;//this.radionica.glavna_slika = a[0] + ',' +a[1];
        if(i == 1) this.oglas.slike.push(a[0] + ',' +a[1]);
         
      }


    }

  }



  dodaj_oglas()
  {
    this.pending = true;
    let temp_num = Date.parse(this.datum)
   let sale_deadline = new Date(temp_num)
   sale_deadline.setUTCHours(21,59,59,999);
   if(this.oglas.nova_cena != 0 && this.oglas.nova_cena != null&&(this.datum == ''  || this.datum == null ||(sale_deadline.getTime())< Date.now()))
   {
    alert("Pogresno unet datum snizenja")
    return;
   }
   if(this.oglas.nova_cena == null)this.oglas.nova_cena = 0


  this.oglas.datum =Date.now();
  let date = new Date(this.oglas.datum);
  date.setHours(date.getHours() + 2)
  this.oglas.datum_string = date.getUTCDate().toString() + "-" +(date.getUTCMonth() +1).toString() + "-"+date.getUTCFullYear().toString();

  if(this.oglas.nova_cena != 0)
  {
   // this.oglas.datum_snizenja = Date.parse(this.datum)
   
    
    
    
    
    this.oglas.datum_snizenja = sale_deadline.getTime();
    //date.setUTCHours(23,59,59,999);
    this.oglas.datum_snizenja_string = sale_deadline.getUTCDate().toString() + "-" +(sale_deadline.getUTCMonth() +1).toString() + "-"+sale_deadline.getUTCFullYear().toString();

  }
    this.as.add_product(this.oglas).subscribe((povratak)=>
    {

      alert("Oglas je uspesno postavljen!")
      this.pending = false;
      if(this.gs.oglasi != null) this.gs.oglasi.push(<Oglas>povratak);
      this.oglas = new Oglas()
      this.datum = null
      this.slika_path_2 = ""
    })
    
  }
  logout()
{
  localStorage.removeItem("current_user");
  this.router.navigate([''])
}
nazad()
{
  this.router.navigate(['admin'])
}
}

import { Component } from '@angular/core';
import { GeneralService } from '../../servisi/general.service';
import { AdminService } from '../../servisi/admin.service';
import { Oglas } from '../../klase/Oglas';
import { Router } from '@angular/router';
import { Kategorija } from '../../klase/Kategorija';

@Component({
  selector: 'app-edit-oglas',
  templateUrl: './edit-oglas.component.html',
  styleUrl: './edit-oglas.component.css'
})
export class EditOglasComponent {
rezim_izmene:boolean
oglas_edit:Oglas
datum:string;
slika_path_2:string;
kategorije:Kategorija[]
pending:boolean;
  constructor(private gs:GeneralService, private as:AdminService, private ruter:Router)
  {
    this.pending =false;
      if(gs.admin_view_product == null)this.ruter.navigate(["svi_oglasi"]);
      this.oglas_edit =new Oglas();
      this.oglas_edit.copy(gs.admin_view_product);

      this.rezim_izmene = false;
      this.datum = new Date(this.oglas_edit.datum_snizenja).toISOString();
    this.datum = this.datum.substring(0,this.datum.length -1 );
    if(gs.kategorije == null)
    this.gs.get_categories().subscribe((povratak)=>
    {
      this.kategorije = <Kategorija[]>povratak
    })
    else this.kategorije = this.gs.kategorije;
   
    


  }
  checkbox_promena()
  {
   // this.rezim_izmene = !this.rezim_izmene;
    if(!this.rezim_izmene)
    {
      console.log(55)
      this.oglas_edit = new Oglas()
      this.oglas_edit.copy(this.gs.admin_view_product);
      
      this.datum = new Date(this.oglas_edit.datum_snizenja).toISOString();
      this.datum = this.datum.substring(0,this.datum.length -1 )
    }
  }

  sacuvaj_izmene()
  {
    this.pending =true;
      this.as.update_product(this.oglas_edit).subscribe((povratak)=>
      {

        
          alert("Promena uspesno sacuvana.")
          if(this.gs.oglasi!= null)this.gs.oglasi.splice(this.gs.oglasi.indexOf(this.gs.admin_view_product),1);
          this.gs.admin_view_product = this.oglas_edit;
          if(this.gs.oglasi!= null)this.gs.oglasi.push(this.gs.admin_view_product)
          this.rezim_izmene = false;

          this.pending =false;
        
      })
  }
  delete_oglas()
  {
    this.pending =true;
      this.as.remove_product(this.oglas_edit).subscribe((povratak)=>
      {
        alert("Postavka uspesno izbrisana.")
        this.pending =false;
        if(this.gs.oglasi!= null)this.gs.oglasi.splice(this.gs.oglasi.indexOf(this.gs.admin_view_product),1);
          this.ruter.navigate(['svi_oglasi'])
      })
  }
  nazad()
  {
this.ruter.navigate(['svi_oglasi'])
  }
  ukloni_sliku(i:number)
{
this.oglas_edit.slike.splice(i,1);
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
        if(i == 1) this.oglas_edit.slike.push(a[0] + ',' +a[1]);
         
      }


    }

  }

  ngOnDestroy()
  {
    this.gs.admin_view_product = null;
  }
}

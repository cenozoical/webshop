import { Component } from '@angular/core';
import { GeneralService } from '../../servisi/general.service';
import { Oglas } from '../../klase/Oglas';
import { Router } from '@angular/router';
import { Kategorija } from '../../klase/Kategorija';

@Component({
  selector: 'app-roba',
  templateUrl: './roba.component.html',
  styleUrl: './roba.component.css'
})
export class RobaComponent {
  oglasi:Oglas[]
  kategorije:Kategorija[];
  oglasi_prikaz:Oglas[]
  search_category:string;
  sort_category:number;
  loaded:boolean;
  fully_loaded:boolean;
  request_id:number;
constructor(private gs:GeneralService, private ruter:Router)
{
  this.sort_category = 0;
  this.search_category = "sve"
  this.gs.roba = this;
  this.loaded = false;
  if(this.gs.oglasi.length != 0)
  this.loaded = true;
  this.fully_loaded = this.gs.fully_loaded;
  this.oglasi = this.gs.oglasi;
  this.oglasi_prikaz = new Array()
// if(this.gs.oglasi == null)
// gs.get_products().subscribe((povratak)=>
// {
//   if(povratak)
//   {
//     this.loading ++;
//     this.oglasi = <Oglas []> povratak;
//     this.oglasi.sort((a:any,b:any)=>
//       {
//        return -a.datum +b.datum;
//       })
//       this.oglasi_prikaz = new Array()
//       for(var i = 0; i < this.oglasi.length; i ++)
//        this.oglasi_prikaz.push(this.oglasi[i])
//       this.sort_category = 0;
//       this.gs.oglasi = this.oglasi;
//   }
// })
// else 
// {
  
//   this.oglasi = this.gs.oglasi;
//   this.oglasi.sort((a:any,b:any)=>
//     {
//      return -a.datum +b.datum;
//     })
//     this.oglasi_prikaz = new Array()
//     for(var i = 0; i < this.oglasi.length; i ++)
//      this.oglasi_prikaz.push(this.oglasi[i])
//     this.sort_category = 0;
//     this.loading ++;
// }
if(this.gs.kategorije == null)
gs.get_categories().subscribe((povratak)=>
{
  if(povratak) this.kategorije = <Kategorija[]>povratak;
  this.gs.kategorije = new Array()
  for(var i = 0; i < this.kategorije.length;i++)
    this.gs.kategorije.push(this.kategorije[i])
  let sve = new Kategorija()
  sve.kategorija = "sve"
  this.kategorije.splice(0,0,sve)
  

 
  
})
else 
{
  this.kategorije = this.gs.kategorije;
  this.kategorije = new Array()
  for(var i = 0; i < this.gs.kategorije.length;i++)
    this.kategorije.push(this.gs.kategorije[i])
  let sve = new Kategorija()
  sve.kategorija = "sve"
  this.kategorije.splice(0,0,sve)
}
if(this.gs.oglasi.length > 0)this.category_change()
}
pregled(oglas:Oglas)
{
  this.gs.general_view_product = oglas;
  this.ruter.navigate(['pregled'])
}
is_on_sale(oglas:Oglas)
{
  console.log(`sad: ${Date.now()} snizenje: ${oglas.datum_snizenja}`)
  if(oglas.nova_cena == 0) return false;
  else if(oglas.datum_snizenja < Date.now()) return false;
  else return true;
}
category_change()
{
    this.oglasi_prikaz = new Array()
      
    if(this.search_category === "sve")
      for(var i = 0; i < this.oglasi.length; i ++)
        this.oglasi_prikaz.push(this.oglasi[i])
    else
      for (var i = 0 ; i < this.oglasi.length ; i++)
        if(this.oglasi[i].kategorija === this.search_category)
          this.oglasi_prikaz.push(this.oglasi[i]);
    
  this.sorting_change()
}
sorting_change()
{
  
    if(this.sort_category == 0)
      this.oglasi_prikaz.sort((a:Oglas,b:Oglas)=>
    {
        return b.datum - a.datum;
    })
    else if(this.sort_category == 1)
      this.oglasi_prikaz.sort((a:Oglas,b:Oglas)=>
    {
      return a.datum - b.datum;
    })
    else if(this.sort_category == 2)
      this.oglasi_prikaz.sort((a:Oglas,b:Oglas)=>
    {
      let x,y :number;
      x = this.is_on_sale(a)? a.nova_cena : a.cena;
      y = this.is_on_sale(b)? b.nova_cena : b.cena;
      return x - y;
    })
    else if(this.sort_category == 3)
      this.oglasi_prikaz.sort((a:Oglas,b:Oglas)=>
    {
      let x,y :number;
      x = this.is_on_sale(a)? a.nova_cena : a.cena;
      y = this.is_on_sale(b)? b.nova_cena : b.cena;
      return y - x;
    })
    
  
}
ngOnDestroy()
{
  this.gs.roba = null;
}
load_more()
{
  this.loaded = false;
  
  this.gs.get_products_alt(this.oglasi_prikaz.length,'',this.sort_category,5)
}
}

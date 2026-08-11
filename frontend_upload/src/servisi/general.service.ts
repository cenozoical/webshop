import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oglas } from '../klase/Oglas';
import { Kategorija } from '../klase/Kategorija';
import { SviOglasiComponent } from '../app/svi-oglasi/svi-oglasi.component';
import { RobaComponent } from '../app/roba/roba.component';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  admin_view_product:Oglas;
  general_view_product:Oglas;
  kategorije:Kategorija[]
  oglasi:Oglas[]
  svi_oglasi :SviOglasiComponent;
  roba :RobaComponent;
   // uri = ""
    uri = "http://localhost:4000"
  loaded:boolean
  fully_loaded :boolean

  constructor(private http:HttpClient) { 
    this.fully_loaded = false;
    this.loaded = false;
   this.kategorije = null;
    this.oglasi = null;
    this.svi_oglasi = null;
    this.roba = null;
    this.oglasi = new Array()
    this.get_products_alt(0, "",0,8);
  }
  get_background()
  {
    // console.log(5)
    return this.http.get(`${this.uri}/general/get_background`);
  }
  get_news()
  {
    // console.log(5)
    return this.http.get(`${this.uri}/general/get_news`);
  }
  get_categories()
  {
    return this.http.get(`${this.uri}/general/get_categories`);
  }
  get_products()
  {
    return this.http.get(`${this.uri}/general/get_products`);
  }
  ngOnDestroy()
  {
    console.log(444)
  }
  
  get_products_alt(start:number, category:string, sort_num:number, count:number)
  {
    console.log(5)
    const data = {"start":start, "category":category, "sort_num":sort_num,"count":count}
      this.http.post<Oglas[]>(`${this.uri}/general/get_products`,data).subscribe((povratak)=>
    {
      console.log(5)
     // console.log(povratak)
      if(category === '')category ="sve"
     for(var i = 0 ; i < povratak.length; i ++)
       if(!Oglas.inside(this.oglasi,povratak[i]))this.oglasi.push(povratak[i]);
     console.log(this.oglasi.length)
     if(this.roba != null)
     {
      console.log(this.oglasi.length)
      if(category === this.roba.search_category && (sort_num === this.roba.sort_category || sort_num===undefined))
        {
          console.log(this.oglasi.length)
          this.roba.loaded = true;
          if(povratak.length < count)
          {
            this.roba.fully_loaded = true;
            this.fully_loaded = true;
          }
          this.roba.category_change()
        }
     }
     else if (this.svi_oglasi != null)
     {
      this.svi_oglasi.loaded = true;
      if(povratak.length < count)
      {
        this.svi_oglasi.fully_loaded = true;
        this.fully_loaded = true;

      }

     }
   })
}
}
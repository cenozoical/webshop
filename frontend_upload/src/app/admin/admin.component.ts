import { Component } from '@angular/core';
import { Obavestenje } from '../../klase/Obavestenje';
import { Router } from '@angular/router';
import { AdminService } from '../../servisi/admin.service';
import { GeneralService } from '../../servisi/general.service';
import { Kategorija } from '../../klase/Kategorija';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  temp_news:Obavestenje;
  obavestenja:Obavestenje[];
  kategorije:Kategorija[];
  nova_kategorija : Kategorija;
  kategorija_za_brisanje_string:string;
  pending :boolean;
  
  constructor(private ruter:Router, private as:AdminService, private gs:GeneralService)
  {
    this.pending = false;
    this.nova_kategorija = new Kategorija()
    this.kategorija_za_brisanje_string = ""
    this.obavestenja = new Array()
    this.kategorije = new Array()
    if(localStorage.getItem("current_user") == null) ruter.navigate(['portal']);
    this.temp_news = new Obavestenje();
    gs.get_news().subscribe((povratak)=>
    {
      if(povratak)
      {
        this.obavestenja = <Obavestenje[]>povratak;
        this.obavestenja.sort((a:Obavestenje,b:Obavestenje)=>
        {
         return -a.datum +b.datum;
        })
        
      }
    })
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
          this.gs.kategorije = this.kategorije;
         
        }
      })
      else this.kategorije = this.gs.kategorije;
  }
logout()
{
  localStorage.removeItem("current_user");
  this.ruter.navigate([''])
}
dodaj_obavestenje()
{
  this.pending = true;
  this.temp_news.datum = Date.now();
  let date = new Date(this.temp_news.datum);
  date.setHours(date.getHours() + 2)
  this.temp_news.datum_string = date.getUTCDate().toString() + "-" +(date.getUTCMonth() +1).toString() + "-"+date.getUTCFullYear().toString();
  this.as.add_news(this.temp_news).subscribe((povratak)=>
  { 
    if(povratak) 
      {
        
        let temp = <Obavestenje>povratak;
        this.obavestenja.unshift(temp)
        alert("Postavka uspesna");
        this.temp_news = new Obavestenje()
      }
      this.pending = false;
  })
}
izbrisi_obavestenje(obavestenje:Obavestenje)
{
 this.pending = true;
  this.as.remove_news(obavestenje).subscribe((povratak)=>
    {
       
      if(povratak["poruka"]== "uspeh") 
        {
          this.obavestenja.splice(this.obavestenja.indexOf(obavestenje),1 );
          alert("Brisanje je uspesno zavrseno");
        }
        this.pending = false;
    })
}
dodaj_kategoriju()
{
  this.pending = true;
  for(var i = 0;i < this.kategorije.length;i++)
    if(this.nova_kategorija.kategorija === this.kategorije[i].kategorija) 
    {
      alert("Kategorija vec postoji")
      return;
    }
  this.as.add_category(this.nova_kategorija.kategorija).subscribe((povratak)=>
    { 
      if(povratak) 
        {
         
          this.kategorije.unshift(<Kategorija>povratak)
          
          alert("Postavka uspesna");
          this.nova_kategorija = new Kategorija()
        }
        this.pending = false;
    })
}
izbrisi_kategoriju()
{
  this.pending = true;
  let kategorija:Kategorija;
  kategorija = null;
  for(var i = 0;i < this.kategorije.length;i++)
    if(this.kategorija_za_brisanje_string === this.kategorije[i].kategorija) kategorija = this.kategorije[i]
  if(kategorija == null)
  {
    alert("Pogresno uneta kategorija!")
    return
  }

  this.as.remove_category(kategorija).subscribe((povratak)=>
    {
        
      
      if(povratak["poruka"]== "uspeh") 
        {
          this.kategorije.splice(this.kategorije.indexOf(kategorija),1 );
          alert("Brisanje je uspesno zavrseno");
          this.kategorija_za_brisanje_string = ""
        }
        this.pending = false;
    })
}
}

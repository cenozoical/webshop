import { Component } from '@angular/core';
import { GeneralService } from '../../servisi/general.service';
import { Router } from '@angular/router';
import { Oglas } from '../../klase/Oglas';

@Component({
  selector: 'app-svi-oglasi',
  templateUrl: './svi-oglasi.component.html',
  styleUrl: './svi-oglasi.component.css'
})
export class SviOglasiComponent {
oglasi:Oglas[]
loading:number
loaded:boolean;
fully_loaded:boolean;
  constructor(private gs:GeneralService,private router:Router)
  {
    this.gs.svi_oglasi = this;
    this.loaded = true;
    this.fully_loaded = this.gs.fully_loaded;
    this.loading = 0;
      if(!localStorage.getItem('current_user')) 
        this.router.navigate(['']);
      // if(this.gs.oglasi == null)
      // gs.get_products().subscribe((response)=>
      // {

      //   this.oglasi =<Oglas []> response;
      //   this.oglasi.sort((a:any,b:any)=>
      //     {
      //      return -a.datum +b.datum;
      //     })
      //     this.gs.oglasi = this.oglasi;
      //     this.loading = 1;
      // })
      // else{
      //   this.oglasi = this.gs.oglasi;
      //   this.oglasi.sort((a:any,b:any)=>
      //     {
      //      return -a.datum +b.datum;
      //     })
      //     this.loading = 1;
      // }
  this.oglasi = this.gs.oglasi;
  }
pregledaj_oglas(oglas:Oglas)
{
  this.gs.admin_view_product = oglas;
  this.router.navigate(['edit_oglas']);
}
nazad()
{
  this.router.navigate(['admin'])
}
ngOnDestroy()
{
  this.gs.svi_oglasi = null;
}

load_more()
{
  this.loaded = false;
  this.gs.get_products_alt(this.oglasi.length,'',0,5)
}
}

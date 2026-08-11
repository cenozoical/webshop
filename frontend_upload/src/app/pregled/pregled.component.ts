import { Component } from '@angular/core';
import { GeneralService } from '../../servisi/general.service';
import { Oglas } from '../../klase/Oglas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrl: './pregled.component.css'
})
export class PregledComponent {
oglas:Oglas
index:number
  constructor(private gs:GeneralService, private router:Router)
  {
      this.index = 0;
      if(gs.general_view_product == null)
        this.router.navigate(['']);
      this.oglas = this.gs.general_view_product;

  }
  decrement()
  {
    this.index --;
  }
  increment()
  {
    this.index ++ ;
  }
  is_on_sale(oglas:Oglas)
{
  if(oglas.nova_cena == 0) return false;
  else if(oglas.datum_snizenja < Date.now()) return false;
  else return true;
}
  
  ngOnDestroy()
  {
    this.gs.general_view_product = null;
  }

}

import { Component } from '@angular/core';
import { GeneralService } from '../../servisi/general.service';
import { Obavestenje } from '../../klase/Obavestenje';
import { Router, RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-naslovna',
  templateUrl: './naslovna.component.html',
  styleUrl: './naslovna.component.css'
})
export class NaslovnaComponent {
slika:string;
obavestenja:Obavestenje[]
  constructor(private gs:GeneralService, private router:Router)
  {
    this.obavestenja = new Array();
    gs.get_background().subscribe((povratak:any)=>
    {
        console.log(povratak);
        this.slika = povratak.slika;
    })
    gs.get_news().subscribe((povratak)=>
      {
        if(povratak)
        {
          this.obavestenja = <Obavestenje[]>povratak;
          this.obavestenja.sort((a:Obavestenje,b:Obavestenje)=>
          {
           return -a.datum +b.datum;
          })
          console.log(povratak);
        }
      })
  }
  goto_roba()

  {
    this.router.navigate(['roba']);
  }
  goto_admin()
  {
    this.router.navigate(['admin'])
  }
  goto_naslovna()
  {
    this.router.navigate([''])
  }
}

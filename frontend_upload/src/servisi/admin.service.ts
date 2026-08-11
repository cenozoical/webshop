import { Injectable } from '@angular/core';
import { Obavestenje } from '../klase/Obavestenje';
import { HttpClient } from '@angular/common/http';
import { User } from '../klase/User';
import { Kategorija } from '../klase/Kategorija';
import { Oglas } from '../klase/Oglas';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 username:string;
 password:string;
  // uri = ""
  uri = "http://localhost:4000"
  constructor(private http:HttpClient) {
    
    let korisnik = JSON.parse(localStorage.getItem("current_user"));
    if(korisnik == null)return;
    this.username = korisnik.username;
    this.password = korisnik.password;
   }

  add_news(news:Obavestenje)
  {
     const data = {"username":this.username,"password":this.password,"data":news};
     return this.http.post(`${this.uri}/admin/add_news`,data);
  }
  remove_news(news:Obavestenje)
  {
    const data = {"username":this.username,"password":this.password,"data":news};
     return this.http.post(`${this.uri}/admin/remove_news`,data);
  }
  add_category(kategorija:string)
  {
    const data = {"username":this.username,"password":this.password,"data":kategorija};
    return this.http.post(`${this.uri}/admin/add_category`,data);
  }
  remove_category(kategorija:Kategorija)
  {
    const data = {"username":this.username,"password":this.password,"data":kategorija};
     return this.http.post(`${this.uri}/admin/remove_category`,data);
  }
  add_product(oglas:Oglas)
  {
    const data = {"username":this.username,"password":this.password,"data":oglas};
     return this.http.post(`${this.uri}/admin/add_product`,data);
  }
  update_product(oglas:Oglas)
  {
    const data = {"username":this.username,"password":this.password,"data":oglas};
     return this.http.post(`${this.uri}/admin/update_product`,data);
  }
  remove_product(oglas:Oglas)
  {
    const data = {"username":this.username,"password":this.password,"data":oglas};
     return this.http.post(`${this.uri}/admin/remove_product`,data);
  }
}

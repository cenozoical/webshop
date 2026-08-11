import { Component } from '@angular/core';
import { UserService } from '../../servisi/user.service';
import { Router } from '@angular/router';
import { AdminService } from '../../servisi/admin.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent {
username:string;
password:string;
pending:boolean;
  constructor(private us:UserService, private router:Router, private as:AdminService)
  {
    this.pending = false;
    if(localStorage.getItem("current_user") != null) router.navigate(['admin']);
  }

  login()
  {
    this.pending = true;
    this.us.login(this.username,this.password).subscribe((odgovor
    )=>
    {
     
      if(odgovor)
      {
         if(JSON.stringify(odgovor) == JSON.stringify({poruka:"greska"}))
         {alert("Doslo je do greske")}
         else 
         {//nasli smo korisnika
         // this.servis.current_user = <User>odgovor;
         localStorage.setItem("current_user",JSON.stringify(odgovor));
         this.as.username = this.username;
         this.as.password = this.password;

         // let tip:String;
         // tip = odgovor.tip;
          this.router.navigate(["admin"]);
         }

      }
      else
      {
        //res = null , znaci pogresno uneti podaci
        alert("Uneli ste pogresno korisnicko ime/lozinku");//naravno ovaj odgovor ima smisla jer sam tako postavio 
        //sistem
      }
      this.pending = false;
    })
  }

}

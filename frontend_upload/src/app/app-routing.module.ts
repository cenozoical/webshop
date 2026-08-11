import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaslovnaComponent } from './naslovna/naslovna.component';
import { AdminComponent } from './admin/admin.component';
import { PortalComponent } from './portal/portal.component';
import { RobaComponent } from './roba/roba.component';
import { PregledComponent } from './pregled/pregled.component';
import { SviOglasiComponent } from './svi-oglasi/svi-oglasi.component';
import { DodajOglasComponent } from './dodaj-oglas/dodaj-oglas.component';
import { EditOglasComponent } from './edit-oglas/edit-oglas.component';

const routes: Routes = [{path:'',component:NaslovnaComponent},
  {path:'admin',component:AdminComponent},
  {path:'portal',component:PortalComponent},
  {path:'roba',component:RobaComponent},
  {path:'pregled',component:PregledComponent},
  {path:'svi_oglasi',component:SviOglasiComponent},
  {path:'dodaj_oglas',component:DodajOglasComponent},
  {path:'edit_oglas',component:EditOglasComponent}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

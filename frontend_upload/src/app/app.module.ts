import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaslovnaComponent } from './naslovna/naslovna.component';
import { AdminComponent } from './admin/admin.component';
import { PortalComponent } from './portal/portal.component';
import { RobaComponent } from './roba/roba.component';
import { PregledComponent } from './pregled/pregled.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DodajOglasComponent } from './dodaj-oglas/dodaj-oglas.component';
import { EditOglasComponent } from './edit-oglas/edit-oglas.component';
import { SviOglasiComponent } from './svi-oglasi/svi-oglasi.component';

@NgModule({
  declarations: [
    AppComponent,
    NaslovnaComponent,
    AdminComponent,
    PortalComponent,
    RobaComponent,
    PregledComponent,
    DodajOglasComponent,
    EditOglasComponent,
    SviOglasiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

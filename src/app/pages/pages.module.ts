import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';

import { ProjectByIdComponent } from './project-by-id/project-by-id.component';
import { ProjectsComponent } from './projects/projects.component';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { authenticatedReducer } from './authStore/auth.store';
import { PublicationsComponent } from './publications/publications.component';
import { PublicationByTermComponent } from './publication-by-term/publication-by-term.component';
import { ParrafoSplitPipe } from './pipe/parrafo-split.pipe';
import { ReversePipe } from './pipe/reverse.pipe';
import { PortfolioFirstPipe } from './pipe/portfolio-first.pipe';




@NgModule({
  declarations: [
    AboutComponent,
    ContactsComponent,
    HomeComponent,
    ProjectByIdComponent,
    ProjectsComponent,
    PagesComponent,
    LoginComponent,
    PublicationsComponent,
    PublicationByTermComponent,
    ParrafoSplitPipe,
    ReversePipe,
    PortfolioFirstPipe
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('auth', authenticatedReducer),
  ],
  exports:[
    AboutComponent,
    ContactsComponent,
    HomeComponent,
    ProjectByIdComponent,
    ProjectsComponent,
    PagesComponent,
    LoginComponent
  ]
})
export class PagesModule { }

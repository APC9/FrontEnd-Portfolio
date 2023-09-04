import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AdminpagesRoutingModule } from './adminpages-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsEffects } from './store/project/projects.effects';
import { projectsReducer } from './store/project/projects.reducer';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AdminPagesComponent } from './admin-pages.component';
import { RouterModule } from '@angular/router';
import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { PublicationsComponent } from './publications/publications.component';
import { ProjectsComponent } from './projects/projects.component';


@NgModule({
  declarations: [
    CreateProjectComponent,
    AdminPagesComponent,
    CreatePublicationComponent,
    PublicationsComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    AdminpagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('projects', projectsReducer),
    EffectsModule.forFeature( ProjectsEffects),
  ],
  exports: [
    CreateProjectComponent,
    AdminPagesComponent,
    CreatePublicationComponent,
    PublicationsComponent,
    ProjectsComponent
  ]
})
export class AdminpagesModule { }

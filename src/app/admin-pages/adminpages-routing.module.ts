import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AdminPagesComponent } from './admin-pages.component';
import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { PublicationsComponent } from './publications/publications.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPagesComponent,
    children: [
      { path: 'create-project/:id', component: CreateProjectComponent },
      { path: 'create-publication/:id', component: CreatePublicationComponent},
      { path: 'publications', component: PublicationsComponent},
      { path: 'projects', component: ProjectsComponent},
      { path: '', component: ProjectsComponent},
    ]
  },
  { path: '**', redirectTo: 'projects'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminpagesRoutingModule { }

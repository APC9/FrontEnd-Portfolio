import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { ContactsComponent } from './contacts/contacts.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectByIdComponent } from './project-by-id/project-by-id.component';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { PublicationsComponent } from './publications/publications.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'inicio', component: HomeComponent  },
      { path: 'about', component: AboutComponent  },
      { path: 'projects', component: ProjectsComponent  },
      { path: 'publications', component: PublicationsComponent  },
      { path: 'project/:id', component: ProjectByIdComponent  },
      { path: 'contactos', component: ContactsComponent  },
      { path: 'login', component: LoginComponent  },
      { path: '**', redirectTo: 'inicio'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'apc',
    loadChildren: () => import( './pages/pages.module').then( m  => m.PagesModule )
  },
  {
    path: 'dashboard',
    canActivate: [ authGuard ],
    loadChildren: () => import( './admin-pages/adminpages.module').then( m  => m.AdminpagesModule )
  },
  {
    path:'',
    redirectTo: 'apc',
    pathMatch: "full"
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Subscription, delay, filter } from 'rxjs';

import { Project } from '../../models/project.model';
import { projectsState } from '../../admin-pages/store/project/projects.reducer';
import * as actionProjects from '../../admin-pages/store/project/projects.actions';

@Component({
  selector: 'app-projectos',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy{

  public projects!: Project[];
  public authenticated!: boolean;
  public imgRef!: string;

  private router = inject(Router);
  private store = inject( Store<projectsState>);
  private clearSubscriptions!: Subscription;
  private authClearSubscriptions!: Subscription;


  ngOnInit(): void {
    this.clearSubscriptions = this.store.select('projects')
      .pipe(
        filter( ({projects })=>  projects.length > 0),
      )
      .subscribe(({projects})=>{
        this.projects = projects;
        projects.map( (project:Project) => this.imgRef = `../../../assets/img/${project.technologies[0].toLowerCase()}.png` )
    })

    this.authClearSubscriptions = this.store.select('auth').subscribe( (auth) => this.authenticated = auth.isAuthenticated)
    this.store.dispatch( actionProjects.loadProjects() )
  }

  ngOnDestroy(): void {
    this.clearSubscriptions.unsubscribe()
    this.authClearSubscriptions.unsubscribe()
  }

  redirectToProject(id: string){
    this.router.navigateByUrl(`/apc/project/${id}`)
  }



}

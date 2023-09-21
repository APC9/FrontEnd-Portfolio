import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Project } from 'src/app/models/project.model';
import { Subscription, delay, filter } from 'rxjs';
import { loadProject, loadProjects } from '../../admin-pages/store/project/projects.actions';
import { projectsState } from '../../admin-pages/store/project/projects.reducer';



@Component({
  selector: 'app-projecto-by-id',
  templateUrl: './project-by-id.component.html',
  styleUrls: ['./project-by-id.component.css']
})
export class ProjectByIdComponent implements OnInit, OnDestroy {


  public project!: Project;

  private store = inject( Store<projectsState>);
  private route = inject(ActivatedRoute);
  private clearSubscriptions!: Subscription;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.clearSubscriptions = this.store.select('projects')
      .pipe(
        filter( resp => resp.project.length > 0 ),
        delay(200),
      )
      .subscribe(({project}) => {
        if( project ){
          this.project = project[0] as Project
        }

      })

    this.store.dispatch( loadProject({id}))
    this.store.dispatch( loadProjects() )
  }

  ngOnDestroy(): void {
    this.clearSubscriptions.unsubscribe()
  }

}

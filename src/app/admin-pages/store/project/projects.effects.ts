import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { Project } from '../../../models/project.model';

import * as projectsActions from './projects.actions';
import { ProjectsService } from 'src/app/services/projects.service';
import { deleteProject, updateProject } from './projects.actions';


@Injectable()
export class ProjectsEffects{

  private actions$ = inject(Actions);
  private projectsService = inject(ProjectsService);

  loadProjects$ = createEffect( () => this.actions$
    .pipe(
      ofType( projectsActions.loadProjects ),
      mergeMap( ()=> this.projectsService.getProjects()
        .pipe(
          map( (project: Project[]) => projectsActions.loadProjectsSucces({project})),
          catchError( (error)=> of( projectsActions.errorloadProjects({payload: error}) ) )
        ))
    )
  )


  loadProject$ = createEffect( () => this.actions$
  .pipe(
    ofType( projectsActions.loadProject ),
    mergeMap( (action)=> this.projectsService.getProjectsById(action.id)
      .pipe(
        map( (project: Project) => projectsActions.loadProjectSucces({project: [{...project}] } )),
        catchError( (error)=> of( projectsActions.errorloadProjects({payload: error}) ) )
      ))
    )
  )

  updateProject$ = createEffect( () => this.actions$
    .pipe(
      ofType( projectsActions.updateProject ),
      mergeMap( ({id, project })=> this.projectsService.updateProjects(id, project)
        .pipe(
          map( (project: Project) =>  projectsActions.updateProjectSucces({ project })  ),
          catchError( (error)=> of( projectsActions.errorloadProjects({payload: error}) ) )
        ))
      )
    )

  deleteProject = createEffect( () => this.actions$
    .pipe(
      ofType( projectsActions.deleteProject ),
      mergeMap( (action)=> this.projectsService.deleteProject(action.id)
        .pipe(
          map( () => projectsActions.deleteProjectSucces({ id: action.id }) ),
          catchError( (error ) => of( projectsActions.deleteProjectError({ payload: error })))
        )
      )
    )
  )

}


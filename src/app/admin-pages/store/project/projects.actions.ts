import { createAction, props } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';


export const loadProjects = createAction( '[Projects Component] load Projects');

export const loadProjectsSucces = createAction(
  '[Projects Component] load Projects Succes',
  props<{ project: Project[] }>()
);

export const errorloadProjects = createAction(
 '[Projects Component] Error load Projects',
 props<{ payload: any }>()
);

export const loadProject = createAction(
  '[Projects Component] load Project',
  props<{ id: string }>()
);

export const loadProjectSucces = createAction(
 '[Projects Component] load Projects Succes',
 props<{ project: Project[] }>()
);

export const errorloadProject = createAction(
 '[Projects Component] Error load Projects',
 props<{ payload: any }>()
);

export const deleteProject = createAction(
  '[Projects Component] delete Project',
  props<{ id: string }>()
)

export const deleteProjectSucces = createAction(
  '[Projects Component] delete Project Succes',
  props<{  id: string }>()
)

export const deleteProjectError = createAction(
  '[Projects Component] delete Project Error',
  props<{ payload: any }>()
)

export const updateProject = createAction(
  '[Projects Component] update Project',
  props<{  id: string, project: Project }>()
)

export const updateProjectSucces = createAction(
  '[Projects Component] update Project Succes',
  props<{  project: Project  }>()
)

export const updateProjectError = createAction(
  '[Projects Component] delete Project Error',
  props<{ payload: any }>()
)



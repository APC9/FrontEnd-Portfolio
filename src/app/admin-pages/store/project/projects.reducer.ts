import { Action, createReducer, on } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import { deleteProject, deleteProjectError, deleteProjectSucces, errorloadProject, errorloadProjects, loadProject, loadProjectSucces, loadProjects, loadProjectsSucces, updateProject, updateProjectSucces } from './projects.actions';

export interface projectsState{
  projects: Project[];
  project: Project[];
  isLoading: boolean;
  error: null;
}

export const initialState: projectsState = {
  projects: [],
  project: [],
  isLoading: true,
  error: null,
}


const _projectsReducer = createReducer(
  initialState,
  on( loadProjects, (state) => ({ ...state, isLoading: true }) ),
  on( loadProjectsSucces, (state, { project }) => ({
      ...state,
     projects: [...project ],
     isLoading: false
    }) ),
  on( errorloadProjects, (state, {payload}) => ({
      ...state,
      error: payload
    }) ),


  on( loadProject, (state, { id }) => ({
    ...state,
    project: state.projects.filter( pro => pro._id === id ),
    isLoading: false,
   }) ),
   on( loadProjectSucces, (state, { project }) => ({
    ...state,
    project: [...project],
    isLoading: false
  }) ),
  on( errorloadProject, (state, {payload}) => ({
    ...state,
    error: payload
  })),


  on( updateProject, (state, { project, id }) => {
    const newProjects = state.projects.map( ( pro ) => pro._id === id ? { ...pro, ...project }: pro );
    return{
      ...state,
      projects: newProjects,
      isLoading: false,
    }
   }),
   on( updateProjectSucces, (state, { project }) => {
    const newProjects = state.projects.map( ( pro ) => pro._id === project._id ? { ...pro, ...project }: pro );
    return{
      ...state,
      projects: newProjects,
      isLoading: false,
    }
   }),
  on( errorloadProject, (state, {payload}) => ({
    ...state,
    error: payload
  })),


  on( deleteProject, (state, { id }) => ({
    ...state,
    projects: state.projects.filter( pro => pro._id !== id ),
    isLoading: false
  })),
  on( deleteProjectSucces, (state, { id }) => ({
    ...state,
    isLoading: false
  })),
  on( deleteProjectError, (state, { payload }) =>({
    ...state,
    error: payload
  })),
);

export function projectsReducer(state: projectsState | undefined, action: Action) {
  return _projectsReducer(state, action);
};



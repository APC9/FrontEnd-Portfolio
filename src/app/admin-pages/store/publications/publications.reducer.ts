import { Action, createReducer, on } from '@ngrx/store';
import { Publication } from 'src/app/models/publication.model';
import { deletepublication, deletepublicationError, deletepublicationSucces, errorloadpublication, errorloadpublications, loadpublication, loadpublicationSucces, loadpublications, loadpublicationsSucces, updatepublication, updatepublicationSucces } from './publications.actions';

export interface publicationsState{
  publications: Publication[];
  publication: Publication[];
  isLoading: boolean;
  error: null;
}

export const initialState: publicationsState = {
  publications: [],
  publication: [],
  isLoading: true,
  error: null,
}


const _publicationsReducer = createReducer(
  initialState,
  on( loadpublications, (state) => ({ ...state, isLoading: true }) ),
  on( loadpublicationsSucces, (state, { publication }) => ({
      ...state,
     publications: [...publication ],
     isLoading: false
    }) ),
  on( errorloadpublications, (state, {payload}) => ({
      ...state,
      error: payload
    }) ),


  on( loadpublication, (state, { id }) => ({
    ...state,
    publication: state.publications.filter( pro => pro._id === id ),
    isLoading: false,
   }) ),
   on( loadpublicationSucces, (state, { publication }) => ({
    ...state,
    publication: [...publication],
    isLoading: false
  }) ),
  on( errorloadpublication, (state, {payload}) => ({
    ...state,
    error: payload
  })),


  on( updatepublication, (state, { publication, id }) => {
    const newpublications = state.publications.map( ( pro ) => pro._id === id ? { ...pro, ...publication }: pro );
    return{
      ...state,
      publications: newpublications,
      isLoading: false,
    }
   }),
   on( updatepublicationSucces, (state, { publication }) => {
    const newpublications = state.publications.map( ( pro ) => pro._id === publication._id ? { ...pro, ...publication }: pro );
    return{
      ...state,
      publications: newpublications,
      isLoading: false,
    }
   }),
  on( errorloadpublication, (state, {payload}) => ({
    ...state,
    error: payload
  })),


  on( deletepublication, (state, { id }) => ({
    ...state,
    publications: state.publications.filter( pro => pro._id !== id ),
    isLoading: false
  })),
  on( deletepublicationSucces, (state, { id }) => ({
    ...state,
    isLoading: false
  })),
  on( deletepublicationError, (state, { payload }) =>({
    ...state,
    error: payload
  })),
);

export function publicationsReducer(state: publicationsState | undefined, action: Action) {
  return _publicationsReducer(state, action);
};



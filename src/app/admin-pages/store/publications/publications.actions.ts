import { createAction, props } from '@ngrx/store';
import { Publication } from '../../../models/publication.model';


export const loadpublications = createAction( '[publications Component] load publications');

export const loadpublicationsSucces = createAction(
  '[publications Component] load publications Succes',
  props<{ publication: Publication[] }>()
);

export const errorloadpublications = createAction(
 '[publications Component] Error load publications',
 props<{ payload: any }>()
);

export const loadpublication = createAction(
  '[publication Component] load publication',
  props<{ id: string }>()
);

export const loadpublicationSucces = createAction(
 '[publication Component] load publications Succes',
 props<{ publication: Publication[] }>()
);

export const errorloadpublication = createAction(
 '[publication Component] Error load publications',
 props<{ payload: any }>()
);

export const loadpublicationByTerm = createAction(
  '[publication Component] load publication ByTerm',
  props<{ term: string }>()
);

export const loadpublicationByTermSucces = createAction(
  '[publication Component] load publications By term Succes',
  props<{ publication: Publication[] }>()
 );

 export const errorloadpublicationByTerm = createAction(
  '[publication Component] Error load publication ByTerm',
  props<{ payload: any }>()
 );

export const deletepublication = createAction(
  '[publications Component] delete publication',
  props<{ id: string }>()
)

export const deletepublicationSucces = createAction(
  '[publications Component] delete publication Succes',
  props<{  id: string }>()
)

export const deletepublicationError = createAction(
  '[publications Component] delete publication Error',
  props<{ payload: any }>()
)

export const updatepublication = createAction(
  '[publications Component] update publication',
  props<{  id: string, publication: Publication }>()
)

export const updatepublicationSucces = createAction(
  '[publications Component] update publication Succes',
  props<{  publication: Publication  }>()
)

export const updatepublicationError = createAction(
  '[publications Component] delete publication Error',
  props<{ payload: any }>()
)



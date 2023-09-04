import { createAction } from '@ngrx/store';


export const authenticated = createAction(
 '[authenticated Component] authenticated',
);

export const unauthenticated = createAction(
 '[unauthenticated Component] unauthenticated',
);


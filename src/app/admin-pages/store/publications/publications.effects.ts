import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { Publication } from '../../../models/publication.model';
import { PublicationsService } from '../../../services/publications.service';

import * as publicationsActions from './publications.actions';

import { deletepublication, updatepublication } from './publications.actions';


@Injectable()
export class publicationsEffects{

  private actions$ = inject(Actions);
  private publicationsService = inject(PublicationsService);

  loadpublications$ = createEffect( () => this.actions$
    .pipe(
      ofType( publicationsActions.loadpublications ),
      mergeMap( ()=> this.publicationsService.getPublications()
        .pipe(
          map( (publication: Publication[]) => publicationsActions.loadpublicationsSucces({publication})),
          catchError( (error)=> of( publicationsActions.errorloadpublications({payload: error}) ) )
        ))
    )
  )


  loadpublication$ = createEffect( () => this.actions$
  .pipe(
    ofType( publicationsActions.loadpublication ),
    mergeMap( (action)=> this.publicationsService.getPublicationsById(action.id)
      .pipe(
        map( (publication: Publication) => publicationsActions.loadpublicationSucces({publication: [{...publication}] } )),
        catchError( (error)=> of( publicationsActions.errorloadpublications({payload: error}) ) )
      ))
    )
  )

  updatepublication$ = createEffect( () => this.actions$
    .pipe(
      ofType( publicationsActions.updatepublication ),
      mergeMap( ({id, publication })=> this.publicationsService.updatePublications(id, publication)
        .pipe(
          map( (publication: Publication) =>  publicationsActions.updatepublicationSucces({ publication })  ),
          catchError( (error)=> of( publicationsActions.errorloadpublications({payload: error}) ) )
        ))
      )
    )

  deletepublication = createEffect( () => this.actions$
    .pipe(
      ofType( publicationsActions.deletepublication ),
      mergeMap( (action)=> this.publicationsService.deletePublication(action.id)
        .pipe(
          map( () => publicationsActions.deletepublicationSucces({ id: action.id }) ),
          catchError( (error ) => of( publicationsActions.deletepublicationError({ payload: error })))
        )
      )
    )
  )

}


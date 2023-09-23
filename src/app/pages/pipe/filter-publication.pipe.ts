import { Pipe, PipeTransform, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from '../../models/publication.model';

@Pipe({
  name: 'filterPublication'
})
export class FilterPublicationPipe implements PipeTransform {

  private activatedRoute = inject(ActivatedRoute);

  transform(publications: Publication[]) {

    if (!publications) return publications;

    const term = this.activatedRoute.snapshot.params['term']

    return publications.filter( publication => {
      return publication.name !== term
    })

  }

}

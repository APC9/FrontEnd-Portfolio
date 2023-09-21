import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../../models/project.model';
import { Publication } from '../../models/publication.model';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any[], ){

    if( !value){
      return value;
    }
    return value.slice().reverse();
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parrafoSplit'
})
export class ParrafoSplitPipe implements PipeTransform {

  public newPublication!: string;
  transform( publication: string ) {
    this.newPublication = publication.replace(/\n\n/g, '<br><br>')
    return this.newPublication;
  }

}

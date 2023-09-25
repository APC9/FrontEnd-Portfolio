import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastTen'
})
export class LastTenPipe implements PipeTransform {

  transform(value: any[]) {

    if( !value){
      return value;
    }

    return value.slice(-10).reverse();
  }

}

import { Organizations } from './../models/lenders';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchnamelender'
})
export class SearchnamelenderPipe implements PipeTransform {

  transform( Organizations: Organizations[] , LenderName: string): any {

    if(!LenderName){
      return Organizations;
    }
    return Organizations.filter(x => x.name.toLowerCase().includes(LenderName.toLowerCase()));
  }

   }


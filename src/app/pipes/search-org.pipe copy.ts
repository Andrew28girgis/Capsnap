import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOrg'
})
export class SearchOrgPipe implements PipeTransform {
  transform( Organizations: any , termOrg: string): any {
    if ( !termOrg ) {
       return Organizations;
     }  else {
       return Organizations.filter((Organizations:any) => {
       return Organizations.name?.toLowerCase().includes(termOrg.toLowerCase()) ;
       });
     }
   }
}

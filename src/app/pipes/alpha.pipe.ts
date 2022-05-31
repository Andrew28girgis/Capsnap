import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alpha'
})
export class AlphaPipe implements PipeTransform {

  transform( persons: any , selectedLetter: string): any {
    if ( !selectedLetter ) {
       return persons.filter((persons:any) => {
        return persons.name.startsWith("A")
      })
     }  else {
       return persons.filter((persons:any) => {
       return persons.name[0].toLowerCase().includes(selectedLetter.toLowerCase());
       });
     }
   }  

}

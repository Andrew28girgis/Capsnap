import { Pipe, PipeTransform } from '@angular/core';
  import { account } from '../models/domain';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform( Organizations: any , termName: string): any {
    if ( !termName ) {
       return Organizations;
     }
     else if(termName.length>3) {        
     return  Organizations.filter((Organization:any) =>{    
       if( Organization.persons !=null && Organization.persons.length > 0 ){         
         return Organization.persons.every((person:any)=>{
               return person.fullname?.toLowerCase().includes(termName.toLowerCase())                  
            }) 
          }
          else{
            return false;
          }
        })
       }
       else{
          return true;
       }
   }
}

// return person.fullname.toLowerCase().includes(termName.toLowerCase())


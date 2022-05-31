import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {
  transform( Organizations: any , selectId: any): any {

    if ( !selectId ) {
       return Organizations;
     }  
     else if (selectId=="0"){
       return Organizations;       
     }
     else { 
       return Organizations.filter((Organization:any) => {
        if( Organization.persons !=null && Organization.persons.length > 0 ){          
          return Organization.persons.some((person:any)=>{            
            if( person.personFieldValues !=null){      
              return  person.personFieldValues.some((Value:any)=>{
                if( Value.fieldValue!= null ){
                var res = Value.fieldValue?.includes(selectId);                
                return res;
                }else{  
                  return false; 
                }
              })   
            }
            else{
              return false ;
            }
         }) 
        }
        else{
          return false; 
        }
       });
     }
   }
}


// if (persons.cb088cdb4268b4b1fd522dea74b578855851a221==null){
//   return false;
// } else{
// var res = persons.cb088cdb4268b4b1fd522dea74b578855851a221!=null 
// && persons.cb088cdb4268b4b1fd522dea74b578855851a221.includes(selectId);
// return res;
// }
import { Pipe, PipeTransform } from '@angular/core';
import { account } from '../models/domain';

@Pipe({
  name: 'pipedriveId'
})

export class PipedriveIdPipe implements PipeTransform {

  transform(Organizations: account[] ,havePipeDriveId:boolean ,filterMetadata) {
    if(havePipeDriveId){
      var filterdOrg = Organizations.filter((Organization:account)=>{      
           return  Organization.pipedriveId !== 0 ;
      })    
      filterMetadata.count = filterdOrg?.length;
      return filterdOrg ;
    }
    else{
      filterMetadata.count = Organizations?.length;
      return Organizations ;
    }
  }

}

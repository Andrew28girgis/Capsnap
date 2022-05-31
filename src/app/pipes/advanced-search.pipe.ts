import { Pipe, PipeTransform } from '@angular/core';
import { AdvancedFilters } from '../models/domain';
import { account } from '../models/domain';
@Pipe({
  name: 'advancedSearch'
})

export class AdvancedSearchPipe implements PipeTransform {

transform(Organizations: account[] , Advanced: AdvancedFilters, ApplyAdvancedFilters:boolean,filterMetadata) {

if (Advanced==null){
  return Organizations;
}

var filteredOrganizations = Organizations;

if (Advanced.Apartments || Advanced.Condos || Advanced.SeniorHousi ||Advanced.StudentHous  || Advanced.AssistedLivi || Advanced.SFRPortfolio ||                
    Advanced.MobileHome || Advanced.Coliving || Advanced.Office || Advanced.MedicalOffice ||   Advanced.Manufacturi || Advanced.LtIndustrial||   
    Advanced.Cannabis || Advanced.Retail|| Advanced.Hotel|| Advanced.Land || Advanced.Selfstorage|| Advanced.Religious||  Advanced.Hospital){

    filteredOrganizations = Organizations.filter((Organization:account)=>{
    return (Organization.apartments == "X" && Advanced.Apartments ) ||
           (Organization.condos == "X" && Advanced.Condos) ||
           (Organization.seniorHousing == "X"  && Advanced.SeniorHousi ) ||
           (Organization.studentHousing == "X"  && Advanced.StudentHous ) ||
           (Organization.assistedLiving == "X"  && Advanced.AssistedLivi) ||                
           (Organization.sfrPortfolio == "X"  && Advanced.SFRPortfolio) ||                
           (Organization.mobileHomePark == "X"  && Advanced.MobileHome) ||                
           (Organization.coLiving == "X"  && Advanced.Coliving) ||                
           (Organization.office == "X"  && Advanced.Office) ||                
           (Organization.medicalOffice == "X"  && Advanced.MedicalOffice) ||                
           (Organization.manufacturing == "X"  && Advanced.Manufacturi)||                
           (Organization.ltIndustrial == "X"  && Advanced.LtIndustrial)||                
           (Organization.cannabis == "X"  && Advanced.Cannabis)||                
           (Organization.retail == "X"  && Advanced.Retail)||                
           (Organization.hotel == "X"  && Advanced.Hotel)||                
           (Organization.land == "X"  && Advanced.Land )||                
           (Organization.selfStorage == "X"  && Advanced.Selfstorage)||                
           (Organization.religious == "X"  && Advanced.Religious)||                
           (Organization.hospital == "X" && Advanced.Hospital);
  });
  }

if(Advanced.Senior || Advanced.Mezzanine || Advanced.Preferred || Advanced.PreferredEquity|| Advanced.Pace || Advanced.JVEquity)
{
  filteredOrganizations = filteredOrganizations.filter((Organization:account)=>{
  return  (Organization.senior == "X" && Advanced.Senior) ||
         (Organization.mezzanine == "X"  && Advanced.Mezzanine) ||
         (Organization.preferred == "X"  && Advanced.Preferred) ||
         (Organization.preferredEquity == "X" && Advanced.PreferredEquity)||
         (Organization.pace =="X" && Advanced.Pace) ||
         (Organization.jvEquity  && Advanced.JVEquity)
 });
}

if(Advanced.Acquisition || Advanced.NewDevelopment || Advanced.Redevelopment || Advanced.Refinance)
{
  filteredOrganizations = filteredOrganizations.filter((Organization:account)=>{
    return (Organization.acquisition == "X" && Advanced.Acquisition) ||
           (Organization.newDevelopment == "X"  && Advanced.NewDevelopment) ||
           (Organization.redevelopment == "X"  && Advanced.Redevelopment) ||
           (Organization.refinance == "X" && Advanced.Refinance)
   });
}

if(Advanced.StateValue)
{  
  if(Advanced.StateValue == '0' ){        
    return filteredOrganizations;
  }
  filteredOrganizations = filteredOrganizations.filter((Organization:account)=>{
    return Organization.states?.some(state=> state == Advanced.StateValue) ;
    });
}

    filterMetadata.count = filteredOrganizations.length;
    return filteredOrganizations;  
    }
  }


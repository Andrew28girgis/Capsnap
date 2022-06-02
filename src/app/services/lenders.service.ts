import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LendersService {

  constructor(private http: HttpClient) { }

  public GetOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Organization`).pipe();
  }

  public GetOrganizationsById(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Organization/${id}`).pipe();
  }

  public SaveOrganization(Organization:any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/Organization/SaveOrganization`, Organization).pipe();
  }

  public UpdateOrganization(Organization:any): Observable<any[]> {
    return this.http.put<any[]>(`${environment.api}/Organization/UpdateOrganization/${Organization.id}`, Organization).pipe();
  }

   options:any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public DeleteOrganization(Organization:any) {
    this.options['body'] = Organization;
    return this.http.delete<any[]>(`${environment.api}/Organization/DeleteOrganization` , this.options).pipe();
  }

  public ProjectTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/ProjectTypes`).pipe();
  }


  public DeleteProjectTypeConnection(id:any) {
    return this.http.delete<any[]>(`${environment.api}/OrganizationProjectType/DeleteProjectTypeConnection/${id}`).pipe();
  }

  public SendNewOrgProjectTypes(addedTypesIds:any) {
    return this.http.post<any[]>(`${environment.api}/OrganizationProjectType/SaveProjectTypeConnection `, addedTypesIds).pipe();
  }

  // Start Loan Profile

  public OrgLoanProfile(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/LoanProfiles/OrgLoanProfile/${id}`).pipe();
  }

  public SaveLoanProfile(LoanProfile:any) {
    return this.http.post<any[]>(`${environment.api}/LoanProfiles/SaveLoanProfile `, LoanProfile).pipe();
  }

  public UpdateLoanProfile(LoanProfile:any ,id?:number) {
    return this.http.put<any[]>(`${environment.api}/LoanProfiles/UpdateLoanProfiles/${id} `, LoanProfile).pipe();
  }

  public DeleteLoanProfiles(loanProfile:any) {
    this.options['body'] = loanProfile;

    return this.http.delete<any[]>(`${environment.api}/LoanProfiles/DeleteLoanProfiles` , this.options).pipe();
  }

  // End Loan Profile


  // Start Contact
  public OrgContacts(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Contacts/Org/${id}`).pipe();
  }

  public OrgContact(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Contacts/LP/${id}`).pipe();
  }

  public SaveContacts(contact:any) {
    return this.http.post<any>(`${environment.api}/Contacts/SaveContact`, contact).pipe();
  }

  public SaveContactConnection(connections:any) {
    return this.http.post<any[]>(`${environment.api}/ContactLoanProfiles/SaveContactConnection`, connections).pipe();
  }

  public DeleteContactConnection(id:number) {
    return this.http.delete<any[]>(`${environment.api}/Contacts/DeleteProjectTypeConnection/${id}`).pipe();
  }
  public UpdateContacts(LoanProfile:any ,id?:number) {
    return this.http.put<any[]>(`${environment.api}/Contacts/UpdateContact/${id} `, LoanProfile).pipe();
  }

  public DeleteContacts(loanProfile:any) {
    this.options['body'] = loanProfile;
    return this.http.delete<any[]>(`${environment.api}/Contacts/DeleteContact` , this.options).pipe();
  }
  // End Contact
}

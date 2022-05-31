import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Deal, Field, Scenario, Template } from '../models/domain';
import { RootObjectPipelines } from '../models/mainPipeLines';

@Injectable({
  providedIn: 'root'
})

export class PipeLinesService {

  constructor(private http: HttpClient) { }

  public getPipeLine(): Observable<RootObjectPipelines> {
    return this.http.get<RootObjectPipelines>(`${environment.api}/Pipeline/GetAllPipelines`).pipe();
  }

  public getDeals(stageid: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Deal/GetAllDeals?stageid=${stageid}`).pipe();
  }

  public dealDetails(dealid: number): Observable<Deal> {
    return this.http.get<Deal>(`${environment.api}/Deal/GetDeal?id=${dealid}`).pipe();
  }

  public GetDealDetails(dealid: number): Observable<Field[]> {
    return this.http.get<Field[]>(`${environment.api}/Deal/GetDealDetails?id=${dealid}`).pipe();
  }

  public SendToLenders(post: any): Observable<any[]> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(post);
    console.log(body)
    return this.http.post<any[]>(`${environment.api}/Deal/SendToLenders`, body, { 'headers': headers })
  }

  public getOrganizations(groupId): Observable<any> {
    return this.http.get<any>(`${environment.api}/person/getorganizations?groupid=${groupId}`).pipe();
  }

  public getActiveCampaignPipelinesForDeals(dealid: number): Observable<any> {
    return this.http.get<any>(`${environment.api}/Deal/GetActiveCampaignPipelinesForDeal?dealId=${dealid}`).pipe();
  }

  public GetActiveCampaignDealsForPipeline(groupId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Deal/GetActiveCampaignDealsForPipeline?pipelineId=${groupId}`).pipe();
  }

  // public GetCustomFields():Observable<CustomFields>{
  //   return this.http.get<CustomFields>(`${environment.api}/Deal/GetCustomFields`).pipe();
  // }

  public SaveCustomFields(Deal: Deal): Observable<any[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<any[]>(`${environment.api}/Deal/SaveCustomFields`,
      { fields: Deal.Fields, dealId: Deal.macroDeal.pipedriveId }, { 'headers': headers })
  }

  public getMail(dealid: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/getmail?dealid=${dealid}`).pipe();
  }

  public getMailBody(mailId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Deal/GetMailBody?mailId=${mailId}`).pipe();
  }

  public getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${environment.api}/template/LoadTemplates`).pipe();
  }

  public SaveTemplate(template: any): Observable<any[]> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<any[]>(`${environment.api}/template/SaveTemplate`, template, { 'headers': headers })
  }

  public getTemplateBody(templateName: any): Observable<Template> {
    return this.http.get<Template>(`${environment.api}/template/loadtemplate?templateName=${templateName}`).pipe();
  }

  public CreateScenario(dealid: number, scenarioTitle: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/CreateScenario?dealId=${dealid}&Title=${scenarioTitle}`).pipe();
  }

  public getScenario(dealid: any): Observable<Scenario[]> {
    return this.http.get<Scenario[]>(`${environment.api}/deal/GetScenario?dealid=${dealid}`).pipe();
  }

  public createGroup(scenarioId: any, groupTitle: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/CreateGroup?scenarioId=${scenarioId}&Title=${groupTitle}`).pipe();
  }

  public GetActiveCampaignPipelinesForScenario(scenarioId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetActiveCampaignPipelinesForScenario?scenarioId=${scenarioId}`).pipe();
  }

  public GetActiveCampaignContact(contactId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/person/GetActiveCampaignContact?contactId=${contactId}`).pipe();
  }

  public SendTemplate(template: any): Observable<any[]> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<any[]>(`${environment.api}/template/SendTemplate`, template, { 'headers': headers })
  }

  public DecodeTemplate(template: any): Observable<any[]> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<any[]>(`${environment.api}/template/DecodeTemplate`, template, { 'headers': headers })
  }

  public GetOrphanMail(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetOrphanMail`).pipe();
  }

  public GetActiveCampaignContactByEmail(fromAddress: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/person/GetActiveCampaignContactByEmail?email=${fromAddress}`).pipe();
  }

  public SetOrphanMail(emailId: number, microDealId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/SetOrphanMail?MailId=${emailId}&DealId=${microDealId}`).pipe();
  }

  public SaveDealFile(file): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/template/SaveDealFile`, file).pipe();
  }

  public GetGUID(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/template/GetGUID`).pipe();
  }

  public GetFiles(outbox): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/template/GetFiles?outbox=${outbox}`).pipe();
  }

  public DeleteFile(outbox, fileName): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/template/RemoveFile?outbox=${outbox}&filename=${fileName}`).pipe();
  }

  public GetActions(microDealId): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetActions?dealId=${microDealId}`).pipe();
  }

  public LoadSentEmails(groupId): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/template/LoadSentEmails?groupid=${groupId}`).pipe();
  }

  public LoadSentEmailBody(template): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/template/LoadSentEmailBody?template`, template).pipe();
  }

  public CreateMember(firstname, lastname, email, phone, dealId, groupId, typeid, orgid): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Person/AddPerson?firstname=${firstname}&lastname=${lastname}&email=${email}&phone=${phone}&dealId=${dealId}
    &groupId=${groupId}&typeid=${typeid}&orgid=${orgid}`).pipe();
  }

  public MoveStage(MicroDealId, stageId): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/UpdateDealStage?dealId=${MicroDealId}&stageId=${stageId}`).pipe();
  }

  public LoadPersonEmails(emailSubject): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/person/LoadPersonEmails?email=${emailSubject}`).pipe();
  }

  public LoadActiveCampaignAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/person/LoadActiveCampaignAccounts`).pipe();
  }

  public GetFileCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetFileCategories`).pipe();
  }

  public GetDealFiles(dealid): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetDealFiles?dealid=${dealid}`).pipe();
  }

  public DeleteFileDeal(FileId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/DeleteFile?fileId=${FileId}`).pipe();
  }

  public AssignPrivilege(AssignRequest): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/deal/AssignPrivilege`, AssignRequest).pipe();
  }

  public ListFilePrivilege(fileId): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/ListFilePrivilege?id=${fileId}`).pipe();
  }

  public DeletePrivilege(fileId): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/DeletePrivilege?id=${fileId}`).pipe();
  }

  public GetDealImages(dealid): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetDealImages?dealid=${dealid}`).pipe();
  }

  public DeleteImage(fileName, dealid): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/DeleteImage?fileName=${fileName}&dealId=${dealid}`).pipe();
  }

  public GetUserFiles(dealid, microdealId, groupId): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetClientDealFiles?dealid=${dealid}&microdealId=${microdealId}&groupId=${groupId}`).pipe();
  }

  public UpdateDealFields(template): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/deal/UpdateDealFields`, template).pipe();
  }
  public UpdateDealParams(template): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/deal/UpdateDealParams`, template).pipe();
  }

  public UpdateDealGroupParams(template): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/deal/UpdateDealGroupParams`, template).pipe();
  }

  public GetGroupParameters(groupId): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetGroupParameters?groupId=${groupId}`).pipe();
  }
  public GetPersonFields(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/person/GetPersonFields`).pipe();
  }

  public ListPipeDriveOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Deal/ListPipeDriveOrganizations`).pipe();
  }

  public GetMailByMessageId(messageid: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetMailByMessageId?messageid=${messageid}`).pipe();
  }
  public AssignMailToMicroDeal(mailid: number, microdealid: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/AssignMailToMicroDeal?mailid=${mailid}&microdealid=${microdealid}`).pipe();
  }

  public GetAllMacroDeals(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Deal/GetAllMacroDeals`).pipe();
  }

  public GetAllActiveMicroDeals(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetAllActiveMicroDeals`).pipe();
  }

  public GetAllActiveMacroDeals(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetAllActiveMacroDeals`).pipe();
  }

  public SavePage(page): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/landing/SavePage`, page).pipe();
  }

  // public GetLandingPages():Observable<any[]>{
  //   return this.http.get<any[]>(`${environment.api}/landing/GetLandingPages`).pipe();
  // }

   public CopyDataSource(fileId:number, dealId:number , groupId:number):Observable<any[]>{
     return this.http.get<any[]>(`${environment.api}/landing/CopyDataSource?fileId=${fileId}&dealId=${dealId}&groupId=${groupId}`).pipe();
   }

  public LoadDataSources(dealid: number,scenarioId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/LoadDataSources?dealId=${dealid}&scenarioId=${scenarioId}`).pipe();
  }

  public AddDataSource(DataSource): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/landing/AddDataSource`, DataSource).pipe();
  }
  // public GetLandingPageDataSource():Observable<any[]>{
  //   return this.http.get<any[]>(`${environment.api}/landing/GetLandingPageDataSource`).pipe();
  // }

  public GetDealDataSources(dealid: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetDealDataSources?dealid=${dealid}`).pipe();
  }

  public getlandingpage(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/getgrouplandingpage?id=${id}`).pipe();
  }

  public SaveGroupPage(Landing): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/landing/SaveGroupPage`, Landing).pipe();
  }
  // public GetGroupLandingPageDataSource(GroupId:number):Observable<any[]>{
  //   return this.http.get<any[]>(`${environment.api}/landing/GetLandingPagesByGroupId?id=${GroupId}`).pipe();
  // }

  public GetGroupLandingPageFiles(LandingPageId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/GetGroupLandingPageFiles?id=${LandingPageId}`).pipe();
  }

  public DeleteGroupLandingPageFile(fileId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/DeleteGroupLandingPageFile?id=${fileId}`).pipe();
  }

  public readformula(fileId: number, groupId: number, formula: string, namedRange: string): Observable<any[]> {
    return this.http.get<any[]>
      (`${environment.api}/landing/readformula?fileId=${fileId}&groupId=${groupId}&formula=${formula}&namedRange=${namedRange}`).pipe();
  }

  public SaveDataSource(groupDataSource): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/landing/SaveDataSource`, groupDataSource).pipe();
  }

  public SaveDataTable(CaseGroupDataSource): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/landing/SaveDataTable`, CaseGroupDataSource).pipe();
  }

  public GetDataSources(groupId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/GetDataSources?groupId=${groupId}`).pipe();
  }

  public GetDataSourceTables(caseGroupId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/GetDataSourceTables?caseGroupId=${caseGroupId}`).pipe();
  }

  public DeleteDataSource(fileId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/DeleteDataSource?fileId=${fileId}`).pipe();
  }

  public AssignToCategory(fileId, categoryId): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/AssignToCategory?fileId=${fileId}&categoryId=${categoryId}`).pipe();
  }

  public UpdateFiles(files): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/deal/SaveFilesData`, files).pipe();
  }

  public HideDeal(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/HideDeal?id=${id}`).pipe();
  }

  public ReadNamedRanges(fileId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/ReadNamedRanges?fileId=${fileId}`).pipe();
  }

  public deleteItem(Item: string, itemId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/deleteItem?Item=${Item}&itemId=${itemId}`).pipe();
  }

  public toggleLandingPage(groupId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/ToggleLandingPage?groupId=${groupId}`).pipe();
  }

  public GetMAcroDealStats(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Deal/GetMAcroDealStats`).pipe();
  }

  public GetMicroDealStats(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/Deal/GetMicroDealStats`).pipe();
  }

  public DownloadFile(Key:string , FileId:number , GroupId:number):Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/deal/DownloadFile?key=${Key}&fileId=${FileId}&groupId=${GroupId}`).pipe();
  }

  public GetAllPersonsByOrg( OrgId:number ):Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/person/GetAllPersonsByOrg?orgId=${OrgId}`).pipe();
  }

  public Gettimeline():Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/deal/gettimeline`).pipe();
  }

  public GetDatasourceFileID(dealId:number, fileName:string):Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/deal/GetDatasourceFileID?dealId=${dealId}&fileName=${fileName}`).pipe();
  }

  public GetFileLink(dealId:number, fileName:string):Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/deal/GetFileLink?dealId=${dealId}&fileName=${fileName}`).pipe();
  }

  public GetPDFFilePreview(dealId:number, fileName:string):Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/deal/GetPDFFilePreview?dealId=${dealId}&fileName=${fileName}`).pipe();
  }

  public LoadLookups():Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/Deal/LoadLookups`).pipe();
  }

  public DeleteGroupDataSource(datasourceId:any):Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/landing/DeleteGroupDataSource?datasourceId=${datasourceId}`).pipe();
  }

  public MoveDatasource(direction:number ,datasourceId:number):Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/Deal/MoveDatasource?direction=${direction}&datasourceId=${datasourceId}`).pipe();
  }

  public Sync():Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/sync/Sync`).pipe();
  }

  public LoadSync():Observable<any[]>{
    return this.http.get<any[]>(`${environment.api}/Sync/LoadSync`).pipe();
  }

  public GetForm(id?:number): Observable<any[]> {
    if (id==null){
      let Id= 0;
      return this.http.get<any[]>(`${environment.api}/intake/getform?intakeid=${Id}`).pipe();
    }else{
      return this.http.get<any[]>(`${environment.api}/intake/getform?intakeid=${id}`).pipe();
    }
  }

  public getScreens(GroupId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/intake/getScreens?groupId=${GroupId}`).pipe();
  }

  public getItems(ContainerId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/intake/getItems?ContainerId=${ContainerId}`).pipe();
  }

  public getItemOptions(ItemId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/intake/getItemOptions?ItemId=${ItemId}`).pipe();
  }

  public SaveScreen(screen): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/intake/SaveScreen` ,screen).pipe();
  }

  public SaveItem(item): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/intake/SaveItem` , item).pipe();
  }

  public SaveOption(option): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/intake/SaveOption` ,option).pipe();
  }

  public SetItemNav(ItemId:number , ActionScreenId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/intake/SetItemNav?itemId=${ItemId}&ActionScreenId=${ActionScreenId}`).pipe();
  }

  public SetNav(ScreenId:number , NextScreenId:number ,PrevScreenId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/intake/SetNav?ScreenId=${ScreenId}&NextScreenId=${NextScreenId}&PrevScreenId=${PrevScreenId}`).pipe();
  }

  public DeleteInTake(objectname:string , id:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/intake/delete?objectname=${objectname}&id=${id}`).pipe();
  }

  public GetIntakes(accountId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/intake/GetIntakes?id=${accountId}`).pipe();
  }

  public GetForms(id?:number): Observable<any[]> {
    if (id==null){
      let Id= 0;
      return this.http.get<any[]>(`${environment.api}/intake/getform?intakeid=${Id}`).pipe();
    }else{
      return this.http.get<any[]>(`${environment.api}/intake/getform?intakeid=${id}`).pipe();
    }
  }

  public SaveIntake(Intake:any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/intake/SaveIntake`,Intake).pipe();
  }

  public createlink(dealid:number,ExpirationHours:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/intake/createlink?dealid=${dealid}&ExpirationHours=${ExpirationHours}`).pipe();
  }

  public SetMainImage(dealid:number ,imagename:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/SetMainImage?dealid=${dealid}&imagename=${imagename}`).pipe();
  }

  public SaveMapping(DataSourceId:number, Sheet:string ,Cell:string , ItemIds:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/SaveMapping?DataSourceId=${DataSourceId}&Sheet=${Sheet}&Cell=${Cell}&ItemIds=${ItemIds}`).pipe();
  }

  public Createcase(Intake:any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/case/Createcase`, Intake).pipe();
  }

  public GetCases(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/case/GetCases`).pipe();
  }

  public createScenario(CaseId:number, Title:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/case/CreateScenario?CaseId=${CaseId}&Title=${Title}`).pipe();
  }

  public CreateGroup(scenarioId:number,Title:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/case/CreateGroup?scenarioId=${scenarioId}&Title=${Title}`).pipe();
  }

  public GetCaseScenarioDataSources(caseGroupId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/deal/GetCaseScenarioDataSources?caseScenarioId=${caseGroupId}`).pipe();
  }

  public GetInputVariables(fileId:number,tab:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/GetInputVariables?fileId=${fileId}&tab=${tab}`).pipe();
  }

  public exportcharts(fileId:number,dealid:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/exportcharts?fileId=${fileId}&dealid=${dealid}`).pipe();
  }

  public loadcharts(fileId:number,dealid:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/loadcharts?fileId=${fileId}&dealid=${dealid}`).pipe();
  }

  public CacheBoxFile(fileId:number,dealid:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/landing/CacheBoxFile?fileId=${fileId}&dealId=${dealid}`).pipe();
  }


}

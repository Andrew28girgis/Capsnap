export class General {    
    Lookups:Lookups;
    AllFiles:AllFiles;
    TimeLine:TimeLine[];
    Templates:Template[];
    expect:Array<string>;
    SelectedTemplate:Template;
    NewScenarioTitle:string;
    modalObject:any;
    modalObject2:any;
    microDealId:number
    Stage:Stage;
    persons:RootObjectPerson;
    checkedPersonsIds: number[] = [];
    listOfItems:number[] = [];
    PreviewTemplate:Template;
    CreateMember:Member ;
    accounts:account[];
    categories:category[];
    NameRange:NameRanges[];
    GroupFiles:GroupFiles[]=[];
    CategoryId:number;
    DataSourceId:number;
    fileId:number;
    GroupIds:number[]=[];
    personTypes:personType[];
    Organiztion:Org[];
    messageid:string;
    Mail:Mail;
    Scenarios:Scenario[];
    groups:Group[];
    microdeals:MicroDeal[];
    MacroDeal:MacroDeal[];
    pipeline:string[];
    stages:UniqueStage[] ;
    ActiveMicroDeals:ActiveMicroDeals[];
    ActiveMacroDeals:MacroDeal[];
    Params:any;
    didScroll:boolean;
    landingPage:LandingPage;
    landingPageResponse:LandingPageReponse[];
    landingPagesGroup:LandingPages;
    DataSource:DataSource[];
    SendDataSource:SendDataSource[];
    LandingPageDataSource:any;
    DataSources:DataSources[];
    TextArea:string;
    nameRange:string;
    LandingPage:any;
    GroupLandingPage:GroupLandingPageResponse[];
    GroupLandingPageDataSources:GroupLandingPageDataSources[]=[];
    GroupLandingPageFiles:GroupLandingPageFiles[]=[];
    Sheet:Sheet;
    Sheets:Sheet[]=[];

    GroupDataSource:groupDataSource[];
    EditDataSource:groupDataSource;
    MacroDealStats:MacroDealStats[];
    GetMicroDealStats:GetMicroDealStats[];
    OrgIds:any=[]
    PersonField:PersonField[];
    AllOrganizations:boolean = false;
    CustomFileId:any;
    sentEmails:number[];
    LoadSync:LoadSync;
    AdvancedFilters:AdvancedFilters  ;
    Organizations:account[];
    states:states[];
    screens:Screen[]=[];
    items:Item[]=[];
    itemOptions:itemOption[]=[];
    NewScreen:Screen;
    ActionScreenId:number;
    NextScreenId:number;
    PrevScreenId:number;
    ExpirationHours:any;
    images:any[];
    MainImage:any[];
    Cases:Cases[];
    SceTitle:string;
    GrpTitle:string;
    variables:string[];
    ChartsSheet:ChartsSheet [] = [];
}

export class ChartsSheet{
    label:string;
    isAvailableChart:boolean=true;
    title:string;
    intro:string;
}

export class NameRanges{
    type:string;
    label:string;
    tab:string;
}
export class AdvancedFilters {    
    Apartments:boolean  ;
    Condos:boolean   ;
    SeniorHousi:boolean   ;
    StudentHous:boolean   ;
    AssistedLivi:boolean   ;
    SFRPortfolio:boolean   ;
    MobileHome:boolean   ;
    Coliving:boolean   ;
    Office:boolean   ;
    MedicalOffice:boolean   ;
    Manufacturi:boolean   ;
    Retail:boolean  ;
    LtIndustrial:boolean   ;
    Cannabis:boolean   ;
    Hotel:boolean  ;
    Land:boolean  ;
    Selfstorage:boolean  ;
    Religious:boolean  ;
    Hospital:boolean  ;
    Other:boolean  ;
    Leasedfee:boolean  ;
    Senior:boolean  ;
    Mezzanine:boolean  ;
    Preferred:boolean  ;
    PreferredEquity:boolean  ;
    Pace:boolean  ;
    JVEquity:boolean  ;
    Acquisition:boolean;
    NewDevelopment:boolean;
    Redevelopment:boolean;
    Refinance:boolean ;
    MinimumLoanSize:string ;
    MaximumLoanSize:string  ;
    MaxLTV:string  ;
    MaxLTC :string  ;
    AsastabilizedLT:string  ;
    MinDSCR:string  ;
    TargetStates:string  ;
    SponsorStates:string  ;
    Recourse:string  ;
    LoanProgramType:string  ;
    StateValue:string;
}

export class  LoadSync {
    id: number;
    syncEndDate: any ;
    syncStartDate: any ;
}

export class Lookups{
    templates:Template[];
    accounts:account[] ;
    fileCategories:category[] ; 
    personFields:personType[] ;
    pipeDriveOrganizations:Org[]; 
    states:states[];
}
export class states{
    id:number;
    stateCode:string ;
    stateName:string;
}

export class AllFiles{
    filePrivileges:filePrivileges[];
    files:Files[];
}

export class  Files {
    categoryId: number;
    
    dealId: number;
    fileType: string;
    id: number;
    name: string;
    uploadDate: string;
    Scenarios:Scenario[];
    CheckGroup:boolean = false;
    CheckDeal:boolean = false;
    ExcelFile:boolean = false;
    boxId:string;
    privilege:filePrivileges[] ;
}

export class filePrivileges{
    id:number;
    fileId:number;
    objectId!:number;
    privilegeLevel:string;
    Objects:number[];

    constructor(FileId?: number, PrivilegeLevel?: string, Objects?: number[], ObjectId?:number) {
        this.fileId = FileId;
        this.privilegeLevel = PrivilegeLevel;
        this.Objects = Objects;
        this.objectId = ObjectId;
      }
}

export class TimeLine{
    fromDate:string;
    highlighted:boolean;
    actions:actions[];
}

export class actions{
    name:string;
    actionName:string;
    person:string;
    item: string;
    actionDate:Date;
    c: number;
}

export class PersonField {
    id: number;
    key: string;
    name: string;
    order_nr: number;
    field_type: string;
    add_time: string;
    update_time: string;
    last_updated_by_user_id?: number;
    active_flag: boolean;
    edit_flag: boolean;
    index_visible_flag: boolean;
    details_visible_flag: boolean;
    add_visible_flag: boolean;
    important_flag: boolean;
    bulk_edit_allowed: boolean;
    searchable_flag: boolean;
    filtering_allowed: boolean;
    sortable_flag: boolean;
    options: Option[];
    mandatory_flag: boolean;
    picklist_data?: any;
    use_field: string;
    link: string;
    display_field: string;
    autocomplete: string;
    is_subfield?: boolean;
}

export class Persons {
    id:number;
    firstname:string;
    lastname:string;
    fullname:string;
    email:any;
    email2:any;
    email3:any;
    cellPhone:any;
    phone1:any;
    phone2:any;
    notes:string;
    organizationId:number;
    linkedIn:any
    pipedriveId:number;
    personFieldValues:personFieldValues[];
    Linkedin:string;
    JobTitle:string;

}
export class personFieldValues {
    id:number;
    contactId:number;
    fieldId:number;
    fieldValue: string;
}

export class MacroDealStats{
    microDealTitle : string;
    microDealId : number;
    macroDealTitle :  string;
    macroDealId : number;
    landingLoad : number;
    emailRead : number;
    downloadFile : number;
    previewFile : number;
}

export class  GetMicroDealStats {
    microDealTitle : string;
    microDealId : number;
    macroDealTitle :  string;
    macroDealId : number;
    landingLoad : number;
    emailRead : number;
    downloadFile : number;
    previewFile : number;
    organizationId:number;
}



export class GroupLandingPage{
    Id:number ;
    LandingPageId :number ;
    GroupId :number;
    PageContent :string;
    PageTitle :string;
    GroupLandingPageDataSources :GroupLandingPageDataSources[];
    GroupLandingPageFiles :GroupLandingPageFiles[]; 
}
export class GroupLandingPageResponse{
    id:number ;
    landingPageId :number ;
    groupId :number;
    pageContent :string;
    pageTitle :string;
    groupLandingPageDataSources :GroupLandingPageDataSources[];
    groupLandingPageFiles :GroupLandingPageFiles[]; 
}
export class GroupLandingPageDataSources {
    Id :number ;
    LandingPageId :number ;
    DatasourceId :number;
}
export class GroupLandingPageFiles {
    Id :number;
    FileId :number;
    GroupLandingPageId :number ;
}
export class GroupFiles{
    id?: number;
    file?: any
    fileId?: number ;
    groupLandingPage?: any;
    groupLandingPageId?: number;
    fileName?:string;

}
export class DataSources {
    dataSource: any;
    dataSourceId: number;
    filename: string;
    id: number;
    macroDeal: any;
    macroDealId: number;
    view:any
    boxId:string ;
    dataSourceMaps:DataSourceMaps[];
    
}
export class Cases {
    id:number;
    title:string;
    caseScenarios:caseScenarios[];
}
export class caseScenarios{
    id: number;
    caseId: number;
    title: string;
    creationDate: string;
    caseGroups: caseGroups[];
    showGroups:boolean=false;
}
export class caseGroups{
    id: number;
    scenarioId: number;
    title: string;
}

export class DataSourceMaps{
    sheet: string;
    cell: string;
    dataSourceId: number;
    id: number;
    itemIds: string;
}

export class LandingPage {
   id:number;
   PageTitle:string;
   PageContent:any;
   LandingPageId :number;
   landingPageDataSources:any[];
}

export class SendDataSource {
    LandingPageId:number;
    DatasourceId:number;
 }

export class DataSource {
    id: number;
    filename: string;
    landingPageDataSources: any[];
    macroDealDataSources: any[];
    macroDeal:any;
    macroDealId:any;
}

export class Sheet {
    isAvailable:boolean = true;
    label:string;
    cells:any;
    minX:number;    
    maxX:number;
    title?:string;
    GroupDataSource?:groupDataSource;
}

export class groupDataSource{
    columns: number=0;
    fileId:number;
    dataSourceId: number;
    displayOrder: number;
    formula: string;    
    groupId: number;
    id: number;
    intro: string='';
    namedRange: string;
    title: string= '';
    headers:string='';
}


export class CaseGroupDataSource{
    columns: number=0;
    fileId:number;
    CaseGroupId:number;
    dataSourceId: number;
    displayOrder: number;
    formula: string;    
    id: number;
    intro: string='';
    namedRange: string;
    title: string= '';
    headers:string='';
}

export class LandingPageReponse{
    id:number;
    pageTitle:string;
    pageContent:any;
    DataSources:any;
}

export class LandingPages{
    id:number;
    pageTitle:string;
    pageContent:any;
    landingPageId?:number;
    DataSources?:any;
}

export class UniqueStage {
    StageTitle:string ;
    pipeline:string;
}

export class ActiveMicroDeals {
    id : number;
    title : string ;
    organizationId : number;
    groupId :  number;
    stageId :  number;
    contactId :  number;
    microDealId :  number;
    group:Group ;
    stage:any [];
}

export class Deal {
    customFields:CustomFields;
    macroDeal:MacroDealResponse;
    macroDealParameters:MacroDealParameters[];
    images:any;
    MainImage:any;
    Fields:Field[];
    sucess:boolean;    
    Scenarios:Scenario[];
}

export class MacroDealResponse {
    pipedriveId:number;
    title:string;
    description: string;
    city:string;
    state:string;
    address:string;
    squareFootage:string ;
    numberofUnits:number;
    accountId:number;
}

export class MacroDeal {
    pipedriveId: number;
    title: string;
    description: string;
    city: string;
    state: string;
    address: string;
    squareFootage: string;
    numberofUnits: any;
    pipeline: string;
    stage: string;
}

export class Org {
    id:number ;
    name:string;
}

export class personType {
    id:number ;
    label:string;
}

export class category{
    id:number;
    name:string
    message?:string;
    showMessage:boolean = false;
}

export class Member{
    firstname:string;
    lastname:string;
    email:string;
    phone:string;
}

export class Template {   
    name: any;
    body: any;
    dealId: number;
    Stage:Stage;    
    files:number[];
    subject:string;
    landingPage:boolean=false;
    outbox:string;
    MissingTags:Array<any>
    attachements:any;
    id:number;
    followUp:boolean = false;
}

export class UpdateDealParam {   
    Params : string;
    MacroDealId :number;
}

export class MacroDealRequest{
    PipedriveId:number;
    Title:string;
    Description: string;
    City:string;
    State:string ;
    Address:string ;
    SquareFootage:string ;
    NumberofUnits:number;
}

export class MacroDealParameters {
    id: number;
    pipeDriveId: number;
    paramaterValue: string;
    parameterName: string;
}

export class DealGroupParamsRequest {
    Params :string;
    MacroDealId :number;
    GroupId :number;
}

export class GroupParametes {
    groupId: number;
    id: number;
    pipeDriveId: number;
    paramaterValue: string;
    parameterName: string;
}

// export class account{
//     name:string;
//     id:number;
//     dealCount:number;
//     createdTimestamp:string;
//     updatedTimestamp:string;
//     contactCount:number;
//     isSelected:boolean ;
//     persons:Person[];
// }

export class account{
    id : number; 
    name : string;
    address : string;
    phoneNumber : string;
    description : string;
    pipedriveId : number;
    linkedIn : string;
    programName : string;
    linkedIn1 : string;
    apartments : string;
    condos : string;
    seniorHousing : string;
    studentHousing : string;
    assistedLiving : string;
    sfrPortfolio : string;
    mobileHomePark : string;
    coLiving : string;
    office : string;
    medicalOffice : string;
    manufacturing : string;
    ltIndustrial : string;
    cannabis : string;
    retail : string;
    hotel : string;
    land : string;
    selfStorage : string;
    religious : string;
    hospital : string;
    other : string;
    leasedFee : string;
    tenancy : string;
    singleTenantList : string;
    singleTenantMinBondCreditRating : string;
    hotelFlagRequired : string;
    hotelFlagList : string;
    acquisition : string;
    newDevelopment : string;
    redevelopment : string;
    refinance : string;
    loanTerms : string;
    senior : string;
    mezzanine : string;
    preferred:string;
    preferredEquity : string;
    pace : string;
    jvEquity : string;
    minimumLoanSize : string;
    maximumLoanSize : string;
    maxLtv : string;
    maxLtc : string;
    asStabilizedLtv : string;
    minDscr : string;
    investor : string;
    ownerOccupier : string;
    sponsorStates : string;
    international : string;
    recourse : string;
    corpGuarantorOk : string;
    orgId : string;
    demoOrgId : string;
    lenderName : string;
    loanProgramType : string;
    contactEmailAddress : string;
    startsTransparent : string;
    lenderPays : string;
    lenderFee : string;
    disableAutoMatch : string;
    contractStatus : string;
    contactName : string;
    contactNumber : string;
    notes : string;
    requiredFiles : string;
    rateIndex : string;
    minimumSpread : string;
    maximumSpread : string;
    typicalAmortization : string;
    prepaymentPenalty : string;
    lastUpdated : string;
    lastUpdatedBy : string;
    targetCounties : string;
    targetStates : string;
    states:string[];
    counties:string[];
    persons:Persons[];
}

// export class DealData {  
//     id:number;
//     title:string;
//     Description:string;
//     value:number;
//     currency:string;
//     add_time:string
//     update_time:string;    
// }

export class CustomFields {
    dealCustomFieldMeta: DealCustomFieldMeta[];
}

export class DealCustomFieldMeta {
    id: string;
    fieldLabel: string;
    fieldType: string;
}

export class Field {
    id: string;
    fieldValue: string;
}

export class Scenario {
    creationDate: string;
    dealId: number;
    id: number;
    title: string;
    NewGroupTitle:string;
    openScenario:boolean=false;
    groups:Group[];
}

export class Group {
    id: number;
    title: string;
    landingPageActive:number;
    scenarioId:number;
    scenario:Scenario;
    stages:Stage[];    
    microdeals:MicroDeal[];
    SentEmails:any;
    closeGroup:boolean;    
    closeLandingPage:boolean;    
    groupParameters:GroupParametes[];
    ToggleActive:boolean = true ;
}

export class Stage{ 
    toggleSendGroup:boolean;    
    toggleSendGroupFollow:boolean;    
    group: number;
    title: string;    
    order: number;
    id: number;
    microdeals:MicroDeal[];
}

export class MicroDeal{
    contact: number;
    organization: number;
    group: number;
    stage: number;
    title: string;
    description: string;
    value: number;
    currency: string;
    id: number;
    toggleInbox:boolean;
    mainInbox:Mail[];
    toggleMainInbox:boolean;
    inbox:Mail[];
    Contact:Contact[];
    activity:Activity[]; 
    actions:Actions[];    
    contacts:RootObjectPerson;
    followUpContacts:RootObjectPerson;
    latestActivity:Activity;
    newMail:number;
    inboxNumber:number;
    sent:number;
    previewBody:string;
    isSelected:boolean ;
    LandingPageLoad:Actions[]
    PreviewFile:Actions[];
    DownlaodFile:Actions[];
    MailRead:Actions[];
}

export class Actions{
    actionDate:any;
    actionName: string ;
    id: number;
    ipaddress: any;
    microDealId: number ;
    objectId: number;
}


export class Mail{
    bcc: string;
    body: string;
    cc: string;
    date: string;
    microDealId: number
    direction: number
    fromAddress: string;
    id: number;
    messageId: string
    opened: number;
    outbox: string
    subject: string
    toAddress: string
    uid: string
    togglebody:boolean;
    contactId:number
    toggleReply:boolean;
    previewMailbody:any;
    replySubject:string;
    replyBody:any;
    files:number[];
    attachements:any[];
}

export class Contact{
    email: string
    firstName: string
    id: number;
    lastName: string;
    organization: string;
    orgid: number;
    phone: string;
}

export class Activity{
    dateTime: string
    id: number;
    mailId: number;
}

export class LendersDto {
    Lenders: Array<number>;
    dealId: number;
    pipelineId: number;  
    constructor(lenders: Array<number>, dealId: number, PipeLineId: number) {
      this.Lenders = lenders;
      this.pipelineId = PipeLineId;
      this.dealId = dealId;
    }
  }

  export class RootObjectPerson {
    success: boolean;
    data: Person[];
    additional_data: AdditionalData;
    related_objects?: any;
}

export class Person {
    isSelected:boolean;
    ToggleAddMemberInbox:boolean;
    inboxPerson:Mail[];
    id: number;
    company_id: number;
    owner_id: OwnerId;
    organizationId:number;
    name: string;
    first_name: string;
    last_name: string;
    open_deals_count: number;
    related_open_deals_count: number;
    closed_deals_count: number;
    related_closed_deals_count: number;
    participant_open_deals_count: number;
    participant_closed_deals_count: number;
    email_messages_count: number;
    activities_count: number;
    done_activities_count: number;
    undone_activities_count: number;
    files_count: number;
    notes_count: number;
    followers_count: number;
    won_deals_count: number;
    related_won_deals_count: number;
    lost_deals_count: number;
    related_lost_deals_count: number;
    active_flag: boolean;
    phone: Phone[];
    email: Email[];
    first_char: string;
    update_time: string;
    add_time: string;
    visible_to: string;
    picture_id: PictureId;
    next_activity_date: string;
    next_activity_time: string;
    next_activity_id?: number;
    last_activity_id?: number;
    last_activity_date: string;
    last_incoming_mail_time: string;
    last_outgoing_mail_time: string;
    label?: number;
    im: Im[];
    postal_address: string;
    postal_address_subpremise: string;
    postal_address_street_number: string;
    postal_address_route: string;
    postal_address_sublocality: string;
    postal_address_locality: string;
    postal_address_admin_area_level_1: string;
    postal_address_admin_area_level_2: string;
    postal_address_country: string;
    postal_address_postal_code: string;
    postal_address_formatted_address: string;
    notes: string;
    birthday?: any;
    job_title: string;
    cb088cdb4268b4b1fd522dea74b578855851a221: string;
    personType: string;
    org_name: string;
    owner_name: string;
    cc_email: string;
}

export interface OwnerId {
    id: number;
    name: string;
    email: string;
    has_pic: number;
    pic_hash?: any;
    active_flag: boolean;
    value: number;
}

export interface OrgId {
    name: string;
    people_count: number;
    owner_id: number;
    address: string;
    active_flag: boolean;
    cc_email: string;
    value: number;
}

export interface Phone {
    label: string;
    value: string;
    primary: boolean;
}

export interface Email {
    label: string;
    value: string;
    primary: boolean;
}

export interface Pictures {
    _128?: any;
    _512?: any;
}

export interface PictureId {
    item_type: string;
    item_id: number;
    active_flag: boolean;
    add_time: string;
    update_time: string;
    added_by_user_id: number;
    pictures: Pictures;
    value: number;
}

export interface Im {
    value: string;
    primary: boolean;
}


export interface Option {
    label: string;
    id: number;
    color: string;
}


export interface PersonFields {
    success: boolean;
    data: PersonField[];        
}


export interface Pagination {
    start: number;
    limit: number;
    more_items_in_collection: boolean;
}

export interface AdditionalData {
    pagination?: any;
    personFields: PersonFields;
}

    

export class InTake{
    groups:InTakeGroup[];
}

export class InTakeGroup{
    id:number;
    name:string;
    displayOrder:number;
    completed:number;
    screens:Screen[] ;
}

export class Screen{
    id:number;
    color:any;
    groupId:number;
    name:string;
    title:string;
    subTitle:string;
    intro:string;
    displayOrder:number;    
    completed:number;
    containers:Container[];
    nextScreen:string;
    prevScreen:string;
    nextScreenId:number;
    prevScreenId:number;
}

export class Container{
    title:string;
    id:number;
    displayOrder:number;
    type:string;
    items:Item[];
}

export class Item{
    id:number;
    name:string;
    type:string;
    displayOrder:number;
    required:number;
    displayName:string;
    containerId:number;
    itemOptions:itemOption[];
    actionScreen:string;
    actionScreenId:number;
}

export class itemOption{
    id:number;
    value:string;
    order:number;
    actionScreenId:number;
    itemId:number;
}

export class nodes{
    id:number;
    name:string;
    children:Children[];
}
export class Children{
    id:number;
    name:string;
}
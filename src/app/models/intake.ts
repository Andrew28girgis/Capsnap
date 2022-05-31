export class GeneralX{
    userIntake:userIntake[];
    ExpirationHours:number;
    DirectLink:DirectLink;
    ChangePath:boolean=false;
    images:any[];
    MainImage:any[];
    categories:category[];
    hash:any;
    Files:File[];
}
export class DirectLink{
    creationDate: string;
    dealId: any;
    expires: string;
    hash: string;
    id: number;
}
export class category{
    id:number;
    name:string
}

export class InTakeForm{
    groups:IntakeGroup[];
    inTake:InTake ;
}

export class InTake{
    id:number;
    title:string;
    token:string;
    accountId:number;
}

export class IntakeGroup{
    id:number;
    name:string;
    displayOrder:number;    
    completed:number;
    screens:Screen[] ;
    activeGroup:boolean;
}

export class Screen{
    id:number;
    groupId:number;
    name:string;
    title:string;
    subTitle:string;
    intro:string;
    displayOrder:number;    
    completed:number;
    containers:Container[];
    nextScreen:string;
    nextScreenId:number;
    prevScreen:string;
    prevScreenId:number;
    viewOrder:number;
    containerDisplay:string;
    initDisplay:number;
    Deleted:number;
    ActiveScreen:number;
}

export class Container{
    id:number;
    title:string;
    displayOrder:number;
    type:string;
    dynamicId:any;
    initDisplay:number;
    containerDisplay:string;
    items:Item[]=[];
}

export class Item{
    id:number;
    name:string;
    type:string;
    displayOrder:number;
    required:number;
    displayName:string;
    itemOptions:itemOption[];    
    actionScreenId:number;
    containerId:number;
    itemValue:any;   
    message:string;
    showMessage:boolean=false;
    checked:boolean=false;
}

export class itemOption{
    id:number;
    value:string;
    order:number;
    displayName:string;
    actionScreenId:number;
    selected:number;
}

export class Account{
    id:number;
    email:string;
    password:any;
}

export class checkAccount{
    accountId:number;
    emailAddress:string;
    status:number;    
    verified:number;
}

export class File {
    categoryId: number;
    boxId:string;
    fileType: string;
    id:number;
    intakeId:number;
    name:string;
    uploadDate:string;
}

export class UserAccount{
    address: string;
    cellPhone: any;
    city: string;
    creationDate: string;
    email: string;
    emailVerified: number;
    firstname: string;
    id: number;
    lastActivityDate: any;
    lastname: string;
    password: string;
    stateCode: any;
    verificationCode: string;
}

export class userIntake{
    accountId: number;
    id: number;
    lastSaved: string;
    title: string;
    token: string;
    state:string;
    city:string;
    address:string;
    creationDate: string;
}
export class EditableItem{
    id: number;
    intakeId: number;
    itemId: number;
    itemValue:  string;
}

export class FileTypes{
    categoryId:number;
    required:number;
    message:string;
}
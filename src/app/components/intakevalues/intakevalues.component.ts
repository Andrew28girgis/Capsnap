import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

import { GeneralX, InTakeForm, userIntake ,IntakeGroup ,Container ,Item ,Screen} from 'src/app/models/intake';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';


@Component({
  selector: 'app-intakevalues',
  templateUrl: './intakevalues.component.html',
  styleUrls: ['./intakevalues.component.css']
})
export class IntakevaluesComponent implements OnInit {
  GeneralIntake:GeneralX;
  IntakeId:number;
  Intake:userIntake;
  inTakeForm:InTakeForm;
  intakeTitle:string;
  showAttach:boolean=false;
  showPictures:boolean=false;
  clickedIndex:number;
  generateLink:boolean =false;
  uploadFile:boolean=false;
  showFiles:boolean =false;
  activeScreen:Screen;  
  noIntakeValues:boolean;
  public uploadFormMainImage: FormGroup;
  public files: NgxFileDropEntry[] = [];
  hideAttachment:boolean=true;
  activeGroup:IntakeGroup;
  prevScreen:Screen[] = [];
  finishForm:boolean = false;
  dynamicContainerOrder = 0; 

  constructor(public activatedRoute: ActivatedRoute,public router: Router,private PipeLinesService: PipeLinesService,
    private spinner: NgxSpinnerService ,private formBuilder: FormBuilder,
    private httpClient: HttpClient,private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe((params)=>{
     this.IntakeId = params.id;
   })
   
    this.GeneralIntake = new GeneralX();
    this.getDeal(this.IntakeId )
    this.GetIntake(this.IntakeId , null , true);
    this.GetCategories();
    this.CreateFirstLink(this.IntakeId)
  }

  CreateFirstLink(IntakeId:any){
    this.PipeLinesService.createlink(this.IntakeId, 100).subscribe((res:any)=>{
      
      this.GeneralIntake.hash = res.hash;

      
      
      
   })
  }

  getDeal(DealId:number){
    this.PipeLinesService.dealDetails(DealId).subscribe((res: any) => {   
      if(res.macroDeal.intakeItems.length==0){
          this.noIntakeValues= true ;
      }else{
        this.noIntakeValues= false ;
      }
      
     })
  }

  GetCategories(){
    this.PipeLinesService.GetFileCategories().subscribe((res:any)=>{
      this.GeneralIntake.categories =res;
    })
  }

  GetIntake(AccountId:number,id?:number , SetDefaultGroup?:boolean){
    this.PipeLinesService.GetIntakes(AccountId).subscribe((res:any)=>{
      this.GeneralIntake.userIntake = res;
      this.Intake = this.GeneralIntake.userIntake.filter(intake=> intake.id == this.IntakeId )[0];
        this.intakeTitle = this.Intake?.title;
        this.PipeLinesService.GetForm(this.IntakeId).subscribe((res:any)=>{ 
          this.inTakeForm = res ; 
          this.UpdateLocalCache(res);           
          this.IntakeId = this.inTakeForm.inTake.id ;   
          if (SetDefaultGroup == true) {
          this.SetActiveGroup(this.inTakeForm.groups[0]);  
          }   
          this.spinner.hide();   
        })   
    })
  }

  GetActiveGroup():IntakeGroup{    
    this.activeGroup = this.inTakeForm.groups.filter(g=> g.activeGroup)[0];
      return this.inTakeForm.groups.filter(g=> g.activeGroup)[0];
  }

  SetActiveGroup(group:IntakeGroup){
    this.inTakeForm.groups.forEach(g=>{
      if (g.id==group.id){
        g.activeGroup=true;
      }else{
        g.activeGroup=false;
      }
    })      
    this.clickedIndex = group.id  ;  
    this.showAttach = false;
    this.showPictures = false;      
  } 

  checkItem( event:any, item:Item ){
    var checked = event.target.checked;
    if ( checked ){
        item.required = 1 ;
        console.log(item.required);
       } else {
        item.required =  0;
        console.log(item.required);
      }
  } 

  UpdateLocalCache(newintake:InTakeForm){
    if (this.inTakeForm==null){
      this.inTakeForm=newintake;
    }else{
      this.inTakeForm.groups.forEach(g=>{g.screens.forEach(s=>{if (s.Deleted==1){s.Deleted=0;s.containers.forEach(c=>{c.items.forEach(i=>{i.itemValue=null})})}})})
      newintake.groups.forEach(g => {
        var gid = g.id;      
        g.screens.forEach(s=>{
          var sid = s.id;
          s.containers.forEach(c=>{
            var cid = c.id;
            var did = c.dynamicId;
            // console.log(did);
            c.items.forEach(i=>{
              var iid = i.id;
              this.inTakeForm.groups.filter(g=>g.id==gid)[0].screens.filter(s=>s.id==sid)[0].containers.filter(c=>c.id==cid&&c.dynamicId==did)[0]
              .items.filter(i=>i.id==iid)[0].itemValue = i.itemValue;
            })

          })
        })
      });
    }      
  }
  AddNewItem(){ 
    if (this.dynamicContainerOrder==0 && this.activeGroup.screens[0].containers.filter(c=>c.containerDisplay=='Dynamic').length>0){
      this.dynamicContainerOrder= this.activeGroup.screens[0].containers.filter(c=>c.containerDisplay=='Dynamic')[0].displayOrder;
    } 

    this.dynamicContainerOrder=this.dynamicContainerOrder+1;   
      
      let k =  (this.activeGroup.screens[0].containers.length+1)*0.1;

      for (let i = 0; i < 1; i++) {
          let container = new Container();
          this.activeGroup.screens[0].containers[0].items.forEach(item=>{
            let unqItem = new Item();
            unqItem.actionScreenId = item.actionScreenId;
            unqItem.displayName = item.displayName;
            unqItem.displayOrder = item.displayOrder;
            unqItem.id = item.id;
            unqItem.itemOptions = item.itemOptions;
            if (item.itemOptions[0] != null) {
                unqItem.itemValue =item.itemOptions[0].value ;
            }else{
              unqItem.itemValue = "";
            }
            unqItem.name = item.name;
            unqItem.required = item.required;
            unqItem.type = item.type;
            container.items.push(unqItem);
          });
          container.containerDisplay= "Static";
          container.displayOrder = this.dynamicContainerOrder ;
          container.type =  "DynamicChild" ; 
          container.dynamicId =  String(k+this.activeGroup.screens[0].containers[0].id) ; 
          container.id = this.activeGroup.screens[0].containers[0].id;
          container.title =  "Default" ;    
          k = k + 0.1 ;
          this.activeGroup.screens[0].containers.push(container);
       }
       this.fixScreenId(this.activeGroup.screens[0]);
       //this.MoveToGroup(screenId);
  }


  AddNewItemChangePath(screenId:any){
    if (this.dynamicContainerOrder==0 && this.activeScreen.containers.filter(c=>c.containerDisplay=='Dynamic').length>0){
      this.dynamicContainerOrder= this.activeScreen.containers.filter(c=>c.containerDisplay=='Dynamic')[0].displayOrder;
    } 

    this.dynamicContainerOrder=this.dynamicContainerOrder+1;   
    let k =  (this.activeScreen.containers.length+1)*0.1;

      for (let i = 0; i < 1; i++) {
          let container = new Container();
          this.activeScreen.containers[0].items.forEach(item=>{
            let unqItem = new Item();
            unqItem.actionScreenId = item.actionScreenId;
            unqItem.displayName = item.displayName;
            unqItem.displayOrder = item.displayOrder;
            unqItem.id = item.id;
            unqItem.itemOptions = item.itemOptions;
            if (item.itemOptions[0] != null) {
                unqItem.itemValue =item.itemOptions[0].value ;
             }else{
               unqItem.itemValue = "";
             }
            
            unqItem.name = item.name;
            unqItem.required = item.required;
            unqItem.type = item.type;
            container.items.push(unqItem);
          });
          container.containerDisplay= "dynamicChild";
          container.displayOrder = this.dynamicContainerOrder ;
          container.id = this.activeScreen.containers[0].id;
          container.type =  this.activeScreen.containers[0].type ; 
          container.dynamicId =  String(k+this.activeScreen.containers[0].id) ; 
          container.title =  "Default" ;     
          k = k + 0.1 ;
          this.activeScreen.containers.push(container);
       }
       this.fixScreenId(this.activeScreen);
       //this.MoveToGroup(screenId);
  }

  fixScreenId(screen :Screen){
    let i = 0 ;
    screen.containers.forEach(container=>{
      if(container.id != null){
         i = container.id + 1   ;
      }
    })


    screen.containers.forEach(container=>{
      if(container.id == null){
         container.id = i ;
         i= i+1; 
      }
    })

  }

 
  
  CreateLink(){
    this.PipeLinesService.createlink(this.IntakeId, this.GeneralIntake.ExpirationHours).subscribe((res:any)=>{
       this.GeneralIntake.DirectLink = res;

    })
  }
  
  CopyText()
  {
   let p:any = document.getElementById('userinput')?.innerHTML;
   const selBox = document.createElement('textarea');
   selBox.style.position = 'fixed';
   selBox.style.left = '0';
   selBox.style.top = '0';
   selBox.style.opacity = '0';
   selBox.value = p;
   document.body.appendChild(selBox);
   selBox.focus();
   selBox.select();
   document.execCommand('copy');
   document.body.removeChild(selBox);
  }

  
  ShowAttachments(){
    this.showAttach =true ;
    this.showPictures =false
  }

  ShowPic(){
    this.showAttach =false ;
    this.showPictures =true ;
    this.spinner.show();

  setTimeout(() => {
    this.spinner.hide();
  }, 5000);
  }

  SaveIntake(lastSave?:number){          
    this.spinner.show();
    this.PipeLinesService.SaveIntake(this.inTakeForm).subscribe((res:any)=>{        
      this.GetIntake(this.IntakeId);
      // window.location.reload();
      if(lastSave == 0){
        this.GeneralIntake.ChangePath = false;
        window.location.reload();
        this.clickedIndex = this.inTakeForm.groups[0].id;
      }
    this.spinner.hide();
    })
  }

  public DropFiles(files: NgxFileDropEntry[] , filex?:any) {
    this.files = files;
    var categoryId:any;
    if( filex?.categoryId!=undefined ) { categoryId =filex.categoryId;  }else{ categoryId=1; }

    for (const droppedFile of files) {
      if ( droppedFile.fileEntry.isFile ) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {  
            const formData = new FormData();  
            formData.append('file', file);   
            formData.append('categoryId',categoryId);   
            formData.append('categoryId', "1");  
            formData.append('dealId', String(this.IntakeId));
            let  SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveFile";
            this.spinner.show();
            this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {         
              this.getFiles(this.IntakeId);
              this.spinner.hide(); 
            });
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  
  UpdateFiles(){ 
    this.spinner.show();
    this.PipeLinesService.UpdateFiles(this.GeneralIntake.Files).subscribe(res=>{  
    this.spinner.hide();
     })
  }

  getFileCategoryName(CategoryId:number){
    return  this.GeneralIntake.categories.filter(c=>c.id==CategoryId)[0].name;
  }

  getFiles(IntakeId:number){
    this.PipeLinesService.GetDealFiles(IntakeId).subscribe((res:any)=>{
      this.GeneralIntake.Files = res.files;
      if(this.GeneralIntake.Files){
        this.showFiles =true;
      }
      if(this.GeneralIntake.Files.filter(f=>f.name==null).length>0){
        this.uploadFile=true;
      }
    })
  }
  
  public UploadImages( files: NgxFileDropEntry[] ) {
    this.files = files;
    for (const droppedImages of files) {
      // Is it a file?
      if (droppedImages.fileEntry.isFile) {
        const fileEntry = droppedImages.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedImages.relativePath, file);
            const formData = new FormData();  
            formData.append('file', file);   
            formData.append('dealId', String(this.IntakeId));
            let   SERVER_URL = "http://40.76.123.27:8096/api/deal/SaveImage";
            this.spinner.show();
            this.httpClient.post<any>(SERVER_URL, formData).subscribe( (res) => {         
              this.GetIntakeImages(this.inTakeForm.inTake.id);  
              this.spinner.hide();
              });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedImages.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedImages.relativePath, fileEntry);
      }
    }
  }

  GetIntakeImages(IntakeId:number){
    this.spinner.show()
    this.PipeLinesService.GetDealImages(IntakeId).subscribe(res=>{
      this.GeneralIntake.images = res.filter(r=> r!= 'main.jpg');
      this.GeneralIntake.MainImage =  res.filter(r=> r=='main.jpg');
      console.log(`mainimage`);
      
      console.log(this.GeneralIntake.MainImage);
        
        // this.showImages = true ;
      this.spinner.hide() ;
    })
  }

  SetMainImg(imageName:string){
    this.PipeLinesService.SetMainImage(this.IntakeId , imageName).subscribe(res=>{
      this.GetIntakeImages(this.IntakeId);
      //  window.location.reload();
    })
  }
  public fileOver(event:any){
    console.log(event);
  }
  
  public fileLeave(event:any){
    console.log(event);
  }
  
  CommaFormatted(event:any , item:Item) {  
    if(event.which >= 37 && event.which <= 40) return;
    if (item.itemValue) {
     item.itemValue = item.itemValue.replace(/\D/g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
   
   numberCheck (args:any) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  getTotal(container:Container){    
    let total:number = 0   ;
    this.activeGroup.screens[0].containers.forEach(container => {
      container.items.forEach(item=>{      
        if (item.type == "Money" && item.itemValue != null){        
          total += +item.itemValue.replaceAll( "," , "");         
        } if (item.type == "NegativeMoney" && item.itemValue != null) {
            total-= +item.itemValue.replaceAll( "," , "");
        }         
      })
    });
    
    this.activeGroup.screens[0].containers.forEach(container=>{
      container.items.forEach(item=>{      
        if (item.type=="SumLabel"){
          item.itemValue=total;         
        }           
      })
    })
   }

   showMessage(item:Item){
    item.showMessage =! item.showMessage;
    
  }
  GetItemValue(event:any ,item:Item){
    var olditemValue = item.itemValue ;
    item.itemValue = event.target.value;  
    if (item.itemOptions.filter(o=>o.actionScreenId!=null).length>0){
      this.ClearForm(item.id , olditemValue);        
      this.GeneralIntake.ChangePath = true;
      var NextScreenId = item.itemOptions.filter(o=>o.id==event.target.value)[0].actionScreenId;
      this.inTakeForm.groups.filter(group=>{
        group.screens.filter(screen=>{
          if (screen.id == NextScreenId){
            this.activeScreen = screen;  
            this.clickedIndex =  0  ;  
          }            
        })})
    }   
  }

  ClearForm(itemId:number,oldItemValue:number){      
    let DeletedScreens:number[]= [] ;   
    var loopAgain = true;
      if (oldItemValue!=null){
        this.inTakeForm.groups.forEach(g=>{
          g.screens.forEach(s=>{  
            s.containers.forEach(c=>{
              c.items.forEach(item=>{ 
                if(item.id==itemId){             
                  s.containers.forEach(c=>{
                    c.items.forEach(item=>{                    
                        item.itemOptions.forEach(o=>{
                          if (o.id == oldItemValue){  
                            var activeScreen = this.getScreen(o.actionScreenId);
                            if (!DeletedScreens.includes(activeScreen.id)) DeletedScreens.push(activeScreen.id);     
                            while (loopAgain){
                              loopAgain=false;       
                                if (activeScreen.nextScreenId!=null){            
                                  if (!DeletedScreens.includes(activeScreen.nextScreenId))DeletedScreens.push(activeScreen.nextScreenId);
                                  activeScreen = this.getScreen(activeScreen.nextScreenId);
                                  loopAgain=true; 
                                }
                                else {
                                  activeScreen.containers.forEach(c=>{
                                    c.items.forEach(item=>{
                                      if (item.itemOptions!=null){
                                        item.itemOptions.forEach(o=>{
                                          if (item.itemValue==o.id){
                                            activeScreen = this.getScreen(o.actionScreenId);
                                            if (!DeletedScreens.includes(o.actionScreenId)) DeletedScreens.push(o.actionScreenId);
                                            loopAgain=true;                                                                                             
                                      }            
                                    })
                                  }            
                                })
                             })
                            }   
                          }                           
                          }                                  
                        })                                 
                              
                    })
                  })  
                }                
              })
            })  
          })
      })   
     }
    DeletedScreens.forEach(s=>{
     var screen = this.getScreen(s);
     screen.Deleted=1;
    })
    // this.SaveIntake();    
  }
  getScreen(id:number):Screen{            
    var groupid = 0;
    this.inTakeForm.groups.forEach(group=>{                          
        if (group.screens.filter(s=>s.id==id).length>0){
          groupid = group.id;
        }       
      }        
    )                 
    return this.inTakeForm.groups.filter(g=>g.id==groupid)[0].screens.filter(s=>s.id==id)[0];
  }
  CancelChangePath(){
    window.location.reload();
}
getTotalChangePath(screen:Screen){    
  let total:number = 0   ;
  screen.containers.forEach(container => {
   container.items.forEach(item=>{      
     if (item.type == "Money" && item.itemValue != null){        
       total += +item.itemValue.replaceAll( "," , "");         
     } if (item.type == "NegativeMoney" && item.itemValue != null) {
         total-= +item.itemValue.replaceAll( "," , "");
     }         
   })
  });
     
  screen.containers.forEach(container=>{
   container.items.forEach(item=>{      
     if (item.type=="SumLabel"){
       item.itemValue=total;         
     }           
   })    
  })
console.log("total:"+total);

 
 }
 MoveToScreen(screenId:number ,item?:Item ,iconId?:number){ 
  if ( screenId == 0 ){      
  this.finishForm = false;
  this.activeScreen = this.prevScreen[this.prevScreen.length-1];    
  this.prevScreen.pop();
} 
 else{
  if( item != undefined ){
    item.itemValue = 'selected';
  }

  if(item?.type =="Icons"){
    item.itemValue = iconId;
  }

  // if (this.activeScreen.Deleted == 1 ) {
  //    this.activeScreen.Deleted = 0 ;
  //    this.activeScreen.containers =  this.activeScreen?.containers?.filter(c=>c.type!= "DynamicChild");
  //    console.log(`from Movetoscreen`);
  //    console.log(this.activeScreen?.containers?.filter(c=>c.type!="DynamicChild"));
  // }
  
  this.activeScreen?.containers?.forEach(container => {
    if (container.type == "Form"){
      container.items.forEach(item => {      
        if (item.itemValue == null){
          if (item.type == "Text"){
            item.itemValue ="";
          }
          if (item.type == "Address"){
            item.itemValue ="";
          }
          if (item.type == "State"){
            item.itemValue ="";
          }
          if (item.type == "City"){
            item.itemValue ="";
          }
          if (item.type == "Zip"){
            item.itemValue =0;
          }
          if (item.type == "Money"){
            item.itemValue = 0;
          }
          if (item.type == "NegativeMoney"){
            item.itemValue = 0;
          }
          if (item.type == "Number"){
            item.itemValue = 0;
          }    
            
          if (item.type == "SumLabel"){
            item.itemValue = 0;
          }      
          if (item.type == "DropDown" ){   
            if (item.itemOptions.filter(o=>o.selected==1)[0]?.value ) {
              item.itemValue= item.itemOptions.filter(o=>o.selected==1)[0]?.value;       
            } else {
              item.itemValue= item.itemOptions[0].value;      
            }
          }     
        }          
      });  
    }  
  });

  this.inTakeForm?.groups?.forEach(group => {
    if (group.screens!=null){
      group.screens.forEach(screen => {
        if (screen.id == screenId){            
          if (screen.Deleted == 1){
            screen.Deleted = 0;
            screen.containers =  screen.containers?.filter(c=>c.type !== "DynamicChild" );
         }
          screen.viewOrder = this.prevScreen.length+1;
          this.prevScreen.push(this.activeScreen);
          this.activeScreen = screen;   
          screen.containers.forEach(c=>{
            if (c.containerDisplay=='Dynamic' && c.dynamicId == null) {
              c.dynamicId= String(c.id + 0.1);
            }
            // if(c.containerDisplay == 'Dynamic' && c.initDisplay > 0){
            //   if (this.dynamicContainerOrder==0 && this.activeScreen.containers.filter(c=>c.containerDisplay=='Dynamic').length>0){
            //     this.dynamicContainerOrder= this.activeScreen.containers.filter(c=>c.containerDisplay=='Dynamic')[0].displayOrder;
            //   }                   
            //   this.dynamicContainerOrder=this.dynamicContainerOrder+1; 
            //   c.dynamicId= String(c.id + 0.1);
            //   let k = 0.2 ;
            //   for (let i = 0; i < c.initDisplay; i++) {
            //     let container = new Container();
            //     this.activeScreen.containers[0].items.forEach(item=>{
            //       let unqItem = new Item();
            //       unqItem.actionScreenId = item.actionScreenId;
            //       unqItem.displayName = item.displayName;
            //       unqItem.displayOrder = item.displayOrder;
            //       unqItem.id = item.id;
            //       unqItem.itemOptions = item.itemOptions;
            //       if (item.itemOptions!=null && item.itemOptions.length>0){
            //         unqItem.itemValue = item.itemOptions[i+1].value;
            //       }                    
            //       unqItem.name = item.name;
            //       unqItem.required = item.required;
            //       unqItem.type = item.type;
            //       container.items.push(unqItem);
            //     })
            //     container.displayOrder = this.dynamicContainerOrder;
            //     container.containerDisplay="Static";                    
            //     container.type ="DynamicChild";    
            //     container.dynamicId = String(c.id +  k) ;                                                          
            //     container.id =c.id;             
            //     container.title =  this.activeScreen.containers[0].type ;  
            //     this.activeScreen.containers.push(container);
            //     this.dynamicContainerOrder=this.dynamicContainerOrder+1; 
            //     k = k + 0.1 ;
            //   }
            //   this.fixScreenId(this.activeScreen);
            // }
          }) 
          let formCheck =  screen.containers.filter(c=> c.type == 'Form');
          formCheck.filter(item=>{
              item.items.forEach(item=>{  
                if(formCheck.length > 0 &&  item.type !== "Icons"  && screen.nextScreenId == null){
                  this.finishForm = true; 
                }
              })
          })
        }
      });  
    }      
  });      
}
}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PipeLinesService } from 'src/app/services/pipe-lines.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { General, InTake, InTakeGroup, Screen, Container ,Item, itemOption } from 'src/app/models/domain';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,public router: Router,private PipeLinesService: PipeLinesService,
    private spinner: NgxSpinnerService ,private formBuilder: FormBuilder,
    private httpClient: HttpClient,private sanitizer: DomSanitizer , private modalService: NgbModal,  ) { }

  Intake:InTake;
  General:General;
  selectedGroupIndex:number;
  selectedScreenIndex:number;
  selectedItemIndex:number;
  newScreen:boolean =false;  
  ShowAddItem:boolean =false;  
  ShowAddOption:boolean =false;  
  NewScreen:Screen;
  NewItem:Item;
  NewOption:itemOption;
  container:Container;
  ContainerId:number;
  Group:InTakeGroup ;
  colors:any[]=[]

  Sc:Screen;
  Item:Item;

  ngOnInit(): void {
    this.Intake = new InTake();
    this.General = new General();
     this.getForm();
  }
  

 
 getForm(){
   this.spinner.show();
    this.PipeLinesService.GetForm().subscribe((res:any)=>{
      this.Intake = res;
      this.spinner.hide();
    })
  }

  getScreens(groupId:number , index?: number){
    this.PipeLinesService.getScreens(groupId).subscribe(res=>{
      this.General.screens = res ;

      this.General.screens.forEach(screen => {
      
        screen.color = '#'+Math.floor(Math.random()*16777215).toString(16);
       }); 
       console.log(this.General.screens);
       

      this.selectedGroupIndex = index;
      this.selectedScreenIndex = NaN;
    })
  }
  
  GetScreenName(id:number){
    return this.General.screens.filter(screen=> screen.id == id)[0]?.name ;
  }
   
  GetScreenColor(id:number){
    return this.General.screens.filter(screen=> screen.id == id)[0]?.color ;
  }

  AddNewScreen(GroupId:number){
    this.General.screens =  [];
    this.newScreen =true ;
    this.NewScreen = new Screen();
    this.NewScreen.containers = [];
    this.container = new Container();
    this.container.title = "Default";
    this.NewScreen.groupId =  GroupId;
    this.NewScreen.containers.push(this.container);
  }

  CloseAddScreen(){
    this.newScreen =false ;
  }

  SaveScreen(){
    this.spinner.show();
    this.PipeLinesService.SaveScreen(this.NewScreen).subscribe(res=>{
      this.getForm();
      this.getScreens(this.NewScreen.groupId);
      this.newScreen =false ;
      this.spinner.hide();
    })
  }
  
  DeleteGroup(GroupId:number){
    this.PipeLinesService.DeleteInTake('group' , GroupId).subscribe(res=>{
      this.spinner.hide();
    })
  }

  DeleteScreen(Screen:Screen){
    this.spinner.show();
    this.PipeLinesService.DeleteInTake('screen' , Screen.id).subscribe(res=>{
      this.getScreens(Screen.groupId);
      this.spinner.hide(); 
    })
  }

  GetItems(Screen:Screen , index?: number){
    this.Sc = Screen;
    this.PipeLinesService.getItems(Screen.containers[0].id).subscribe(res=>{
      this.General.items = res ;
      this.selectedScreenIndex = index;
      this.selectedItemIndex = NaN;
    })
  }
  
  GetOptions(Item:Item  , index?: number){
    this.spinner.show();
    this.PipeLinesService.getItemOptions(Item.id).subscribe(res=>{
      this.General.itemOptions = res;
      this.selectedItemIndex = index;
      this.spinner.hide();
    })
  }
  
  AddNewItem(Screen:Screen){
    this.General.items =  [];
    this.ShowAddItem =true ;
    let ContainerId = Screen.containers[0].id ;   
    this.NewItem = new Item();
    this.NewItem.containerId =ContainerId ;
  }

  CloseAddNewItem(){
    this.ShowAddItem = false ;
  }

  SaveItem(){
    this.spinner.show();
    this.PipeLinesService.SaveItem(this.NewItem).subscribe(res=>{
      this.ShowAddItem =  false ;
      this.spinner.hide();
    })
  }

  AddNewOption(item:Item){
    this.Item = item ;
    this.General.itemOptions =  [];
    this.ShowAddOption =true ;
    let itemId = item.id;
    this.NewOption = new itemOption();
    this.NewOption.itemId = itemId;
  }

  CloseNewOption(){
    this.ShowAddOption = false ;
  }

  SaveOption(){
    this.PipeLinesService.SaveOption(this.NewOption).subscribe(res=>{
      console.log(res);
      this.ShowAddOption =false ;
      this.GetOptions(this.Item);
    })
  }

  GetScreenId(ActionScreenId: any){
    this.General.ActionScreenId = ActionScreenId.value;
  }

  SaveActionScreen(){
    this.spinner.show();
    this.PipeLinesService.SetItemNav(this.General.modalObject.id ,this.General.ActionScreenId).subscribe(res=>{
       this.GetItems(this.Sc);
       this.spinner.hide();
    })
  }

  GetNextScreenId(NextScreenId: any){
    this.General.NextScreenId = NextScreenId.value;
  }

  SaveNextScreen(){
    this.spinner.show();
    this.PipeLinesService.SetNav(this.General.modalObject.id , this.General.NextScreenId , 0).subscribe(res=>{
      this.getScreens(this.General.modalObject.groupId);
      this.spinner.hide();
   })
  }

  GetPrevScreenId(NextScreenId: any){
    this.General.PrevScreenId = NextScreenId.value;
  }

  SavePrevScreen(){
    this.spinner.show();
    this.PipeLinesService.SetNav(this.General.modalObject.id , 0 , this.General.PrevScreenId).subscribe(res=>{
      this.getScreens(this.General.modalObject.groupId);
      this.spinner.hide();
   })
  }

  DeleteItem(ItemId:number){
    this.PipeLinesService.DeleteInTake('item' , ItemId).subscribe(res=>{
      this.spinner.hide();
      this.GetItems(this.Sc)
    })
  }

  DeleteOption(OptionId:number){
     this.PipeLinesService.DeleteInTake('itemoption' , OptionId).subscribe(res=>{
      this.GetOptions(this.Item);
     })
  }

  open(content, modalObject?:any ) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
    this.General.modalObject = modalObject;
  }

}

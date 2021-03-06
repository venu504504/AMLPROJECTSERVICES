import {SelectionModel} from '@angular/cdk/collections';
import theme from '../../../../@vex/utils/tailwindcss';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatTableDataSource} from '@angular/material';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icSettings from '@iconify/icons-ic/twotone-settings';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ApiProvider } from 'src/app/services/api-provider';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'vex-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss'],
  
})
export class SummeryComponent implements OnInit {

	  onCustomFields: FormGroup;
	  
 onGroupForm: FormGroup;
 submitted = false;
 public name:String='';
 public email:String='';
 
  icSettings = icSettings;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  icMoreVert = icMoreVert;
  theme = theme;
  ngOnInit() {
	
	      this.onCustomFields = this.formBuilder.group({
      fields: [null, Validators.compose([ Validators.required])],
	     receiveEmail: [null, Validators.compose([ Validators.required])],
		    locale: [null, Validators.compose([ Validators.required])]
        

    });
	
    this.apiProvider.getUserDetails('users').subscribe(
      async resdata => {
                const res = resdata;
                let UserData = [];
                if(res){
                  UserData = res;
                  this.name = UserData[0].firstName + ' ' + UserData[0].lastName;
                  this.email = UserData[0].email;
                }
        }, async (error) => {
          console.log("error occured")
        });
	    this.onGroupForm = this.formBuilder.group({
      positive: [null, Validators.compose([
        Validators.required
      ])],
	  
	      risk: [null, Validators.compose([
        Validators.required
      ])],
	       reason: [null, Validators.compose([
        Validators.required
      ])],
	      posiible: [null, Validators.compose([
        Validators.required
      ])],
	  
	       posiibleRisk: [null, Validators.compose([
        Validators.required
      ])],
	  
	       posiiblReason: [null, Validators.compose([
        Validators.required
      ])],
	  
	  
	       falses: [null, Validators.compose([
        Validators.required
      ])],
	  
	       falsesRisk: [null, Validators.compose([
        Validators.required
      ])],
	  
	   
	       falsesReason: [null, Validators.compose([
        Validators.required
      ])],
	  
	   
	       unspecified: [null, Validators.compose([
        Validators.required
      ])],
	  
	       unspecifiedRisk: [null, Validators.compose([
        Validators.required
      ])],
	  
	  
	       unspecifiedReason: [null, Validators.compose([
        Validators.required
      ])]
	  
	     
    });
  }
  closeResult: string;

  constructor(private modalService: NgbModal,
  private formBuilder: FormBuilder,
  private apiProvider: ApiProvider) {}
  

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

 openXl(content) { this.modalService.open(content, {size: 'lg'}); }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }
    openScrollableUser(longUser) {
    this.modalService.open(longUser, { size: 'lg' ,scrollable: true });
  }
      openScrollableAuto(longAuto) {
    this.modalService.open(longAuto, { size: 'lg' ,scrollable: true });
  }
  
  
   resetform() {
   this.onCustomFields.reset();
  }
  
 
  resetBankform() {
     this.onGroupForm.reset();
  }
  
}

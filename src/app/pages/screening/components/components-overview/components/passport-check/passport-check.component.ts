import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';


import icClose from '@iconify/icons-ic/twotone-close';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProvider } from 'src/app/services/api-provider';
import { ComponentsOverviewSVC } from '../../components-overview.service';



@Component({
  selector: 'vex-passport-check',
  templateUrl: './passport-check.component.html',
  styleUrls: ['./passport-check.component.scss']
})
export class PassportcheckComponent implements OnInit {

  progressHTML =
    `<mat-progress-bar mode="determinate" [value]="40"></mat-progress-bar>
<mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
<mat-progress-bar mode="buffer" color="accent"></mat-progress-bar>
<mat-progress-bar mode="query" color="warn"></mat-progress-bar>`;

  public passportCheckForm: any;
    submitted = false;
    public countryList:Array<Object> = [];


 constructor(
   private router: Router,
    private formBuilder: FormBuilder,
    private apiProvider: ApiProvider,
    private ComponentsOverviewSVC:  ComponentsOverviewSVC) {}
 

   ngOnInit() {
   this.passportCheckForm = this.formBuilder.group({
	  Name: [null, Validators.compose([Validators.required])],
	  caseId: [null, Validators.compose([Validators.required])],
	  date: [null, Validators.compose([Validators.required])],
	  countryLoc: [null, Validators.compose([Validators.required])],
	  placeofBirth: [null, Validators.compose([Validators.required])],
	  Nationality: [null, Validators.compose([Validators.required])],
	  givenName: [null, Validators.compose([Validators.required])],
	  lastName: [null, Validators.compose([Validators.required])],
	  issuingState: [null, Validators.compose([Validators.required])],
	  passportcheckNat: [null, Validators.compose([Validators.required])],
	  idNumber: [null, Validators.compose([Validators.required])],
	  dateofExpiry: [null, Validators.compose([Validators.required])]
 });
 this.ComponentsOverviewSVC.getCountryList('reference/countries').subscribe(
  async resdata => {
            const res = resdata;
            if(res){
              console.log('res country',res)
              this.countryList = res;
            }
    }, async (error) => {
      console.log("error occured")
    });
 
  }


 public hasError = (controlName: string, errorName: string) => {
    return this.passportCheckForm.controls[controlName].hasError(errorName);
  }
  submitPassportCheck(){
    // this.submitted = true;
    // if (this.passportCheckForm.invalid) {
    //   return;
    // }
    // alert('form fields are validated successfully!');  
    // const inputData = {
    //   // name: this.vesselScreeningForm.value.name,
    //   // caseId: this.vesselScreeningForm.value.caseId,
    //   // registeredCountry: this.vesselScreeningForm.value.registeredCountry
    //   Name: this.passportCheckForm.value.Name,
    //   caseId: this.passportCheckForm.value.caseId,
    //   date: this.passportCheckForm.value.date,
    //   countryLoc: this.passportCheckForm.value.countryLoc,
    //   placeofBirth: this.passportCheckForm.value.placeofBirth,
    //   Nationality: this.passportCheckForm.value.Nationality,
    //   givenName: this.passportCheckForm.value.givenName,
    //   lastName: this.passportCheckForm.value.lastName,
    //   issuingState: this.passportCheckForm.value.issuingState,
    //   passportcheckNat: this.passportCheckForm.value.passportcheckNat,
    //   idNumber: this.passportCheckForm.value.idNumber,
    //   dateofExpiry: this.passportCheckForm.value.dateofExpiry
    // }
    const inputData = {
      groupId: localStorage.getItem('groupId'),
      entityType: 'INDIVIDUAL',
      providerTypes: [
            "WATCHLIST", "PASSPORT_CHECK"
          ],
      clientCaseId:"",
      name: this.passportCheckForm.value.name,
      caseScreeningState:"INITIAL",
      secondaryFields:[
        {typeId: 'SFCT_4',value: this.passportCheckForm.value.date},
        {typeId: 'SFCT_5',value: this.passportCheckForm.value.countryLoc},
        {typeId: 'SFCT_6',value: this.passportCheckForm.value.placeofBirth},
        {typeId: 'SFCT_7',value:  this.passportCheckForm.value.Nationality},
        {typeId: 'SFCT_8',value: this.passportCheckForm.value.givenName},
        {typeId: 'SFCT_9',value: this.passportCheckForm.value.lastName},
        {typeId: 'SFCT_10',value: this.passportCheckForm.value.issuingState},
        {typeId: 'SFCT_11',value: this.passportCheckForm.value.passportcheckNat},
        {typeId: 'SFCT_12',value: this.passportCheckForm.value.idNumber},
        {typeId: 'SFCT_13',value: this.passportCheckForm.value.dateofExpiry},
        ],
        customFields:[]
    }
    console.log({inputData})
    this.ComponentsOverviewSVC.createPassportCheck('cases',inputData).subscribe(
      async resdata => {
                const res = resdata;
                if(res){
                  //show some message
                }
        }, async (error) => {
          console.log("error occured")
        });
  }

}

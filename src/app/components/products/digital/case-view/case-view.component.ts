import { insurerDetails } from './../../../../models/insurerDetails';
import { address } from './../../../../models/address';
import { CasedetailsService } from './../../../../services/casedetails.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  NgForm,
  FormBuilder
} from '@angular/forms';
import { casedetails } from './../../../../models/casedetails';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { id } from '@swimlane/ngx-charts';
import { tap } from 'rxjs/operators';
import { thirdpartyDetails } from 'src/app/models/thirdpartydetails';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import swal from 'sweetalert';


@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent implements OnInit {
  private selectCaseID: number;
  @Input() Casedetails: casedetails;
  @Input() searchTerm: string;
  private _route: any;
  EditForm: FormGroup;
  case: casedetails;
  caseForm: NgForm;
  // CasedetailsService: any;
  fetchAll: any;
  casedet$: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private caseservice: CasedetailsService,
    private fb:FormBuilder,
    private toastrService: ToastrService
  ) {
    var ID: number;
    // debugger;
    this.route.queryParams.subscribe((params) => {
      ID = params['ID'];
    });

    this.caseservice.getByID(ID).subscribe((data: casedetails) => {
      console.log(data);
      this.case = data[0];
        debugger;
      this.EditForm = new FormGroup({
        ID:new FormControl(this.case['ID']),
        CaseID: new FormControl(this.case['CaseID']),
        Name: new FormControl(this.case['Name']),
        Description: new FormControl(this.case['Description']),
        ReferenceNumber: new FormControl(this.case['ReferenceNumber']),
        InsurerVerificationNotes: new FormControl(this.case['InsurerVerificationNotes']),
        T_VerificationNotes: new FormControl(this.case['T_VerificationNotes']),
        DueDate: new FormControl(this.case['DueDate']),
        CreatedBy: new FormControl(this.case['CreatedBy']),
        LastModifiedBy: new FormControl(this.case['LastModifiedBy']),
        insAddress: new FormControl(this.case['insAddress']),
        insDetails: new FormControl(this.case['insDetails']),
        tpartyDetails: new FormControl(this.case['tpartyDetails']),
        InsurerName: new FormControl (this.case['InsurerName']),
        AddressLine1: new FormControl (this.case['AddressLine1']),
        AddressLine2: new FormControl (this.case['AddressLine2']),
        City: new FormControl (this.case['City']),
        State: new FormControl (this.case['State']),
        Landmark: new FormControl (this.case['Landmark']),
        Pincode: new FormControl (this.case['Pincode']),
        T_AddressLine1: new FormControl (this.case['T_AddressLine1']),
        T_AddressLine2: new FormControl (this.case['T_AddressLine2']),
        T_City: new FormControl (this.case['T_City']),
        T_Landmark: new FormControl (this.case['T_Landmark']),
        T_State: new FormControl (this.case['T_State']),
        T_Pincode: new FormControl (this.case['T_Pincode']),
        T_EmailID: new FormControl (this.case['T_EmailID']),
        EmailID: new FormControl (this.case['EmailID']),
        PhoneNumber: new FormControl (this.case['PhoneNumber']),
        T_PhoneNumber: new FormControl (this.case['T_PhoneNumber']),
        ThirdpartyName: new FormControl (this.case['ThirdpartyName']),
        I_CaseID:new FormControl (this.case['I_CaseID']),
        I_AddressLine1: new FormControl (this.case['I_AddressLine1']),
        I_AddressLine2: new FormControl (this.case['I_AddressLine2']),
        I_City: new FormControl (this.case['I_City']),
        I_State: new FormControl (this.case['I_State']),
        I_Pincode: new FormControl (this.case['I_Pincode']),
        I_Landmark: new FormControl (this.case['I_Landmark']),
        I_AddressID: new FormControl(this.case['I_AddressID']),
        T_AddressID: new FormControl (this.case['T_AddressID'])

      });
    });

  }

  ngOnInit(): void {
  }

  casedetailsupdate(){
    // debugger;
    this.caseservice.update(this.route.queryParams,this.EditForm.value).subscribe((result)=>{
      console.log("Cd updated!");

      // this.toastrService.success('Case Details Updated');
      // window.alert("success")
      // swal("Hello world!");
      // swal({
      //   icon: "success",
      //   buttons: [false],
      // });

      swal( {
        icon:"success",
        title:"Case Details Updated Succesfully!!",
        buttons: [false],
        timer: 1500,
      });
      // debugger;
      this.router.navigate(['/products/digital/digital-product-list']);


    });
  }

}

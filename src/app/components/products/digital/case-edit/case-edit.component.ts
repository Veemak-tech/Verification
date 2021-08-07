import { InsAudioRecordingService } from './../../../../services/ins-audio-recording.service';
import { AudioRecordingService } from './../../../../services/audio-recording.service';
import { insurerDetails } from './../../../../models/insurerDetails';
import { address } from './../../../../models/address';
import { CasedetailsService } from './../../../../services/casedetails.service';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  NgForm,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { casedetails } from './../../../../models/casedetails';
import { Router, ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { id } from '@swimlane/ngx-charts';
import { tap } from 'rxjs/operators';
import { thirdpartyDetails } from 'src/app/models/thirdpartydetails';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import swal from 'sweetalert';
import { first } from 'rxjs/operators';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import videojs from 'video.js';
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as Record from 'videojs-record/dist/videojs.record.js';
import { Observable } from 'rxjs';
import { questions } from 'src/app/models/questions';
import { answers } from 'src/app/models/questionanswers';
let ReecordRTC = require('recordrtc/RecordRTC.min');
declare var $ : any
@Component({
  selector: 'app-case-edit',
  templateUrl: './case-edit.component.html',
  styleUrls: ['./case-edit.component.scss'],
})
// @Injectable({
//   providedIn: 'root'
// })
export class CaseEditComponent implements OnInit, OnDestroy {
  private selectCaseID: number;
  @Input() Casedetails: casedetails;
  @Input() searchTerm: string;
  agents : any;
  Agname : any;
  putagname:  any;
  private _route: any;
  EditForm: FormGroup;
  AnswerForm: FormGroup;
  form: FormGroup;
  case: casedetails;
  caseForm: NgForm;
  // CasedetailsService: any;
  fetchAll: any;
  casedet$: any;
  submitted = false;
  errmsg: any


  isRecording = false;
  IisRecording = false

  recordedTime;
  IrecordedTime;

  blobUrl;
  IblobUrl;

  vdata: any;
  Ivdata: any
  fileInfos: Observable<any>;
  progress = 0;
  message = '';
  caseidForFileName: any;
  IcaseidForFileName: any;
  audioBlob;
  IaudioBlob;
  adata: any;
  adataI:any;


  ins_questionsarray: any;
  t_questionsarray: any;
  answerdataarray: any;


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private caseservice: CasedetailsService,
    private formbuilder: FormBuilder,
    private toastrService: ToastrService,
    private audiorecordservice: AudioRecordingService,
    private insaudiorecordservice: InsAudioRecordingService,
    private authService : AuthService,
    private sanitizer: DomSanitizer,
    elementRef: ElementRef,
    private ref: ChangeDetectorRef
  ) {


    // ---------------------------------------------Case Details Update Start---------------------
    var ID: number;

    this.route.queryParams.subscribe((params) => {
      debugger;
      ID = params['ID'];
    });


    this.caseservice.getByID(ID).subscribe((data: casedetails) => {
      // console.log(data);
      this.case = data[0];
      debugger;
      this.EditForm = new FormGroup({
        ID: new FormControl(this.case['ID']),
        CaseID: new FormControl(this.case['CaseID'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.pattern('^[a-z.A-Z 0-9]*$'),
        ]),
        ReferenceNumber: new FormControl(this.case['ReferenceNumber'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.pattern('^[a-z.A-Z 0-9]*$'),
        ]),
        DueDate: new FormControl(this.case['DueDate'], [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        Name: new FormControl(this.case['Name'], [
          Validators.required,
          // Validators.minLength(5),
          // Validators.maxLength(15),
          // Validators.pattern('^[a-z.A-Z ]*$')
        ]),
        Description: new FormControl(this.case['Description'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(256),
        ]),
        InsurerName: new FormControl(this.case['InsurerName'], [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-Z ]*$')
        ]),
        PhoneNumber: new FormControl(this.case['PhoneNumber'], [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
          Validators.pattern('^[- ,()+0-9]*$'),
        ]),
        AlternativePhoneNumber: new FormControl(this.case['AlternativePhoneNumber'], [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ]),
        EmailID: new FormControl(this.case['EmailID'], [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ]),
        I_AddressLine1: new FormControl(this.case['I_AddressLine1'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
        I_AddressLine2: new FormControl(this.case['I_AddressLine2'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
        I_City: new FormControl(this.case['I_City'], [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-Z ]*$')
        ]),
        I_State: new FormControl(this.case['I_State'], [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-Z ]*$')
        ]),
        I_Pincode: new FormControl(this.case['I_Pincode'], [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$')
        ]),
        I_Landmark: new FormControl(this.case['I_Landmark'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
        InsurerVerificationNotes: new FormControl(
          this.case['InsurerVerificationNotes'],
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(250),
          ]
        ),
        ThirdpartyName: new FormControl(this.case['ThirdpartyName'], [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern('^[a-z.A-Z ]*$')
        ]),
        T_PhoneNumber: new FormControl(this.case['T_PhoneNumber'], [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
          Validators.pattern('^[- ,()+0-9]*$'),
        ]),
        T_AlternativePhoneNumber: new FormControl(this.case['T_AlternativePhoneNumber'], [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ]),
        T_EmailID: new FormControl(this.case['T_EmailID'], [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ]),
        T_AddressLine1: new FormControl(this.case['T_AddressLine1'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
        T_AddressLine2: new FormControl(this.case['T_AddressLine2'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
        T_City: new FormControl(this.case['T_City'], [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-Z ]*$')
        ]),
        T_State: new FormControl(this.case['T_State'], [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('^[a-z.A-Z ]*$')
        ]),
        T_Pincode: new FormControl(this.case['T_Pincode'], [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$')
        ]),
        T_Landmark: new FormControl(this.case['T_Landmark'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
        T_VerificationNotes: new FormControl(this.case['T_VerificationNotes'], [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250),
        ]),

        CreatedBy: new FormControl(this.case['CreatedBy']),
        LastModifiedBy: new FormControl(this.case['LastModifiedBy']),
        insAddress: new FormControl(this.case['insAddress']),
        insDetails: new FormControl(this.case['insDetails']),
        tpartyDetails: new FormControl(this.case['tpartyDetails']),
        AddressLine1: new FormControl(this.case['AddressLine1']),
        AddressLine2: new FormControl(this.case['AddressLine2']),
        City: new FormControl(this.case['City']),
        State: new FormControl(this.case['State']),
        Landmark: new FormControl(this.case['Landmark']),
        Pincode: new FormControl(this.case['Pincode']),
        // I_CaseID: new FormControl(this.case['I_CaseID']),
        I_AddressID: new FormControl(this.case['I_AddressID']),
        T_AddressID: new FormControl(this.case['T_AddressID']),


      });

      this.AnswerForm = new FormGroup ({

      })

      this.caseidForFileName = this.case.CaseID + '-InsAudio';

      this.IcaseidForFileName = this.case.CaseID + '-Tparty';
      // console.log(this.caseidForFileName + ' its me');

    });




    // -------------------case details update end-----------------------------

  }

  ngAfterViewInit() {

  }

  // use ngOnDestroy to detach event handlers and remove the player

  ngOnDestroy(): void {

  }



  // update case details
  get f() {
    return this.EditForm.controls;
  }

  ngOnInit(): void {

    this.authService.getName().subscribe((data) => {
       console.log(data);

       this.agents = data;
       this.Agname = this.EditForm.controls['Name'].value
     });

    // to get Questions
    // Ins question
    var selectedid = 1;
    this.caseservice.getquestions(selectedid).subscribe(
      (questionsdata: questions) => {
        this.ins_questionsarray = questionsdata;

        debugger
        // this.ins_questionsarray.forEach(element => {
        //   this.RegisterForm.addControl(element.questionname, new FormControl())
        // });
        //console.log(this.t_questionsarray);

        // t party questions
        var selectedid2 = 2;
        this.caseservice.getquestions(selectedid2).subscribe(
          (t_questionsdata: questions) => {
            debugger
            this.t_questionsarray = t_questionsdata;
           // console.log(this.t_questionsarray)

            // this.t_questionsarray.forEach(element => {
            //   this.RegisterForm.addControl(element.questionname, new FormControl())

            // });


            // console.log(this.t_questionsarray);
            // var optionlist;
            // // question options
            // this.CasedetailsService.getquestionoptions(selectedid).subscribe(
            //   (questionoptionslist: questionoptions) => {
            //      optionlist = questionoptionslist;
            //      console.log(questionoptionslist);
            //   }
            // );
            // debugger
            // this.questionoptionsarray = optionlist;
            // this.t_questionsarray.forEach(element => {
            //   debugger
            //   element.questionoptions = this.questionoptionsarray.filter(p => p.questionid === element.questionid)

            // });
          }
        );

        this.caseservice.getanswers(this.case.CaseID).subscribe(
          (answersdata : answers) => {
            debugger
            this.answerdataarray = answersdata;
            console.log(this.answerdataarray)

           this.answerdataarray.forEach(element => {
              debugger
              // if(element.Required === true){
              //   this.EditForm.addControl( element.questionname,
              //     new FormControl(element.answerintext || '',Validators.required) )
              // }else{
              //   this.EditForm.addControl( element.questionname,
              //     new FormControl(element.answerintext || '') )
              // }

              this.EditForm.addControl( element.questionname,
                new FormControl(element.answerintext || '',Validators.required) )

            });

          }
        )
      }
    );

    // $('#opacity-slider').on("change mousemove", function() {
    //   $('#slider-value').html($(this).val());
    //   $('.wrapper img').css({
    //     'opacity': $(this).val()
    //   });
    // });



    // this.agentname()

  }



  update() {
    this.submitted = true;
    if (this.EditForm.invalid) {
      return;
    } else {
      debugger;
      var Ifilename = 'InsV'
      var Tfilename = 'TpartyV'
      let sendvdata = this.vdata;
      let sendIvdata = this.Ivdata;

      let insansdata = [];
      let tpartydata = [];
      let editformdata = this.EditForm.value;


     var editformcontrols = this.EditForm.controls

     this.answerdataarray.forEach(element => {
       insansdata.push({
         answerintext: this.EditForm.get(element.questionname).value,
         answerid: element.answerid
       })
     })

     this.answerdataarray.forEach(element => {
       Object.keys(editformcontrols).forEach(item => {
         if (element.questionname == item){
           console.log(item)
            // insansdata.push(item)
         }
       })
     })


      editformdata["iansarray"] = insansdata;
      editformdata["tpansarray"] = tpartydata;


      this.caseservice
        .update(this.route.queryParams, editformdata)
        .subscribe((result) => {
          this.errmsg = result
        //  console.log('Case Details updated!');
          if(this.errmsg == 'CaseID'){
            const submitToast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            submitToast.fire({
              icon: 'error',
              title: 'Case ID Exits !'
            })
            return this.EditForm.controls['CaseID'].setErrors({status : 'INVALID'})
          }
          else{
            swal({
              icon: 'success',
              title: 'Case Details Updated Succesfully!!',
              buttons: [false],
              timer: 1500,
            });

            // ---------------------Video Upload------------------------------------
            // debugger;
            this.router.navigate(['/products/digital/digital-product-list']);
          }

        });
    }

   // console.log(this.AnswerForm.controls)
  }

  // agentname (){
  //   this.Agname = this.EditForm.controls['Name'].value
  //   //this.putagname = this.EditForm.patchValue({Name : this.Agname})
  //       console.log(this.Agname)
  // }

  // casedetailsupdate(){
  //   this.submitted = true;

  //   if (this.EditForm.invalid){
  //     return;
  //   }
  //   else{

  //      debugger;
  //   this.caseservice.update(this.route.queryParams,this.EditForm.value)
  //   .subscribe((result)=>{
  //     console.log("Case Details updated!");

  //     // this.toastrService.success('Case Details Updated');
  //     // window.alert("success")
  //     // swal("Hello world!");
  //     // swal({
  //     //   icon: "success",
  //     //   buttons: [false],
  //     // });

  //     // swal( {
  //     //   icon:"success",
  //     //   title:"Case Details Updated Succesfully!!",
  //     //   buttons: [false],
  //     //   timer: 1500,
  //     // });
  //     // // debugger;
  //     // this.router.navigate(['/products/digital/digital-product-list']);

  //   });
  //   }

  // }
}

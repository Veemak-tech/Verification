import { questions } from './../models/questions';
import { map } from 'rxjs/internal/operators';

import { environment } from './../../environments/environment';
import { casedetails } from './../models/casedetails';
import { tap } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';
import { DigitalListComponent } from '../components/products/digital/digital-list/digital-list.component'
import { User } from './../models/User';
import { catchError, first } from 'rxjs/operators';
import {Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable, EventEmitter  } from '@angular/core';
import * as _ from 'lodash';
import { assignments } from '../models/assignments';
import { Subscription } from 'rxjs/internal/Subscription';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CasedetailsService {
  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router:Router
  ) {}

  // side menu closing start-------------------
  onFirstComponentButtonClick() {
    debugger
    this.invokeFirstComponentFunction.emit();
  }
  // side menu closing end --------------------

  getDropDownText(id, object){
    const selObj = _.filter(object, function (o) {
        return (_.includes(id,o.id));
    });
    return selObj;
  }

  getidforquestions(id, object){
    const selObj = _.filter(object, function (o) {
        return (_.includes(id,o.id));
    });
    return selObj;
  }




// file upload in case creation start--------------
  upload(file: File): Observable<HttpEvent<any>> {

    debugger
    const formData: FormData = new FormData();


    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.rooturl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  // upload video---------------------

  uploadvideo(file: File,filename): Observable<HttpEvent<any>> {

    debugger
    const formData: FormData = new FormData();


    formData.append('file', file,filename);

    const req = new HttpRequest('POST', `${environment.rooturl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  uploadAudio(file: File,caseidForFileName): Observable<HttpEvent<any>> {

    debugger
    const formData: FormData = new FormData();

    formData.append('file',file,caseidForFileName);

    const req = new HttpRequest('POST', `${environment.rooturl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.rooturl}/files`);
  }

  // end file upload



  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // public url = 'http://localhost:3000/casedetails';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };



  // Create case start-------------------------------------------
  createPost(RegisterForm): Observable<casedetails> {

    debugger
     let userid = localStorage.getItem("id");
      var insanswers = [];

    return this.http.post<casedetails>(

        `${environment.rooturl}${environment.apiUrlpostcase}`,
        {
          CaseID: RegisterForm.CaseID,
          name: RegisterForm.name,
          Description: RegisterForm.Description,
          InsurerVerificationNotes: RegisterForm.InsurerVerificationNotes,
          T_VerificationNotes: RegisterForm.T_VerificationNotes,
          ReferenceNumber: RegisterForm.ReferenceNumber,
          DueDate: RegisterForm.DueDate,
          CreatedBy: RegisterForm.CreatedBy,
          LastModifiedBy: userid,

          insAddress: {
            AddressLine1: RegisterForm.AddressLine1,
            AddressLine2: RegisterForm.AddressLine2,
            City: RegisterForm.City,
            Landmark: RegisterForm.Landmark,
            State: RegisterForm.State,
            Pincode: RegisterForm.Pincode,
          },

          insDetails:{
            CaseID: RegisterForm.CaseID,
            InsurerName: RegisterForm.InsurerName,
            PhoneNumber: RegisterForm.PhoneNumber,
            AlternativePhoneNumber: RegisterForm.IAddInfo,
            EmailID: RegisterForm.EmailID,
            AddressID: RegisterForm.AddressID
          },

          tpartyAddress: {
            AddressLine1: RegisterForm.T_AddressLine1,
            AddressLine2: RegisterForm.T_AddressLine2,
            City: RegisterForm.T_City,
            Landmark: RegisterForm.T_Landmark,
            State: RegisterForm.T_State,
            Pincode: RegisterForm.T_Pincode,
          },

          tpartyDetails: {
            CaseID: RegisterForm.CaseID,
            ThirdpartyName: RegisterForm.ThirdpartyName,
            T_PhoneNumber: RegisterForm.T_PhoneNumber,
            T_AlternativePhoneNumber: RegisterForm.TAddInfo,
            T_EmailID: RegisterForm.T_EmailID,
            T_AddressID: RegisterForm.T_AddressID,
            T_PhotoDocID: RegisterForm.T_PhotoDocID,
            T_AudioDocID: RegisterForm.T_AudioDocID,
            T_VideoDocID: RegisterForm.T_VideoDocID,
            T_PhotoWithSelfieDocID: RegisterForm.T_PhotoWithSelfieDocID,
            T_VerificationNotes: RegisterForm.T_VerificationNotes,
          },

          insanswers : RegisterForm.i_answerarray,
          tpanswers : RegisterForm.t_answerarray


        }, this.httpOptions).pipe(first(),
        catchError(this.errorHandlerService.handleError<casedetails>('create Address')));
  }
  // create csae end---------------------------------


  getData(){
    // let url = "http://localhost:3000/casedetails";
    return this.http.get(`${environment.rooturl}${environment.apiUrl}`)

  }

  // number of cases---------------
  numberofcases(){
    return this.http.get(`${environment.rooturl}${environment.numberofcases}`)
  }


  // get questions------------------
  getquestions(selectedid:any){
    debugger;
    return this.http.get(`${environment.rooturl}${environment.apigetquestion}/${selectedid}`)
  }

    // get question options------------------
  getquestionoptions(selectedid:any){
    debugger;
    return this.http.get(`${environment.rooturl}${environment.apigetquestionoptions}/${selectedid}`)
  }

    // get answers-----------------------
  getanswers(caseid: any){
    return this.http.get(`${environment.rooturl}${environment.apigetanswers}/${caseid}`);
  }

  getpaging(pageno:number){
    debugger;
    return this.http.get(`${environment.rooturl}${environment.apiUrlpostcase}/${pageno}/${10}`)
  }

  getByID(ID:number){
   // let url = "http://localhost:3000/casedetails/"+CaseID;
    return this.http.get(`${environment.rooturl}${environment.apicasegetbyid}/${ID}`);
  }
  // delete

  deletecasedetails(id: number): Observable<DigitalListComponent> {
    const url = `${environment.rooturl}${environment.apiUrlpostcase}/${id}`;
    return this.http.delete<DigitalListComponent>(url, this.httpOptions);
  }

  // update case ----------------------------------------------------------
  update(CaseID:Observable<Params>,data:any){
    debugger;
    return this.http.put<casedetails>(`${environment.rooturl}${environment.apiUrlpostcase}`,{
      CaseID: data.CaseID,
      Name: data.Name,
      Description: data.Description,
      InsurerVerificationNotes: data.InsurerVerificationNotes,
      T_VerificationNotes: data.T_VerificationNotes,
      ReferenceNumber: data.ReferenceNumber,
      DueDate: data.DueDate,
      LastModifiedBy: data.LastModifiedBy,

      insDetails:{
        ID:data.ID,
        InsurerName: data.InsurerName,
        PhoneNumber: data.PhoneNumber,
        EmailID: data.EmailID,
        I_AddressID: data.I_AddressID,
        AlternativePhoneNumber: data.AlternativePhoneNumber
        //I_CaseID:data.I_CaseID
      },

      insAddress: {
        I_AddressID:data.I_AddressID,
        I_AddressLine1:data.I_AddressLine1,
        I_AddressLine2:data.I_AddressLine2,
        I_City:data.I_City,
        I_State:data.I_State,
        I_Pincode:data.I_Pincode,
        I_Landmark:data.I_Landmark
      },

      tpartyDetails: {
        ID: data.ID,
        ThirdpartyName: data.ThirdpartyName,
        T_PhoneNumber: data.T_PhoneNumber,
        T_EmailID: data.T_EmailID,
        T_VerificationNotes: data.T_VerificationNotes,
        T_AlternativePhoneNumber:data.T_AlternativePhoneNumber
      },

      tpartyAddress: {
        ID:data.ID,
        T_AddressID:data.T_AddressID,
        T_AddressLine1:data.T_AddressLine1,
        T_AddressLine2:data.T_AddressLine2,
        T_City:data.T_City,
        T_State:data.T_State,
        T_Pincode:data.T_Pincode,
        T_Landmark:data.T_Landmark
      },

      insanswers : data.iansarray,
      tpanswers  : data.tpansarray
    },


    this.httpOptions).pipe(first(),
        catchError(this.errorHandlerService.handleError<casedetails>('update Address')));
  }




//case assign
  caseassign(selectedRowID,rowagentname,selectedValue,selectedagent,caseidlist,selectedRowsAID,selectedRows:Pick<assignments, 'CaseID'>): Observable<assignments> {
debugger
    return this.http
      .post<assignments>(
        `${environment.rooturl}${environment.apiassign}`,
        {
          CaseID: caseidlist,
          AppUserID:selectedValue,
          AssignmentID:selectedRowsAID,
          Agentname: selectedagent,
          SelectedRowagentname:rowagentname,
          selectedcaseRowID:selectedRowID
        }
      )}



  // To catch error
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

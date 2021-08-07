import { HttpClient } from '@angular/common/http';
import { FormData } from './../../../../shared/interface/form-data';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { questions } from './../../../../models/questions';
import { casedetails } from './../../../../models/casedetails';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { CasedetailsService } from './../../../../services/casedetails.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {

  dynamicformarray : any;
  dynamicformarray2 :any;
  dynamicformarray3: any;

  constructor( private httpClient : HttpClient, private user: CasedetailsService
    ,private toastr: ToastrService){

  }
  ngOnInit(){
    var selectedid1 = 1;

    this.user.getquestions(selectedid1).subscribe((data: questions) => {
      this.dynamicformarray = data;
      console.log(this.dynamicformarray);
    })

    var selectedid2 = 2;
    this.user.getquestions(selectedid2).subscribe((data: questions) => {
      this.dynamicformarray2 = data;
      console.log(this.dynamicformarray2);
    })

    var selectedid3 = 3;
    this.user.getquestions(selectedid3).subscribe((data: questions) => {
      this.dynamicformarray3 = data;
      console.log(this.dynamicformarray3);
    })

  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }





}






// this.httpClient.get('/assets/json/dynamicform.json').subscribe(data => {
//   this.dynamicformarray = data;
//   console.log(this.dynamicformarray);
// })

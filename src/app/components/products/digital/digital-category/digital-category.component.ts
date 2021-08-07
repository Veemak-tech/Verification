import { questions } from './../../../../models/questions';
import { questionoptions } from './../../../../models/questionoptions';
import { Router, Data } from '@angular/router';
import { CasedetailsService } from './../../../../services/casedetails.service';
import {
  FormControl,
  FormGroup,
  Validators,
  NgForm,
  FormsModule,
  FormBuilder,
  FormArray,
  ValidatorFn
} from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  ElementRef,
} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2'


const URL = './src/assets/images';

@Component({
  selector: 'app-digital-category',
  templateUrl: './digital-category.component.html',
  styleUrls: ['./digital-category.component.scss'],
})
export class DigitalCategoryComponent implements OnInit {
  RegisterForm: FormGroup;
  questionform : FormGroup;
  form: FormGroup;
  submitted = false;
  @Input() agents : any;
  @Output() create: EventEmitter<any> = new EventEmitter();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ins_questionsarray: any;
  t_questionsarray: any;
  questionoptionsarray: questionoptions[];
  insanswer : any;
  insanswerdata: any;

  selectedFiles: FileList;
  filename: string;
  filesize: any;
  filesizeinkb: any;
  filetype: any;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  repos: any;

  closeResult: string;
  errorMessage: any;
  loading: boolean;

  constructor(
    private CasedetailsService: CasedetailsService,
    private modalService: NgbModal,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // Agents name
    this.authService.getName().subscribe((data) => {
     // console.log(data);
      console.log('Agent name Fetch Working!!');
      this.agents = data;
    });
  }



  get f() {
    return this.RegisterForm.controls;

  }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      CaseID: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.pattern('^[a-z.A-Z 0-9]*$'),
        ],
      ],
      name: ['', Validators.required],
      ReferenceNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.pattern('^[a-z.A-Z 0-9]*$'),
        ],
      ],
      DueDate: ['', Validators.required],
      Description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(256),
        ],
      ],
      InsurerName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-Z ]*$'),
        ],
      ],
      PhoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
          Validators.pattern('^[- ,()+0-9]*$'),
        ],
      ],
      EmailID: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      ],
      IAddInfo: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256)
        ],
      ],
      AddressLine1: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      AddressLine2: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      City: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-Z ]*$'),
        ],
      ],
      State: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-Z ]*$'),
        ],
      ],
      Pincode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      Landmark: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      InsurerVerificationNotes: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250),
        ],
      ],
      ThirdpartyName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern('^[a-z.A-Z ]*$'),
        ],
      ],
      T_PhoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
          Validators.pattern('^[- ,+()0-9]*$'),
        ],
      ],
      T_EmailID: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      ],
      TAddInfo: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256)
        ],
      ],
      T_AddressLine1: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      T_AddressLine2: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      T_City: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-Z ]*$'),
        ],
      ],
      T_State: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('^[a-z.A-Z ]*$'),
        ],
      ],
      T_Pincode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      T_Landmark: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      T_VerificationNotes: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250),
        ],
      ],
      FileUpload: ['', Validators.required],

      // FileUpload: ['', [RxwebValidators.required,RxwebValidators.fileSize({maxSize: 1})]],
      // questionname: ['', [Validators.required]]
    });


    // to get Questions
    // Ins question
    var selectedid = 1;

    this.CasedetailsService.getquestions(selectedid).subscribe(
      (questionsdata: questions) => {
        this.ins_questionsarray = questionsdata;

        debugger
        this.ins_questionsarray.forEach(element => {
          // if (element.Required === true){
          //   this.RegisterForm.addControl(element.questionname, new FormControl('', Validators.required ))
          // }else{
          //   this.RegisterForm.addControl(element.questionname, new FormControl(''))
          // }

          this.RegisterForm.addControl(element.questionname, new FormControl( ))
        });
        //console.log(this.t_questionsarray);

        // t party questions
        var selectedid2 = 2;
        this.CasedetailsService.getquestions(selectedid2).subscribe(
          (t_questionsdata: questions) => {
            debugger
            this.t_questionsarray = t_questionsdata;

            this.t_questionsarray.forEach(element => {
              this.RegisterForm.addControl(element.questionname, new FormControl())
             // this.RegisterForm.controls[element.questionname].setValidators(Validators.required)
            });


            // console.log(this.t_questionsarray);
            var optionlist;
            // question options
            this.CasedetailsService.getquestionoptions(selectedid).subscribe(
              (questionoptionslist: questionoptions) => {
                 optionlist = questionoptionslist;
                 console.log(questionoptionslist);
              }
            );
            debugger
            this.questionoptionsarray = optionlist;
            // this.t_questionsarray.forEach(element => {
            //   debugger
            //   element.questionoptions = this.questionoptionsarray.filter(p => p.questionid === element.questionid)

            // });
          }
        );
      }
    );


  }





  selectFile(event : any): void {
    debugger
    this.selectedFiles = event.target.files;

    this.filesizeinkb = event.target.files[0].size;

    this.filetype = event.target.files[0].name;

    this.currentFile = this.selectedFiles.item(0);


    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    console.log(this.filetype)

    if (this.filesizeinkb > 4307840)
    {
      // alert("Select file below 4 MB");
      this.RegisterForm.controls['FileUpload'].setErrors({status:'INVALID'})
      this.filename = null
      this.filesize = null

      const rowToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      rowToast.fire({
        icon: 'warning',
        title: 'File Size is Large'
      })

      return this.currentFile = null && this.selectedFiles == null && event == null

    }
    else if (!allowedExtensions.exec(this.filetype)){
      // alert ("image only");
      this.RegisterForm.controls['FileUpload'].setErrors({status:'INVALID'})
      this.filename = null
      this.filesize = null

      const rowToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      rowToast.fire({
        icon: 'warning',
        title: 'Image only Allowed'
      })

      return this.currentFile = null && this.selectedFiles == null && event == null
    }
    else{
      this.filename = event.target.files[0].name;
      this.filesize = this.filesizeinkb / 1024;
    }



    console.log(this.filename);
    console.log(this.selectedFiles);
  }

  // upload(): void {
  //   debugger;
  //   this.progress = 0;
  //   var filename = ''

  //   this.currentFile = this.selectedFiles.item(0);
  //   // this.CasedetailsService.upload(this.currentFile,filename).subscribe(
  //   //   (event) => {
  //   //     if (event.type === HttpEventType.UploadProgress) {
  //   //       this.progress = Math.round((100 * event.loaded) / event.total);
  //   //     } else if (event instanceof HttpResponse) {
  //   //       this.message = event.body.message;
  //   //       this.fileInfos = this.CasedetailsService.getFiles();
  //   //     }
  //   //   },
  //   //   (err) => {
  //   //     this.progress = 0;
  //   //     this.message = 'Could not upload the file!';
  //   //     this.currentFile = undefined;
  //   //   }
  //   // );

  //   this.selectedFiles = undefined;
  // }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.RegisterForm.invalid) {
      return;
    } else {
      debugger
      var filename = ''
      var t_answerarray = []
      var i_answerarray = []
      var Regformdata = this.RegisterForm.value;


      this.t_questionsarray.forEach(element => {
        if(this.RegisterForm.get(element.questionname).value == null){
          t_answerarray.push ({
            questiontext: element.questionname,
            questionid : element.questionid,
            answer: ''
          })
        }else{
          t_answerarray.push ({
            questiontext: element.questionname,
            questionid : element.questionid,
            answer: this.RegisterForm.get(element.questionname).value
          })
        }


      });
      this.ins_questionsarray.forEach(element => {
        if(this.RegisterForm.get(element.questionname).value == null)
        {
          i_answerarray.push({
            questiontext: element.questionname,
            questionid : element.questionid,
            answer: ''
          })
        }
        else{
          i_answerarray.push({
            questiontext: element.questionname,
            questionid : element.questionid,
            answer: this.RegisterForm.get(element.questionname).value
          })
        }

      });


      Regformdata["i_answerarray"] = i_answerarray;
      Regformdata["t_answerarray"] = t_answerarray;

      this.insanswer = Regformdata.i_answerarray;
      this.insanswerdata = []

      for(let i=0; i< this.insanswer.length; i++){
        if(this.insanswer[i].questionid > 0){
          this.insanswerdata.push(this.insanswer[i].questionid)
        }
      }

      console.log(i_answerarray);

      this.CasedetailsService.createPost(Regformdata).subscribe((msg) => {

        this.repos = msg
        if(this.repos == 'CaseID'){
          // sweet alert
        const rowToast = Swal.mixin({
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

        rowToast.fire({
          icon: 'warning',
          title: 'Case ID Exist'
        })

        return this.RegisterForm.controls['CaseID'].setErrors({status: 'INVALID'})


        }
        else{
          this.CasedetailsService.upload(this.currentFile).subscribe(
            (event) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.fileInfos = this.CasedetailsService.getFiles();
              }
            },
            (err) => {
              this.progress = 0;
              this.message = 'Could not upload the file!';
              this.currentFile = undefined;
            }
          );

          const submitToast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          submitToast.fire({
            icon: 'success',
            title: 'Created Successfully'
          })

           this.router.navigate(['/products/digital/digital-product-list']);
        }

      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.errorMessage = error;
        this.loading = false;

        throw error;
      });

      // this.currentFile = this.selectedFiles.item(0);


      // swal({
      //   icon: 'success',
      //   title: 'Created Successfully',
      //   buttons: [false],
      //   timer: 1500,
      // });

    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.RegisterForm.value, null, 4));
  }

  // -----------------------------------------pre default codes...(dont change below )-----------------------------------------------------

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public settings = {
    actions: {
      position: 'right',
    },
    columns: {
      img: {
        title: 'Image',
        type: 'html',
      },
      product_name: {
        title: 'Name',
      },
      price: {
        title: 'Price',
      },
      status: {
        title: 'Status',
        type: 'html',
      },
      category: {
        title: 'Category',
      },
    },
  };
}



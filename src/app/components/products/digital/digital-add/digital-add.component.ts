import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AuthService } from 'src/app/services/auth.service';
import { casedetails } from './../../../../models/casedetails';
import { HttpClient } from '@angular/common/http';
import { CasedetailsService } from './../../../../services/casedetails.service';
import { JwPaginationModule } from 'jw-angular-pagination';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-digital-add',
  templateUrl: './digital-add.component.html',
  styleUrls: ['./digital-add.component.scss'],
})
export class DigitalAddComponent implements OnInit {
  editProfileForm: FormGroup;

  @Output() setGrid: EventEmitter<any> = new EventEmitter<any>();
  @Output() setLayout: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortedBy: EventEmitter<any> = new EventEmitter<any>();
  @Input() name;
  // @Input() public pagesize = [];

  @Input() layoutView: string = 'grid-view';
  @Input() sortBy: string;
  @Input() products: casedetails[] = [];

  pagesize = [];
  pageno: any = {};
  data: [];
  public caseList: any;
  selecteditems: string[];
  selecteditems2: string[];
  paginateData: any[] = [];

  page=1;
  pageSize=10;
  collectionSize = 0;
  premiumData : any[] = [];

  public paginate: any;
  viewRecord: any;
  editRecord: any;

  closeResult = '';
  editForm: FormGroup;

  constructor(
    private user: CasedetailsService,
    private httpClient: HttpClient,
    private userName: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router
  ) {
    // debugger
    // for get agent name
    this.userName.getName().subscribe((data) => {
      console.log(data);
      console.log('user is working');
      this.name = data;
    });
  }

  // reload page

  // reload page

  reloadComponent() {


    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
    }

  ngOnInit() {
    this.route.queryParams.subscribe((result) =>
      this.loadPage(result.page || 1)
    );

    this.editProfileForm = this.fb.group({
      CaseID: [''],
      ID: [''],
      Name: [''],
      Description: [''],
      ReferenceNumber: [''],
      DueDate: [''],
    });

    this.selecteditems = new Array<string>();
    this.selecteditems2 = new Array<string>();



  }
  selectID(e: any) {
    console.log(e[e.selectedIndex].id);
  }

  CheckID(e: any, id: string) {
    debugger
    if (e.target.checked) {
      console.log(id + 'checked');
      this.selecteditems.push(id);
    } else {
      console.log(id + 'unchecked');
      this.selecteditems = this.selecteditems.filter((m) => m != id);
    }
    console.log(this.selecteditems);
  }

  submit() {}

  ////

  openModal(targetModal, item) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    this.editProfileForm.patchValue({
      CaseID: item.CaseID,
      ID: item.ID,
      Name: item.Name,
      Description: item.Description,
      ReferenceNumber: item.ReferenceNumber,
      DueDate: item.DueDate,
    });
  }

  public onCustomAction(event, item, action) {
    debugger;
    switch (action) {
      case 'viewrecord':
        let rowdata2 = item;
        let navigationExtras2: NavigationExtras = {
          queryParams: {
            ID: rowdata2.ID,
          },
        };
        this.router.navigate(
          ['/products/digital/case-edit'],
          navigationExtras2
        );
        this.sendValues.emit(rowdata2.ID);
        break;
      case 'edit':
        let rowdata = item;
        let navigationExtras: NavigationExtras = {
          queryParams: {
            ID: rowdata.ID,
          },
        };
        debugger;
        this.router.navigate(['/products/digital/case-view'], navigationExtras);
        this.sendValues.emit(rowdata.ID);
        break;
      default:
        break;
    }
  }
  @Output() sendValues = new EventEmitter<any>();

  public loadPage(page) {
    debugger;
   // get page of items from api
   this.httpClient
     .get<any>(`${environment.rooturl}${environment.apiUrlpostcase}/${page}/${10}`)
     .subscribe((result) => {
       this.pageno = result.pager;
       this.pagesize = result.pageOfItems;
       this.collectionSize = this.pagesize.length;
       // debugger;
       console.log(result.pagining);
       this.paginateData = this.pagesize
       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
     });
 }

  getPremiumData(){
    debugger
    this.paginateData =  this.pagesize
     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);



   }

  setGridLayout(value: string) {
    this.setGrid.emit(value); // Set Grid Size
  }

  setLayoutView(value: string) {
    this.layoutView = value;
    this.setLayout.emit(value); // Set layout view
  }

  sorting(event) {
    this.sortedBy.emit(event.target.value);
  }

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  public onUploadInit(args: any): void {}

  public onUploadError(args: any): void {}

  public onUploadSuccess(args: any): void {}
}

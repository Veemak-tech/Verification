import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { userListDB } from 'src/app/shared/tables/list-users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  userlist: any;

  constructor(
    private user: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.user.getData().subscribe((data) => {
      console.log(data);
      this.userlist = data;
    });
  }

  // custom action
  public onCustomAction(event) {
     debugger;
    switch (event.action) {
      case 'viewrecord':
        this.viewRecord(event.data);
        break;
      case 'editrecord':
        this.editRecord(event.data);
    }
  }

  public editRecord(formData: any) {
    let rowdata = formData;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: rowdata.id,
      },
    };
    debugger;

    this.router.navigate(['/users/user-edit'], navigationExtras);
    this.sendValues.emit(rowdata.id);
  }

  public viewRecord(formData: any) {
    let rowdata = formData;
  }

  @Output() sendValues = new EventEmitter<any>();

  handleRowSelect(event) {
    let rowdata = event.data;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: rowdata.id,
      },
    };
    debugger;
    this.router.navigate(['/users/user-edit'], navigationExtras);
    this.sendValues.emit(rowdata.id);
  }

  public settings = {
    actions: {
      columnTitle: 'Action',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'editrecord',
          title:
            '<i class="ng2-smart-action ng2-smart-action-edit-edit ng-star-inserted"></i>&nbsp;&nbsp;',
        },
        {
          name: 'viewrecord',
          title:
            '<i></i>',
        },
      ],
      position: 'left',
    },
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Name',
      },
      email: {
        title: 'Email',
      },
      date: {
        title: 'date',
      },
      Name: {
        title: 'Role Name',
      },
    },
  };

  ngOnInit() {}
}

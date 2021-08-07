import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  NgForm,
} from '@angular/forms';
import { userListDB } from 'src/app/shared/tables/list-users';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import swal from 'sweetalert';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  userdetail: User;
  EditForm: FormGroup;
  passwordupdate: FormGroup;

  constructor(
    private user: AuthService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // const id:number = Number( this.route.snapshot.paramMap.get('id'));
    var id: number;

    debugger;
    this.route.queryParams.subscribe((params) => {
      id = params['id'];
    });

    this.user.getDatabyID(id).subscribe((data: User) => {
      debugger;
      console.log(data);
      this.userdetail = data[0];
      this.EditForm = new FormGroup({
        id: new FormControl(this.userdetail['id']),
        name: new FormControl(this.userdetail['name'], [
          Validators.required,
          Validators.minLength(5),
        ]),
        email: new FormControl(this.userdetail['email'], [
          Validators.email,
          Validators.required,
        ]),
        //
        RoleID: new FormControl(this.userdetail['RoleID']),
      });

      this.userdetail = data[0];
      this.passwordupdate = new FormGroup({
        id: new FormControl(this.userdetail['id']),
        password: new FormControl(this.userdetail[''], [
          Validators.required,
          Validators.minLength(7),
        ]),
      });
    });
  }

  ngOnInit() {}
  update() {
    if (this.EditForm.invalid) {
      return;
    } else {
      this.user
        .update(this.route.queryParams, this.EditForm.value)
        .subscribe((result) => {
          console.log(result);
          swal({
            icon: 'success',
            title: 'User Details Updated Succesfully!!',
            buttons: [false],
            timer: 1500,
          });
          console.log('its working2662');
          // debugger;
          this.router.navigate(['/users/list-user']);
        });
    }
  }

  updatepassword() {
    this.user
      .updatepassword(this.route.queryParams, this.passwordupdate.value)
      .subscribe((result) => {
        console.log(result);
        swal({
          icon: 'success',
          title: 'Password Updated Succesfully!!',
          buttons: [false],
          timer: 1500,
        });
        this.router.navigate(['/users/list-user']);
      });
  }
}

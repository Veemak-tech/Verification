import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {AuthService } from "src/app/services/auth.service";
import swal from 'sweetalert';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  RegisterForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.RegisterForm= this.createFormGroup();
  }
  get f() {
    return this.RegisterForm.controls;
  }


  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(30)]),
      email: new FormControl("", [Validators.required, Validators.email,Validators.maxLength(30), Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
      ),]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30)]),
        RoleID: new FormControl("", [Validators.required]),
    });
  }

  signup(): void {
    debugger
    if(this.RegisterForm.invalid){
      const rowToast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })

      rowToast.fire({
        icon: 'warning',
        title: 'No Data'
      })
      return
    }
    this.authService.signup(this.RegisterForm.value).subscribe((msg) => {
      console.log(msg);
      swal( {
        icon:"success",
        title:"User Created Succesfully!!",
        buttons: [false],
        timer: 1500,
      });
      console.log("user registerd");
      this.router.navigate(['/users/list-user']);

    });
  }
}

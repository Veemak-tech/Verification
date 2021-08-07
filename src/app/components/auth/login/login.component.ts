import { Subscriber } from 'rxjs';
import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  caseList: any;

  constructor(private authService: AuthService) {
//debugger;

// this.authService.passname().subscribe((loggedName) => {
//   console.warn(loggedName);
//   this.caseList = loggedName;
// });
  }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();


  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }


  login(): void {
 debugger;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe();
  }



}


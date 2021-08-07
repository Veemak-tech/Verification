import { Injectable } from "@angular/core";
import { NgModule } from '@angular/core';
import { Observable, of } from "rxjs";
import swal from 'sweetalert';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService {
  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      // window.alert("Incorrect Username or Password!!")
      swal( {
        icon:"error",
        title:"Incorrect Username or Password !!",
        buttons: [false],
        timer: 2500,
      });
      return of(result as T);

    };

  }



}


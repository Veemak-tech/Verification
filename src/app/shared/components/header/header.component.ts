import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../service/nav.service';
import { Router } from "@angular/router";
import { CasedetailsService } from './../../../services/casedetails.service';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;
  public userName : string = "";
  isAuthenticated = false;


  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService,
    private authService: AuthService,
    private router: Router,
    public caseservice : CasedetailsService
    ) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }




  ngOnInit():void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    this.userName = localStorage.getItem("userName").toString()

    if (this.caseservice.subsVar==undefined) {
      debugger
     this.caseservice.subsVar = this.caseservice.
     invokeFirstComponentFunction.subscribe((name:string) => {
       this.collapseSidebar();
     });
   }

   });
  }
  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
  }


}

import { Output } from '@angular/core';
import { Component, OnInit,EventEmitter } from '@angular/core';
import { NavService, Menu } from '../../shared/service/nav.service';
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss'],


})
export class Test1Component implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;
  isAuthenticated = false;
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService,
    private authService: AuthService, 
    private router: Router
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
    
   
   });
  }
  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
  }
}



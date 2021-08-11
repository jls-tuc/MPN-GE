import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
// import PerfectScrollbar from 'perfect-scrollbar';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription, Observable } from "rxjs";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { UserModel } from "app/shared/models/user.model";

@Component({
  selector: "app-sidebar-top",
  templateUrl: "./sidebar-top.component.html",
})
export class SidebarTopComponent implements OnInit, OnDestroy, AfterViewInit {
  // private sidebarPS: PerfectScrollbar;
  userData$: Observable<UserModel>;
  usuarioLog: any;

  public menuItems: any[];
  private menuItemsSub: Subscription;

  constructor(
    private navService: NavigationService,
    public jwtAuth: JwtAuthService
  ) {}

  ngOnInit() {
    this.userData$ = this.jwtAuth.currentUserSubject.asObservable();
    this.usuarioLog = this.userData$;
    this.menuItems = this.usuarioLog.source._value.menu;

    /* this.navService.menuUse$.subscribe((menuItem) => {
      this.menuItems = menuItem.menu.filter(
        (item) => item.type !== "icon" && item.type !== "separator"
      );
    }); */
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.sidebarPS = new PerfectScrollbar('#sidebar-top-scroll-area', {
    //     suppressScrollX: true
    //   })
    // })
  }
  ngOnDestroy() {
    // if(this.sidebarPS) {
    //   this.sidebarPS.destroy();
    // }
    /* if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    } */
  }
}

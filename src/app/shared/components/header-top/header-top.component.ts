import { Component, OnInit, Input, OnDestroy, Renderer2 } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { Observable, Subscription } from "rxjs";
import { ThemeService } from "../../../shared/services/theme.service";
import { TranslateService } from "@ngx-translate/core";
import { LayoutService } from "../../services/layout.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { UserModel } from "app/shared/models/user.model";

@Component({
  selector: "app-header-top",
  templateUrl: "./header-top.component.html",
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  userData$: Observable<UserModel>;
  usurioLog: any;
  datosUsuarios: any;
  fotoUsuario: any;
  layoutConf: any;
  menuItems: any;
  menuItemSub: Subscription;
  egretThemes: any[] = [];
  currentLang = "es";
  availableLangs = [
    {
      name: "Spanish",
      code: "es",
    },
  ];
  @Input() notificPanel;
  constructor(
    private layout: LayoutService,
    public navService: NavigationService,
    public themeService: ThemeService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService
  ) {}

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.egretThemes = this.themeService.egretThemes;
    /* this.menuItemSub = this.navService.menuUse$.subscribe((res) => {
      //  console.log(res.menu);
      res = res.menu.filter(
        (item) => item.type !== "icon" && item.type !== "separator"
      );
      let limit = 5;
      let mainItems: any[] = res.slice(0, limit);
      if (res.length <= limit) {
        return (this.menuItems = mainItems);
      }
      let subItems: any[] = res.slice(limit, res.length - 1);
      mainItems.push({
        name: "More",
        type: "dropDown",
        tooltip: "More",
        icon: "more_horiz",
        sub: subItems,
      });
      this.menuItems = res;
      // console.log(this.menuItems);
    }); */
    this.userData$ = this.jwtAuth.currentUserSubject.asObservable();
    this.usurioLog = this.userData$;
    this.datosUsuarios = this.usurioLog.source._value;
    this.menuItems = this.usurioLog.source._value.menu;
    this.fotoUsuario = sessionStorage.getItem("FOTO");
  }
  ngOnDestroy() {
    //this.menuItemSub.unsubscribe();
  }
  setLang() {
    this.translate.use(this.currentLang);
  }
  changeTheme(theme) {
    this.layout.publishLayoutChange({ matTheme: theme.name });
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === "closed") {
      return this.layout.publishLayoutChange({
        sidebarStyle: "full",
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: "closed",
    });
  }
}

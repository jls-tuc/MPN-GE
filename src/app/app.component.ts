import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from "@angular/router";

import { RoutePartsService } from "./shared/services/route-parts.service";

import { filter } from "rxjs/operators";
import { UILibIconService } from "./shared/services/ui-lib-icon.service";
import { getYear } from "date-fns";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  today = new Date();
  year = this.today.getFullYear();
  appTitle = this.year.toString();
  pageTitle = "";

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private iconService: UILibIconService
  ) {
    iconService.init();
  }

  ngOnInit() {
    this.changePageTitle();
  }

  ngAfterViewInit() {}

  changePageTitle() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        const routeParts = this.routePartsService.generateRouteParts(
          this.activeRoute.snapshot
        );
        if (!routeParts.length) {
          return this.title.setTitle(this.appTitle);
        }
        // Extract title from parts;
        this.pageTitle = routeParts
          .reverse()
          .map((part) => part.title)
          .reduce((partA, partI) => {
            return `${partA} > ${partI}`;
          });
        this.pageTitle += ` | ${this.appTitle}`;
        this.title.setTitle(this.pageTitle);
      });
  }
  ngOnDestroy() {}
}
function getFullYear() {
  throw new Error("Function not implemented.");
}

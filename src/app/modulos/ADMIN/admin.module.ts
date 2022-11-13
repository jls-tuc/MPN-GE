import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TablaUsuariosComponent } from "./componentes/tablaUsuarios/tablaUsuarios.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { AdminRoutes } from "./admin.routing";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { TranslateModule } from "@ngx-translate/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedMaterialModule } from "app/shared/shared-material.module";
import { CrearUsuariosComponent } from "./componentes/crearUsuarios/crearUsuarios.component";
import { SharedModule } from "app/shared/shared.module";
import { DirectivesModuleModule } from "app/directives/DirectivesModule/DirectivesModule.module";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
  imports: [
    DirectivesModuleModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    TranslateModule,
    NgxChartsModule,
    MatDialogModule,
    MatCardModule,
    TranslateModule,
    MatTooltipModule,
    NgxDatatableModule,
    RouterModule.forChild(AdminRoutes),
  ],
  declarations: [TablaUsuariosComponent, CrearUsuariosComponent],
  providers: [],
})
export class ADMINModule {}

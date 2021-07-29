import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReferentesComponent } from "./components/referentes/referentes.component";
import { EleccionesRoutes } from "./elecciones.routing";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(EleccionesRoutes),
  ],
  declarations: [ReferentesComponent],
})
export class EleccionesModule {}

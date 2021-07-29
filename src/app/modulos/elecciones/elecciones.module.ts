import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RefereteComponent } from "./components/referentes/referete.component";
import { Eleccionesroutes } from "./elecciones.routing";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(Eleccionesroutes)],
  declarations: [RefereteComponent],
})
export class EleccionesModule {}

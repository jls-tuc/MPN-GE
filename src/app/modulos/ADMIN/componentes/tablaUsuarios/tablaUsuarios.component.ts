import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppConfirmService } from "app/shared/services/app-confirm/app-confirm.service";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { Subscription } from "rxjs";
import { CrearUsuariosComponent } from "../crearUsuarios/crearUsuarios.component";

@Component({
  selector: "app-tablaUsuarios",
  templateUrl: "./tablaUsuarios.component.html",
  styleUrls: ["./tablaUsuarios.component.scss"],
})
export class TablaUsuariosComponent implements OnInit {
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private confirmService: AppConfirmService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private loader: AppLoaderService
  ) {}

  ngOnInit() {}

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? "Add new member" : "Update member";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      CrearUsuariosComponent,
      {
        width: "1080px",
        disableClose: false,
        data: { title: title, payload: data },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        // If user press cancel
        return;
      }
      this.loader.open();
      /*    if (isNew) {
          this.crudService.addItem(res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        } */
    });
  }
  deleteItem(row) {}
}

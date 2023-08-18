import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { JustificationDialogComponent } from './justification-dialog/justification-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  justificationMsg="";
  constructor(private dialog: MatDialog) { }

openConfirmDialog(msg){
  return this.dialog.open(MatConfirmDialogComponent,{
    width: '390px',
    panelClass:'confirm-dialog-container',
    disableClose: true,
    position: {top: "10px"},
    data :{
      message:msg
    }
  });
}

openJustificationDialog(){
  return this.dialog.open(JustificationDialogComponent,{
    width: '390px',
    panelClass:'confirm-dialog-container',
    disableClose: true,
    position: {top: "10px"},
    
  });
}
}

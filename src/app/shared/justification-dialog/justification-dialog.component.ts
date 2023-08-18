import { Component, OnInit ,Inject, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-justification-dialog',
  templateUrl: './justification-dialog.component.html',
  styleUrls: ['./justification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JustificationDialogComponent implements OnInit {
  justification:string;
  message=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<JustificationDialogComponent> ) { }

  ngOnInit(): void {


  }
  closeDialog(){
    this.message=false;
    this.dialogRef.close(this.justification);
  }


  onSubmit(form:NgForm){
   /*  console.log("test")
   console.log(form); */
   console.log(form.value.justificationInput)
   if((form.value.justificationInput!=null)&&(form.value.justificationInput.trim()!==''))
    {
      this.message=true;

      return this.message;
    }
    else{
      this.message=false;

      return this.message;
    }
/*     console.log(this.justification!=null)

    if(this.justification===''){

      this.message=false;
      console.log("the value in the if is ",this.message);
      return this.message;


    }else{
      this.message=true;
      console.log("the value in the else ",this.message);
      return this.message;
    } */
   /*  if(this.justification.trim()===''){
      this.message=false;
      console.log("the value in the if is ",this.message);

  }else{
    this.message=true;
    console.log("the value in the else ",this.message);
  } */

   /* if(this.justification.trim()!=null){
   /*  console.log("just submit ")
    console.log(this.justification);
    if(this.justification.trim()!=null){
      console.log("the just in the if  ")
      console.log(this.justification);
      this.message=true;
      console.log(this.message)

      console.log("the justification ",this.justification);
      return;
    }
  }*/
}
}

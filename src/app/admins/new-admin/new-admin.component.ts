import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-new-admin',
  templateUrl:
  './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {
  userIdDetails =+this.userService.userDetails.value.id;
  fullNameSearch="";
  displayFullName =false;
  userId:number;
  showError=false;
  checkIfAdmin=false;
  checkValidators=(this.showError&&this.checkIfAdmin);
  legal=false;
  adminForm:FormGroup = new FormGroup({
  userId:new FormControl('',Validators.required),
 });
  constructor( public notificationService:NotificationService,
                public dialogRef: MatDialogRef<NewAdminComponent>,
                public userService:UserService,
                 private dialogService: DialogService,private adminService :AdminService ) {
                 }



  ngOnInit(): void {


  }

  onClear(){//clear the form
    this.adminForm.reset();

  }


  onClose(){
    this.adminForm.reset();
   /*  this.adminTable.initializeFormGroup(); */
    this.dialogRef.close();
  }

  onSubmit(){

    if(this.adminForm.valid){
      this.dialogService.openConfirmDialog('Are you sure you want to make '+ " "+this.fullNameSearch+" "+ 'an admin?'+" " )
      .afterClosed().subscribe(res =>{
        if(res){ //Checks if res is true which means we want to add the item
   /*        this.userService.userDetails.next(); */
            this.adminService.insertNewAdmin(this.userId).subscribe(val=>{
              if(val){
                this.notificationService.success('!'+" "+this.fullNameSearch+' was successfully added');
                this.userService.dataAdded.next();
              }
            })
          this.onClose();

        }
        else {
          this.onClose();
        }
      });

    }

}


onSearchByUserId(){
  /* this.checkValidators=false; */

  this.showError=false;
  this.displayFullName = false;
  this.userService.checkIsAdmin(this.userId.toString()).subscribe(
    res=>{
      //if res is true it means that the user id is already admin
      if(res==true){
        this.checkIfAdmin=true;

      }
      else{
        this.userService.checkUserByUserId(this.userId).subscribe(
          result=>{
            if(result==true){
              this.checkIfAdmin=false;
              this.userService.getUserIdName(this.userId)
              .subscribe(user => {

                if(user!=null){
                  this.legal=true;
                  this.fullNameSearch = user.fullName;
                  this.displayFullName = true;
                }
                else {
                  this.showError=true;
                  this.legal=false;
                }
              })
            }
            else{
              this.showError=true;
              this.legal=false;
              this.checkIfAdmin=false;
            }
          }
        )

      }
    }
  )


 }

 checkError(){
   return (this.showError&&this.checkIfAdmin)
 }



}


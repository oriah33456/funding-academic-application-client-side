import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FundingPageService } from 'src/app/shared/funding-page.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { PotentialProductsService } from 'src/app/shared/potential-products.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/project';
import { UserService } from 'src/app/shared/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-funding-page',
  templateUrl: './funding-page.component.html',
  styleUrls: ['./funding-page.component.scss'],
})
export class FundingPageComponent implements OnInit, OnDestroy {
  @ViewChild('ref') ref;
  toDay: Date;
  project: Project;
  isSensetiveFlag = false;
  userId = this.userService.userDetails.value.id;
  userName = this.userService.userDetails.value.fullName;
  cleanupSubject$ = new Subject<boolean>();
  isAdmin = this.userService.isAdmin.value;
  projectId: number;
  editMode = false;
  serviceSub:Subscription;

  form: FormGroup = new FormGroup({
    userID: new FormControl(
      { value: this.userId, disabled: true }
      ),
    requester: new FormControl(
      { value: this.userName, disabled: true }
      ),
    projectName: new FormControl(
      { value: '', disabled: this.isAdmin },
      Validators.required
    ),
    status: new FormControl({ value: 'New', disabled: this.isAdmin }), //
    academicInstitution: new FormControl(
      { value: '', disabled: this.isAdmin },
      Validators.required
    ),
    academicAdvisor: new FormControl(
      { value: '', disabled: this.isAdmin },
      Validators.required
    ),
    description: new FormControl(
      { value: '', disabled: this.isAdmin },
      Validators.required
    ),
    isSensetive: new FormControl(
      { value: false, disabled: this.isAdmin },
      Validators.required
    ),
    sensetiveInfo: new FormControl({ value: '', disabled: this.isAdmin }),
    startDate: new FormControl(
      { value: '', disabled: this.isAdmin },
      Validators.required
    ),
    endDate: new FormControl(
      { value: '', disabled: this.isAdmin },
      Validators.required
    ),
    product: new FormControl(
      { value: '', disabled: this.isAdmin },
      Validators.required
    ),
    statusChagnedDesc: new FormControl({ value: null, disabled: this.isAdmin }),
  });
  constructor(
    public service: FundingPageService,
    public potentialProductsService: PotentialProductsService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FundingPageComponent>,
    private userService: UserService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.service.fundingDataForm.subscribe((data) => {

      
    });


  }

  onClickSensetive() {
    this.isSensetiveFlag = !this.ref._checked;
    if (this.isSensetiveFlag == false)
      this.form.controls['sensetiveInfo'].reset();
  }

  onClear() {
    //clear the form

    this.form.reset({
      userID: this.userId,
      requester: this.userName,
      status: 'New',
    });

  }

  onSubmit() {


    if (!this.form.valid) return;
    const projectDetails = this.form.value;
    projectDetails.requester = this.userName;
    projectDetails.userId = this.userId;

    if (this.editMode) {
      projectDetails.id = this.projectId;
    }
    //Check if the status is rejected or Canceled
    if(this.isStatusNew() && projectDetails.id)
    {
      this.editMode=true;
    }
    else{
      this.editMode=false;
    }



    if (!this.editMode) {
      projectDetails.status = 'New';
      this.service
        .addProjectByUserId(projectDetails, this.userId)
        .subscribe((data) => {
          if (data) {
            this.service.dataChanged.next();
            this.notificationService.success('Submitted successfully');
          }
        });
    } else {
      this.dialogService.openConfirmDialog('Are you sure you want to edit this item?')
      .afterClosed().subscribe(res =>{
        if(res){

       this.service
       .updateProjectByProjectId(this.projectId, projectDetails)
       .subscribe((data) => {
         if (data) {
           this.service.dataChanged.next();
           this.editMode = false;
           this.notificationService.success('! successfully edited');
        }
      });

        }
      });



    }

    this.onClose();
  }
  //will rest the form and close the popup dialog
  onClose() {
    this.form.reset();

    this.dialogRef.close();
  }

  populateForm(fundingPage) {
    this.form.setValue(fundingPage);
  }

  isStatusNew() {
    return (
      this.form.get('status').value === 'New'
    );


  }

  onApprove() {

    this.serviceSub=this.service
      .setProjectStatus(this.projectId, 2, ' ')
      .subscribe((data) => {
        this.service.dataChanged.next();
        this.notificationService.success('! successfully approved');
      })

    this.dialogRef.close(true);
  }


  ngOnDestroy(){
 //   this.serviceSub.unsubscribe();
  }
}

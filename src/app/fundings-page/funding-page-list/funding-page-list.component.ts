import {Component,Input,OnDestroy,OnInit,Output,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/project';
import { FundingPageService } from 'src/app/shared/funding-page.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FundingPageComponent } from '../funding-page/funding-page.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { IUser, UserService } from 'src/app/shared/user.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-funding-page-list',
  templateUrl: './funding-page-list.component.html',
  styleUrls: ['./funding-page-list.component.scss'],
})

//this component will be for all projects that already exist in the database
export class FundingPageListComponent implements OnInit, OnDestroy {


  constructor(
    private service: FundingPageService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private userService: UserService
  ) {}



  @ViewChild(MatPaginator) paginator: MatPaginator;
  canNotApproved: boolean;
  searchKey: string;
  userDetails: IUser;

  isAdmin = false;
  isAdminSub: Subscription;

  listData: MatTableDataSource<Project>;
  listDataArray = [];
  displayedColumns: string[] = [
    'ProjectID',
    'ProjectName',
    'Requester',
    'Status',
    'AcademicInstitution',
    'AcademicAdvisor',
    'IsSensetive',
    'StartDate',
    'EndDate',
    'actions',
  ];

  cleanupSubject$ = new Subject<boolean>();

  ngOnInit() {
    this.isAdminSub = this.userService.isAdmin.subscribe((data: boolean) => {
      this.isAdmin = data;
      this.subscribeToChanges();
    });

  }

  subscribeToChanges() {
    this.service.dataChanged
    .pipe(takeUntil(this.cleanupSubject$))
    .subscribe(() => {
      this.isAdmin ? this.getProjectsForApprovals() : this.getData();
    });
  this.userDetails = this.userService.userDetails.value;
  if (this.userDetails) {
    this.isAdmin ? this.getProjectsForApprovals() : this.getData();
  }
  }

  getData() {
    this.service.getProjectByUserId(this.userDetails.id).subscribe((data) => {
      this.listData = new MatTableDataSource<Project>(data);
      this.listData.paginator = this.paginator;
    });
  }

  getProjectsForApprovals() {
    this.service
      .getProjectByUserIdAndStatus(+this.userDetails.id, 1)
      .subscribe(
        (data) => (this.listData = new MatTableDataSource<Project>(data))
      );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  //This method for searching by what goes into the search field
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  //this method will open a popup window
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(FundingPageComponent, dialogConfig);
  }
  //button edit
  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const formValues = this.setFormValues(row);
    const formDataRef = this.dialog.open(FundingPageComponent, dialogConfig);
    formDataRef.componentInstance.projectId = row.id;
    formDataRef.componentInstance.editMode = true;
    formDataRef.componentInstance.isSensetiveFlag = row.isSensetive;
    formDataRef.componentInstance.form.setValue(formValues);
    // formDataRef.afterClosed().subscribe(result => {
    //   if(result) {
    //     this.isAdmin ? this.getProjectsForApprovals() : this.getData();
    //   }
    // })
  }

  setFormValues(row: any) {

    return {
      academicAdvisor: row.academicAdvisor,
      academicInstitution: row.academicInstitution,
      description: row.description,
      projectName: row.projectName,
      endDate: row.endDate,
      sensetiveInfo: row.sensetiveInfo,
      isSensetive: row.isSensetive,
      product: row.product,
      requester: row.requester,
      startDate: row.startDate,
      status: row.status,
      statusChagnedDesc: row.statusChagnedDesc,
      userID: row.userID,
    };
  }

  onDelete(row) {
    const newstatus = this.isAdmin ? 3 : 4;

    this.dialogService
      .openConfirmDialog(
        `Are you sure you want to ${
          this.isAdmin ? 'reject' : 'cancel'
        } the request?`
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          const justificationDialogRef = this.dialogService.openJustificationDialog();
          justificationDialogRef.afterClosed().subscribe((val) => {
            if(val){
              const justificationValue =
                justificationDialogRef.componentInstance.justification;


              this.service
                .setProjectStatus(row.id, newstatus, justificationValue)
                .subscribe((checkStatus) => {
                  this.service.dataChanged.next();
                  this.isAdmin ?
                  this.notificationService.warn('! Rejected successfully'): this.notificationService.warn('!Canceled successfully');
                  this.listDataArray = this.listDataArray.filter(
                    (list) => list.id !== row.id
                  );
                  this.isAdmin ? this.getProjectsForApprovals() : this.getData();
                });
            }
            else{
              this.dialog.closeAll();
            }

          });
          //Checks if res is true which means we want to delete the item
        }
      });

  }

  fetchStatus(val: string) {
    switch (val) {
      case 'New':
        return 1;
      case 'Approved':
        return 2;
      case 'Rejected':
        return 3;
      case 'Canceled':
        return 4;
    }
  }


  showDeleteIcon(row){
    return this.isAdmin ? true: row.status ==='New';
  }



  ngOnDestroy() {
    this.cleanupSubject$.next(true);
    this.isAdminSub.unsubscribe();
  }
}


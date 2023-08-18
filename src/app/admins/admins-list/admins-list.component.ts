import { Component, OnInit,ViewChild } from '@angular/core';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { AdminService } from '../admin.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewAdminComponent } from '../new-admin/new-admin.component';
import { MatPaginator } from '@angular/material/paginator';
import { AdminModel } from 'src/app/models/admin.model';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent implements OnInit {

  constructor(public adminService:AdminService,
    private dialog:MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,private userService: UserService) { }

  searchKey: string;
  userIdDetails =+this.userService.userDetails.value.id;
  listData: MatTableDataSource<AdminModel>;
  adminList:AdminModel[];

 @ViewChild (MatPaginator) paginator: MatPaginator;

 displayedColumns: string[]=['UserID','FullName','actions'];

  ngOnInit(): void {
    this.userService.dataAdded.subscribe(res=>{
      this.refreshAdminList();
    })
   this.listData= new MatTableDataSource<AdminModel>(this.adminList);
    this.adminService.getAdminsByUserId(this.userIdDetails).subscribe(
      data=>{
        this.adminList=data;
        this.listData= new MatTableDataSource<AdminModel>(this.adminList);
      }
    );

    this.listData.paginator=this.paginator;

    this.refreshAdminList();
  }

 refreshAdminList(){
  this.adminService.getAdminsByUserId(this.userIdDetails).subscribe(
    data=>{
      this.adminList=data;
      this.listData= new MatTableDataSource<AdminModel>(this.adminList);
    }
  );
 }


  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  //This method for searching by what goes into the search field
  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }

  //this method will open a popup window
  onCreate(){

    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(NewAdminComponent,dialogConfig);

    this.refreshAdminList();
  }
  //button edit

  onDelete(row){

    this.dialogService.openConfirmDialog('Are you sure you want to remove'+" " +row.fullName) //i.	Dialog: Are you sure you want to remove [admin name]?
    .afterClosed().subscribe(res =>{
      if(res){ //Checks if res is true which means we want to delete the item
       this.adminService.deleteAdmin(row.userId,this.userIdDetails).subscribe(
        result=> {
           if(result==true){
            this.notificationService.success('! successfully removed');

           this.refreshAdminList();
           }
           else{
            this.notificationService.warn("!You can not delete yourself");
           }

         }
       )

      }
    });
  }

}

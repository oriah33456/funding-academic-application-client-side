import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MyApprovalsComponent } from '../my-approvals/my-approvals.component';
import { AppModule } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    MyApprovalsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MyApprovalsComponent,
  ]
})
export class AdminModule { }

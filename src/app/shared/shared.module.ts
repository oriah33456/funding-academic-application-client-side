import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingPageListComponent } from '../fundings-page/funding-page-list/funding-page-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { JustificationDialogComponent } from './justification-dialog/justification-dialog.component';




@NgModule({
  declarations: [
    FundingPageListComponent,
    JustificationDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
  ],
  exports: [
    FundingPageListComponent,
  ]
})
export class SharedModule { }

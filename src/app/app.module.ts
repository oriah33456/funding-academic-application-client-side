import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { MyProjectsComponent } from './users/my-projects/my-projects.component';
import { FundingPageComponent } from './fundings-page/funding-page/funding-page.component';
import { AdminsComponent } from './admins/admins.component';
import { HeaderComponent } from './header/header.component';
import { AdminModule } from './admins/admin/admin.module';
import {FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FundingPageService } from './shared/funding-page.service';
import { ProjectsService } from './projects.service';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { MatGridListModule} from '@angular/material/grid-list';
import { PotentialProductsService } from './shared/potential-products.service';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AuthenticationService } from './auth/authentication/authentication.service';
import { UserService } from './shared/user.service';
import { AdminsListComponent } from './admins/admins-list/admins-list.component';
import { NewAdminComponent } from './admins/new-admin/new-admin.component';
import { AdminService } from './admins/admin.service';
import { SharedModule } from './shared/shared.module';

@NgModule({

  declarations: [
    AppComponent,
    UsersComponent,
    MyProjectsComponent,
    FundingPageComponent,
    AdminsComponent,
    HeaderComponent,
    MatConfirmDialogComponent,
    LoginComponent,
    RegisterComponent,
    AdminsListComponent,
    NewAdminComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
   /*  HttpModule, */
   /*  HttpClient, HttpHeaders */
  ],
  providers: [FundingPageService,ProjectsService,PotentialProductsService,AuthenticationService,UserService ,AdminService,FundingPageComponent],
  bootstrap: [AppComponent],
  entryComponents:[FundingPageComponent,MatConfirmDialogComponent,NewAdminComponent],
  exports: [],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsListComponent } from './admins/admins-list/admins-list.component';
import { AdminsComponent } from './admins/admins.component';
import { MyApprovalsComponent } from './admins/my-approvals/my-approvals.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MyProjectsComponent } from './users/my-projects/my-projects.component';
import { UsersComponent } from './users/users.component';

/* canActivate:[AuthGuard] */
const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'/* ,   component: LoginComponent */  },

  {path:'login',component:LoginComponent },

  {path: 'users', component: UsersComponent , children: [
    {path:'register' ,component:RegisterComponent},
    {path:'my-projects', component: MyProjectsComponent  , canActivate:[AuthGuard] },

  ]   /* ,canActivate:[AuthGuard]  */  },
  {path:'admin', component: AdminsComponent , children: [
    {path:'my-approvals', component: MyApprovalsComponent},
    {path:'admins-list', component: AdminsListComponent}
  ] ,canActivate:[AuthGuard] },
/*   {path:"",redirectTo:"/users/my-projects" ,pathMatch:"full"} */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

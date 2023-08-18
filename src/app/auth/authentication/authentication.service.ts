import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginModel } from 'src/app/models/login.model';
import { IUser, UserService } from 'src/app/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

  isAuthenticated:boolean=false;
  isAdminSub: Subscription;
  constructor(private router: Router, private userService: UserService) { }


  authenticate(checkLogin: IUser):boolean{
      if(checkLogin!=null){
         this.isAuthenticated=true;
         this.userService.userDetails.next(checkLogin);

        this.isAdminSub = this.userService.checkIsAdmin(checkLogin.id)
        .subscribe((res: boolean) => {

          this.userService.setIsAdmin(res);

          this.router.navigate(this.isAdminSub?['/users/my-projects']:['/admin/my-approvals']);
        })
        return true;

      }
      this.isAuthenticated=false;
      return false;
  }


  logout(){
    this.isAuthenticated=false;
    this.router.navigate([''])
  }

  ngOnDestroy() {
    this.isAdminSub.unsubscribe();
  }


}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { IUser, UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = false;
  userDetails: IUser | null = null;
  isAdminSub: Subscription;

  constructor(public authenticationService:AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.isAdminSub = this.userService.isAdmin.subscribe((data: boolean) => {
      this.isAdmin = data;
    })

    this.userService.userDetails.subscribe(value => this.userDetails = value);

  }

  logout(){
    this.userService.userDetails.next(null);
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.isAdminSub.unsubscribe();
  }

}

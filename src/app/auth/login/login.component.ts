import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';


import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { NotificationService } from 'src/app/shared/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  areCredentialsInvalid=false;
  isFormInValid=false;

  hide=true;
  loginData:LoginModel;
  loginForm=new FormGroup({
    email:new FormControl('',Validators.required),

    password:new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(30)])

  });
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              public userService:UserService, public notificationService:NotificationService) { }

  ngOnInit(){
    this.loginForm.reset();

  }

  onLogin(){
     if(!this.loginForm.valid){
        this.isFormInValid=true;
        this.areCredentialsInvalid=false;
        return;
     }



     this.userService.login(this.loginForm.value).subscribe(
       (res:any)=>{
         this.checkCredentials(res);

       },
       err =>{
         if(err.status ==400)
            this.notificationService.warn('Incorrect email or password');
         else
            console.log(err);
       }
     )
  }



  private checkCredentials(res){


    if(!this.authenticationService.authenticate(res)){
        this.isFormInValid= false;
        this.areCredentialsInvalid= true;
    }


  }
}

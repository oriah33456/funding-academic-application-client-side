import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/models/register.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {/*  ActivatedRoute, */ Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from 'src/app/shared/user.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerData: RegisterModel;
  registerForm: FormGroup;
  hide=true;


  formModel:FormGroup = new FormGroup({
    fullName:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(30)]),
  })

  constructor( private router: Router,private authenticationService: AuthenticationService,
              public userService:UserService, public notificationService:NotificationService) { }

  ngOnInit(){
    this.formModel.reset();
  }

  onRegister(){

    this.userService.register(this.formModel).subscribe(
      (res:any) =>{
        this.formModel.reset();
        this.notificationService.success('New user created');
        this.router.navigate(['/login']);
      });
    }







}


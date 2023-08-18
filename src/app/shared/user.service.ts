import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface IUser {
  id?: string;
  email?: string;
  fullName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private _isAdmin = new BehaviorSubject<boolean>(false);
  userDetails = new BehaviorSubject<IUser>(null);
  dataAdded= new Subject();
  get isAdmin() {
    return this._isAdmin;
  }

  setIsAdmin(isAdmin: boolean): void {
    this._isAdmin.next(isAdmin);
  }

  readonly BaseURI = 'http://localhost:58465';
  //register

  //POST
  register(formModel) {
    var body = {
      fullName: formModel.value.fullName,
      email: formModel.value.email,
      password: formModel.value.password,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(this.BaseURI + '/Users/create', body, httpOptions);
  }

  login(loginForm): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<IUser>(
      this.BaseURI + '/users/login',
      loginForm,
      httpOptions
    );
  }

  //GET
  checkIsAdmin(userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get(
      `${this.BaseURI}/Admin/isadmin/${userId}`,
      httpOptions
    );
  }

  getUserIdName(userId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<IUser>(
      `${this.BaseURI}/Users/name/${userId}`,
      httpOptions
    );
  }

  checkUserByUserId(userId:number){
    return this.http.get<boolean>(`${this.BaseURI}/Users/${userId}`);// ​/Users​/{id}

  }
}

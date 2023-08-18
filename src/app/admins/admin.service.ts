
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminModel } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly BaseURI='http://localhost:58465';
  constructor(private http:HttpClient) { }
//GET
  getAdminsByUserId(userID:number):Observable<AdminModel[]>{

    return this.http.get<AdminModel[]>(`${this.BaseURI}/Admin/${userID}`)// ​/Admin/admin/{userId}
  }
//PUT
  insertNewAdmin(userId:number):Observable<boolean>{
     return this.http.put<boolean>(`${this.BaseURI}/Users/admin/${userId}`," ");//​ /Users​/admin​/{userId}
    }


    deleteAdmin(deleteId:number,userId){

      var body={
        userId:userId
      }

      return this.http.put<boolean>(`http://localhost:58465/Admin/remove/${deleteId}`,body);

    }

  }

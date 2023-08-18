import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Project } from '../project';
@Injectable({
  providedIn: 'root'
})
//this component for new request
export class FundingPageService {
readonly BaseURI="http://localhost:58465";


  constructor( private http:  HttpClient ) { }
  dataChanged = new Subject();
  fundingDataForm = new BehaviorSubject<any>(null);

  //GET
  getProjectByProjectId(projectId):Observable<any[]>{
    return this.http.get<Project[]>(this.BaseURI+'/Projects/'+projectId)//​/Projects​/{projectId}
  }

  getProjectByUserId(userID):Observable<Project[]>{

    return this.http.get<Project[]>(this.BaseURI+'/Projects/user/'+userID)// ​/Projects​/user​/{userId}
  }

  getProjectByUserIdAndStatus(user: number, status: number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',

      })
    };
    return this.http.get<any>(`http://localhost:58465/Projects?userId=${user}&status=${status}`,httpOptions)//​/ ​/Projects/userid/status
  }
  //POST
  addProjectByUserId(val:any,userID){//return boolean
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',

      })
    };

    const body= ( {


        "requester": "oriah",
        "projectName": "test 1024",
        "academicInstitution": "string",
        "academicAdvisor": "string",
        "description": "string",
        "isSensetive": true,
        "sensetiveInfo": "string",
        "statusChagnedDesc": "string",
        "startDate": "2021-01-17T23:38:57.064Z",
        "endDate": "2021-01-17T23:38:57.064Z",
        "product": "Report",
        "status": "New"

    })

   /*  const body=JSON.stringify(val); */
    return this.http.post<boolean>(`${this.BaseURI}/Projects/create/${userID}`,val,httpOptions)//need to be /Projects​/create​/{userId}
  }


  //PUT
  updateProjectByProjectId(projectId:number,val: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',

      })
    };

     const body=JSON.stringify(val);
     return  this.http.put<boolean>(`${this.BaseURI}/Projects/project/${projectId}`,body,httpOptions);//​ /Projects​/project​/{id}

  }



  setProjectStatus(id:number,newStatus:number,statusChagnedDesc:string): Observable<boolean>{
     const httpOptions = {
       headers: new HttpHeaders({
       'Content-Type':  'application/json'

       })
     };

     const body=JSON.stringify(statusChagnedDesc);

    return this.http.put<boolean>(`${this.BaseURI}/Projects/status/${id}/${newStatus}`,body,httpOptions); // /Projects/status/{id}/{status}
  }

}

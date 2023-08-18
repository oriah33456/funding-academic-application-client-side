import { potentialProduct} from "./shared/potential-products.service";


export class Project {
  id:number;  //id
  userID:number;
  requester:string;
  projectName:string;
  status:string;
  academicInstitution:string;
  academicAdvisor:string;
  description:string;  //
  isSensetive:boolean;//format Yes/No   //
  sensetiveInfo?:string;   //
  startDate:Date;//Datepicker    //
  endDate:Date;//Datepicker     //
  product:potentialProduct[];

  cancelDialog?:string;
  statusChagnedDesc?:string;
  constructor(){
    this.userID=null;
    this.requester=null;
    this.id=0;
    this.projectName=null;
    this.status=null;
    this.academicInstitution=null;
    this.academicAdvisor=null;

    this.description=null;

    this.isSensetive=null;
    this.startDate=null;
    this.endDate=null;
    this.cancelDialog=null;
    this.product=null;
    this.statusChagnedDesc=null;
  }


}

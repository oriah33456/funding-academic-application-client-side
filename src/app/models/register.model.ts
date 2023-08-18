export class RegisterModel {
 private fullName:string;
  private email:string;
  private password:string;

  constructor(fullName:string,email:string ,password:string){
    this.fullName=fullName;
    this.email=email;
    this.password=password;
  }


  getfullName():string{
    return this.fullName;
  }

  getEmail():string{
    return this.email;
  }
  getPassword():string{
    return this.password;
  }
}




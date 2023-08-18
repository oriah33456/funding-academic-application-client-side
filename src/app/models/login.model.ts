export class LoginModel{
  private email:string;
  private password:string;

  constructor(userEmail:string,password:string){
    this.email=userEmail;
    this.password=password;
  }

  getUserEmail():string{
    return this.email;
  }

  getPassword():string{
    return this.password;
  }
}

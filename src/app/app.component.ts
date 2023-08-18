import { Component } from '@angular/core';
import { AuthenticationService } from './auth/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'funding-academic-application';

  constructor(){}
}

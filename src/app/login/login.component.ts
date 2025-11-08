import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router){}

  fazerLogin() {
    console.log("test login...");
    this.router.navigate(['/home'])
  }

}

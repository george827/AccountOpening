import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import Big from 'big.js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  password: string = '';
  email: string = '';
  // balance: Big = new Big(0.0);

  isLoading: boolean = true;
  statusOk: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router
     ) {}

     register() {
      const user = { name: this.name, password: this.password, email: this.email };
  
      this.http.post('http://localhost:8080/api/v1/users/register', user)
        .subscribe(
          (response) => {
            console.log('Registration successful!', response);
            this.isLoading = false;
            this.statusOk = true;
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Registration failed!', error);
            this.isLoading = false;
            this.statusOk = false;
          }
        );
    }

}

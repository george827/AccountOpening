import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: string = '';
  email: string = '';
  isLoading: boolean = true;
  statusOk: boolean = true;
  constructor(
    private http: HttpClient,
    private router: Router
     ) {}

  login() {
    const user = { email: this.email, password: this.password };
    console.log('User:', user);

    this.http.post('http://localhost:8080/api/v1/users/login', user)
    
      .subscribe(
        (response) => {
          console.log('Login successful!');
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.isLoading = false;
          this.statusOk = true;
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed!', error);
          this.isLoading = false;
          this.statusOk = false;
        }
      );
  }
}

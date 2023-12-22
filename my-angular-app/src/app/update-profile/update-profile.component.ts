import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../shared/auth-service.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {

  id: number = 0;
  name: string = '';
  password: string = '';
  email: string = '';
  isLoading: boolean = true;
  statusOk: boolean = true;
  User!: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getUserFromLocalStorage();

    if (currentUser) {
      this.User = currentUser;
      
      this.name = this.User.name || '';
      this.password = this.User.password || ''; 
      this.email = this.User.email || '';
    }
  }

  update() {
    const user = { name: this.name, password: this.password, email: this.email, id: this.User.id };

    this.http.post('http://localhost:8080/api/v1/users/update', user)
      .subscribe(
        (response) => {
          console.log('Update successful!', response);
          this.isLoading = false;
          this.statusOk = true;
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Update failed!', error);
          this.isLoading = false;
          this.statusOk = false;
        }
      );
  }
}

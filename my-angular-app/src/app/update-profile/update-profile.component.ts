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
  // balance: Big = new Big(0.0);

  isLoading: boolean = true;
  statusOk: boolean = true;
  User!: any;
// c
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthServiceService
     ) {}

     ngOnInit() {
      const currentUser = this.authService.getUserFromLocalStorage();
      this.User = currentUser;
    }
    // update user

     update() {
      const user = { name: this.name, password: this.password, email: this.email, id: this.User.id };
  
      this.http.post('http://localhost:8080/api/v1/users/update', user)
        .subscribe(
          (response) => {
            console.log('Update successful!', response);
            this.isLoading = false;
            this.statusOk = true;
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Update failed!', error);
            this.isLoading = false;
            this.statusOk = false;
          }
        );
    }
 

}

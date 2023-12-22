import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../shared/auth-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

user: any;
theUser: any;
  
    constructor(private authService: AuthServiceService,
      private http: HttpClient
      ) { }

    ngOnInit() {
      const currentUser = this.authService.getUserFromLocalStorage();
    this.user = currentUser;
    this.getUser();
    }
  
    isLoggedIn() {
      return this.authService.isLoggedIn();
    }
  
    getCurrentUser() {
      return this.authService.getCurrentUser();
    }

    // get user
    getUser() {
      this.http.get(`http://localhost:8080/api/v1/users/${this.user.id}`)
        .subscribe(
          (response) => {
            console.log('Get user successful!');
            this.theUser = response;
          },
          (error) => {
            console.error('Get user failed!', error);
          }
        );
    }


}

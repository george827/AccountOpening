import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../shared/auth-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  Username: string = '';

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    const currentUser = this.authService.getUserFromLocalStorage();
    this.Username = currentUser.name;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

}

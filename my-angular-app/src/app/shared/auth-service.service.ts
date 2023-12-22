import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    
  ) { }


  // Retrieve user from local storage
  getUserFromLocalStorage(): any {
    if (!localStorage) {
      return null;
    }
    const currentUserString = localStorage.getItem('currentUser');
    return currentUserString ? JSON.parse(currentUserString) : null;
  }

  // get current user
  getCurrentUser(): any {
    return this.getUserFromLocalStorage();
  }

  // logout
  logout(): void {
    localStorage.removeItem('currentUser');
  }

  // isLoggedIn
  isLoggedIn(): boolean {
    return this.getUserFromLocalStorage() !== null;
  }

  
}

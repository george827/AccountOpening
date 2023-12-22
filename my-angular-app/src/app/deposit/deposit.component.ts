import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { AuthServiceService } from '../shared/auth-service.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService : AuthServiceService
  ) {}

  User: any = {};
  amount: number = 0;
  isSuccess: boolean = false;

  ngOnInit(): void {
    const currentUser = this.authService.getUserFromLocalStorage();
    this.User = currentUser;
  }

  deposit() {
    const deposit = {amount: this.amount, userId: this.User.id};
    console.log('Deposit:', deposit);
    this.http.post('http://localhost:8080/api/v1/users/credit', deposit)
      .subscribe(
        (response) => {
          console.log('Deposit successful!');
          this.isSuccess = true;
          // this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Deposit failed!', error);
        }
      );
  }
}

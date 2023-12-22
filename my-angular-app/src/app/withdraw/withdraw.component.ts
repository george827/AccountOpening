import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { AuthServiceService } from '../shared/auth-service.service';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent implements OnInit {
  
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
  
    withdraw() {
      const withdraw = {amount: this.amount, userId: this.User.id};
      console.log('Withdraw:', withdraw);
      this.http.post('http://localhost:8080/api/v1/users/debit', withdraw)
        .subscribe(
          (response) => {
            console.log('Withdraw successful!');
            this.isSuccess = true;
            // this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Withdraw failed!', error);
          }
        );
    }

}

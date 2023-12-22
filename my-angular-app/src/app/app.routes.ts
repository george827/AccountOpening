import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'deposit', component: DepositComponent },
    { path: 'withdraw', component: WithdrawComponent },
    { path: 'update-profile', component: UpdateProfileComponent }
    
];


// { path: 'login', component: LoginComponent, data: { title: 'Login' } },
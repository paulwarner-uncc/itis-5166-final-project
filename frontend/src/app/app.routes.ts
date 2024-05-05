import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BudgetComponent } from './budget/budget.component';
import { BudgetConfigureComponent } from './budget-configure/budget-configure.component';
import { BudgetUpdateComponent } from './budget-update/budget-update.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: BudgetComponent },
  { path: 'configure', component: BudgetConfigureComponent },
  { path: 'update', component: BudgetUpdateComponent },
  { path: 'logout', component: LogoutComponent }
];
